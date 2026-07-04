using ClosedXML.Excel;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Globalization;

namespace Web.Services
{
    public class FengShuiService
    {
        private readonly IMongoDatabase _database;
        private readonly ILogger<FengShuiService> _logger;
        private readonly string _excelPath;

        public FengShuiService(IConfiguration configuration, ILogger<FengShuiService> logger)
        {
            _logger = logger;
            var connectionString = configuration.GetConnectionString("MongoDB") ?? throw new ArgumentNullException("MongoDB ConnectionString is missing");
            var databaseName = configuration["MongoDBDatabase"] ?? "tuvi_db";
            
            var settings = MongoClientSettings.FromConnectionString(connectionString);
            settings.SslSettings = new SslSettings
            {
                ServerCertificateValidationCallback = (sender, certificate, chain, sslPolicyErrors) => true,
                EnabledSslProtocols = System.Security.Authentication.SslProtocols.Tls12
            };
            var client = new MongoClient(settings);
            _database = client.GetDatabase(databaseName);
            
            // Excel sheet location in the BattuHL folder
            _excelPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "../../../BattuHL-Tubinh-Tuvi-Quedich-LTT/BattuHL-Tubinh-Tuvi-Quedich-LTT.xlsx");
            if (!File.Exists(_excelPath))
            {
                // Fallback to project root check
                _excelPath = Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "BattuHL-Tubinh-Tuvi-Quedich-LTT/BattuHL-Tubinh-Tuvi-Quedich-LTT.xlsx");
            }
        }

        private IMongoCollection<HexagramLineDoc> HexagramLinesCollection => _database.GetCollection<HexagramLineDoc>("hexagram_lines");
        private IMongoCollection<HexagramDetailDoc> HexagramDetailsCollection => _database.GetCollection<HexagramDetailDoc>("hexagram_details");
        private IMongoCollection<SolarTermDoc> SolarTermsCollection => _database.GetCollection<SolarTermDoc>("solar_terms");
        private IMongoCollection<ProfileDoc> ProfilesCollection => _database.GetCollection<ProfileDoc>("profiles");

        public async Task<bool> IsImportedAsync()
        {
            var count = await HexagramLinesCollection.CountDocumentsAsync(new BsonDocument());
            return count > 0;
        }

        public async Task<List<HexagramLineDoc>> GetHexagramsAsync()
        {
            return await HexagramLinesCollection.Find(new BsonDocument())
                .SortBy(h => h.Index)
                .Project<HexagramLineDoc>(Builders<HexagramLineDoc>.Projection
                    .Include(h => h.Index)
                    .Include(h => h.Name)
                    .Include(h => h.Description))
                .ToListAsync();
        }

        public async Task<HexagramLineDoc?> GetHexagramLinesByIndexAsync(int index)
        {
            return await HexagramLinesCollection.Find(h => h.Index == index).FirstOrDefaultAsync();
        }

        public async Task<HexagramDetailDoc?> GetHexagramDetailByNameAsync(string name)
        {
            if (string.IsNullOrEmpty(name)) return null;
            return await HexagramDetailsCollection.Find(h => h.Name == name).FirstOrDefaultAsync();
        }

        public async Task<List<SolarTermDoc>> GetSolarTermsAsync()
        {
            return await SolarTermsCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task<List<ProfileDoc>> GetProfilesAsync()
        {
            return await ProfilesCollection.Find(new BsonDocument()).ToListAsync();
        }

        public async Task ImportFromExcelAsync()
        {
            _logger.LogInformation("Starting Excel import to MongoDB from: {ExcelPath}", _excelPath);

            var fullPath = Path.GetFullPath(_excelPath);
            if (!File.Exists(fullPath))
            {
                // check another location
                var rootPath = Path.Combine(Directory.GetCurrentDirectory(), "BattuHL-Tubinh-Tuvi-Quedich-LTT/BattuHL-Tubinh-Tuvi-Quedich-LTT.xlsx");
                if (File.Exists(rootPath))
                {
                    fullPath = rootPath;
                }
                else
                {
                    throw new FileNotFoundException($"BattuHL Excel sheet not found at: {fullPath}");
                }
            }

            using var workbook = new XLWorkbook(fullPath);

            // 1. Process '384Hào' Sheet
            _logger.LogInformation("Processing '384Hào' sheet...");
            var sheet384 = workbook.Worksheet("384Hào");
            if (sheet384 != null)
            {
                await HexagramLinesCollection.DeleteManyAsync(new BsonDocument());
                var hexDocs = new List<HexagramLineDoc>();

                // Columns 3 to 66 (representing 64 hexagrams)
                for (int col = 3; col <= 66; col++)
                {
                    var indexValStr = sheet384.Cell(2, col).GetString()?.Trim();
                    if (string.IsNullOrEmpty(indexValStr) || !int.TryParse(indexValStr, out int index))
                        continue;

                    var name = sheet384.Cell(3, col).GetString()?.Trim();
                    var description = sheet384.Cell(4, col).GetString()?.Trim();

                    // General poems: rows 5 to 8
                    var generalPoems = new List<string>();
                    for (int row = 5; row <= 8; row++)
                    {
                        var val = sheet384.Cell(row, col).GetString()?.Trim();
                        if (!string.IsNullOrEmpty(val))
                            generalPoems.Add(val);
                    }

                    // 6 lines: line 1 to 6
                    var lines = new List<HexagramLineInfo>();
                    for (int lineNum = 1; lineNum <= 6; lineNum++)
                    {
                        int rowStart = 9 + (6 - lineNum) * 11;

                        var meaning = sheet384.Cell(rowStart, col).GetString()?.Trim();
                        var interpretation = sheet384.Cell(rowStart + 1, col).GetString()?.Trim();
                        var mhc = sheet384.Cell(rowStart + 2, col).GetString()?.Trim();
                        var mkh = sheet384.Cell(rowStart + 3, col).GetString()?.Trim();
                        var qc = sheet384.Cell(rowStart + 4, col).GetString()?.Trim();
                        var gs = sheet384.Cell(rowStart + 5, col).GetString()?.Trim();
                        var nt = sheet384.Cell(rowStart + 6, col).GetString()?.Trim();

                        var linePoems = new List<string>();
                        for (int row = rowStart + 7; row <= rowStart + 10; row++)
                        {
                            var val = sheet384.Cell(row, col).GetString()?.Trim();
                            if (!string.IsNullOrEmpty(val))
                                linePoems.Add(val);
                        }

                        lines.Add(new HexagramLineInfo
                        {
                            LineNumber = lineNum,
                            Meaning = meaning,
                            Interpretation = interpretation,
                            Mhc = mhc,
                            Mkh = mkh,
                            Qc = qc,
                            Gs = gs,
                            Nt = nt,
                            Poems = linePoems
                        });
                    }

                    hexDocs.Add(new HexagramLineDoc
                    {
                        Index = index,
                        Name = name,
                        Description = description,
                        GeneralPoems = generalPoems,
                        Lines = lines
                    });
                }

                if (hexDocs.Count > 0)
                {
                    await HexagramLinesCollection.InsertManyAsync(hexDocs);
                }
                _logger.LogInformation("Imported {Count} hexagrams into hexagram_lines.", hexDocs.Count);
            }

            // 2. Process '64Quẻ' Sheet
            _logger.LogInformation("Processing '64Quẻ' sheet...");
            var sheet64 = workbook.Worksheet("64Quẻ");
            if (sheet64 != null)
            {
                await HexagramDetailsCollection.DeleteManyAsync(new BsonDocument());
                var detailDocs = new List<HexagramDetailDoc>();

                string? lastBinaryCode = null;
                // Columns are in pairs starting from 2 to 141
                for (int col = 2; col <= 140; col += 2)
                {
                    var name = sheet64.Cell(5, col).GetString()?.Trim();
                    if (string.IsNullOrEmpty(name))
                        continue;

                    var binVal = sheet64.Cell(4, col).GetString()?.Trim();
                    if (!string.IsNullOrEmpty(binVal))
                    {
                        lastBinaryCode = binVal;
                    }
                    var binaryCode = lastBinaryCode;

                    // 6 lines
                    var lines = new List<HexagramDetailLine>();
                    for (int lineNum = 1; lineNum <= 6; lineNum++)
                    {
                        int rowIdx = 12 - lineNum;
                        var yangYin = sheet64.Cell(rowIdx, col).GetString()?.Trim();
                        var stemBranch = sheet64.Cell(rowIdx, col + 1).GetString()?.Trim();

                        lines.Add(new HexagramDetailLine
                        {
                            LineNumber = lineNum,
                            YangYin = yangYin,
                            StemBranch = stemBranch
                        });
                    }

                    // Duong branches (rows 12 to 17)
                    var duongBranches = new List<string?>();
                    for (int row = 12; row <= 17; row++)
                    {
                        duongBranches.Add(sheet64.Cell(row, col).GetString()?.Trim());
                    }

                    // Yin branches (rows 18 to 23)
                    var amBranches = new List<string?>();
                    var amBranchesAlt = new List<string?>();
                    for (int row = 18; row <= 23; row++)
                    {
                        amBranches.Add(sheet64.Cell(row, col).GetString()?.Trim());
                        amBranchesAlt.Add(sheet64.Cell(row, col + 1).GetString()?.Trim());
                    }

                    var rating = sheet64.Cell(24, col).GetString()?.Trim();
                    int? dacThoi = null;
                    if (int.TryParse(sheet64.Cell(25, col).GetString()?.Trim(), out int dtVal))
                    {
                        dacThoi = dtVal;
                    }

                    int? extraVal = null;
                    var extraValStr = sheet64.Cell(26, col).GetString()?.Trim();
                    if (string.IsNullOrEmpty(extraValStr))
                    {
                        extraValStr = sheet64.Cell(26, col + 1).GetString()?.Trim();
                    }
                    if (int.TryParse(extraValStr, out int evVal))
                    {
                        extraVal = evVal;
                    }

                    detailDocs.Add(new HexagramDetailDoc
                    {
                        Name = name,
                        BinaryCode = binaryCode,
                        Lines = lines,
                        DuongBranches = duongBranches,
                        AmBranches = amBranches,
                        AmBranchesAlt = amBranchesAlt,
                        Rating = rating,
                        DacThoi = dacThoi,
                        ExtraValue = extraVal
                    });
                }

                if (detailDocs.Count > 0)
                {
                    await HexagramDetailsCollection.InsertManyAsync(detailDocs);
                }
                _logger.LogInformation("Imported {Count} hexagram details into hexagram_details.", detailDocs.Count);
            }

            // 3. Process 'TiếtKhí' Sheet
            _logger.LogInformation("Processing 'TiếtKhí' sheet...");
            var sheetTietkhi = workbook.Worksheet("TiếtKhí");
            if (sheetTietkhi != null)
            {
                await SolarTermsCollection.DeleteManyAsync(new BsonDocument());
                var termDocs = new List<SolarTermDoc>();

                int lastRow = sheetTietkhi.LastRowUsed()?.RowNumber() ?? 0;
                for (int r = 3; r <= lastRow; r++)
                {
                    var code = sheetTietkhi.Cell(r, 2).GetString()?.Trim();
                    var termName = sheetTietkhi.Cell(r, 3).GetString()?.Trim();
                    var dtVal = sheetTietkhi.Cell(r, 4).Value;

                    if (string.IsNullOrEmpty(code) || string.IsNullOrEmpty(termName))
                        continue;

                    DateTime? entryTime = ParseDate(dtVal);

                    termDocs.Add(new SolarTermDoc
                    {
                        Code = code,
                        TermName = termName,
                        EntryTime = entryTime
                    });
                }

                if (termDocs.Count > 0)
                {
                    await SolarTermsCollection.InsertManyAsync(termDocs);
                }
                _logger.LogInformation("Imported {Count} solar terms into solar_terms.", termDocs.Count);
            }

            // 4. Process 'Nhập liệu' Sheet (User Profiles)
            _logger.LogInformation("Processing 'Nhập liệu' sheet...");
            var sheetNhapLieu = workbook.Worksheet("Nhập liệu");
            if (sheetNhapLieu != null)
            {
                await ProfilesCollection.DeleteManyAsync(new BsonDocument());
                var profileDocs = new List<ProfileDoc>();

                for (int r = 6; r <= 1004; r++)
                {
                    var name = sheetNhapLieu.Cell(r, 3).GetString()?.Trim();
                    if (string.IsNullOrEmpty(name))
                        continue;

                    var ttStr = sheetNhapLieu.Cell(r, 2).GetString()?.Trim();
                    int? tt = int.TryParse(ttStr, out int ttVal) ? ttVal : null;

                    var gender = sheetNhapLieu.Cell(r, 4).GetString()?.Trim();
                    
                    int? day = int.TryParse(sheetNhapLieu.Cell(r, 5).GetString()?.Trim(), out int d) ? d : null;
                    int? month = int.TryParse(sheetNhapLieu.Cell(r, 6).GetString()?.Trim(), out int m) ? m : null;
                    int? year = int.TryParse(sheetNhapLieu.Cell(r, 7).GetString()?.Trim(), out int y) ? y : null;
                    int? hour = int.TryParse(sheetNhapLieu.Cell(r, 8).GetString()?.Trim(), out int h) ? h : null;
                    int? minute = int.TryParse(sheetNhapLieu.Cell(r, 9).GetString()?.Trim(), out int min) ? min : null;
                    
                    var notes = sheetNhapLieu.Cell(r, 10).GetString()?.Trim();
                    var dtVal = sheetNhapLieu.Cell(r, 12).Value;
                    DateTime? birthDatetime = ParseDate(dtVal);

                    profileDocs.Add(new ProfileDoc
                    {
                        Index = tt,
                        Fullname = name,
                        Gender = gender,
                        BirthDay = day,
                        BirthMonth = month,
                        BirthYear = year,
                        BirthHour = hour,
                        BirthMinute = minute,
                        Notes = notes,
                        BirthDatetime = birthDatetime
                    });
                }

                if (profileDocs.Count > 0)
                {
                    await ProfilesCollection.InsertManyAsync(profileDocs);
                }
                _logger.LogInformation("Imported {Count} user profiles into profiles.", profileDocs.Count);
            }
        }

        private DateTime? ParseDate(object val)
        {
            if (val == null) return null;
            if (val is DateTime dt) return dt;
            
            var strVal = val.ToString()?.Trim();
            if (string.IsNullOrEmpty(strVal)) return null;

            string[] formats = { "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd HH:mm", "dd/MM/yyyy HH:mm:ss", "dd/MM/yyyy HH:mm" };
            foreach (var fmt in formats)
            {
                if (DateTime.TryParseExact(strVal, fmt, CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime parsed))
                {
                    return parsed;
                }
            }

            if (DateTime.TryParse(strVal, out DateTime standardParsed))
            {
                return standardParsed;
            }

            return null;
        }
    }

    public class HexagramLineInfo
    {
        public int LineNumber { get; set; }
        public string? Meaning { get; set; }
        public string? Interpretation { get; set; }
        public string? Mhc { get; set; }
        public string? Mkh { get; set; }
        public string? Qc { get; set; }
        public string? Gs { get; set; }
        public string? Nt { get; set; }
        public List<string> Poems { get; set; } = new();
    }

    public class HexagramLineDoc
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public int Index { get; set; }
        public string? Name { get; set; }
        public string? Description { get; set; }
        public List<string> GeneralPoems { get; set; } = new();
        public List<HexagramLineInfo> Lines { get; set; } = new();
    }

    public class HexagramDetailLine
    {
        public int LineNumber { get; set; }
        public string? YangYin { get; set; }
        public string? StemBranch { get; set; }
    }

    public class HexagramDetailDoc
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Name { get; set; }
        public string? BinaryCode { get; set; }
        public List<HexagramDetailLine> Lines { get; set; } = new();
        public List<string?> DuongBranches { get; set; } = new();
        public List<string?> AmBranches { get; set; } = new();
        public List<string?> AmBranchesAlt { get; set; } = new();
        public string? Rating { get; set; }
        public int? DacThoi { get; set; }
        public int? ExtraValue { get; set; }
    }

    public class SolarTermDoc
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public string? Code { get; set; }
        public string? TermName { get; set; }
        public DateTime? EntryTime { get; set; }
    }

    public class ProfileDoc
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }
        public int? Index { get; set; }
        public string? Fullname { get; set; }
        public string? Gender { get; set; }
        public int? BirthDay { get; set; }
        public int? BirthMonth { get; set; }
        public int? BirthYear { get; set; }
        public int? BirthHour { get; set; }
        public int? BirthMinute { get; set; }
        public string? Notes { get; set; }
        public DateTime? BirthDatetime { get; set; }
    }
}
