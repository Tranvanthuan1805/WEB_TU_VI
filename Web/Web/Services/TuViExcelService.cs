using ClosedXML.Excel;
using Microsoft.Extensions.Logging;
using Web.Data;
using Web.Models;
using IWebHostEnvironment = Microsoft.AspNetCore.Hosting.IWebHostEnvironment;

namespace Web.Services
{
    public class TuViExcelService
    {
        private readonly IWebHostEnvironment _env;
        private readonly ILogger<TuViExcelService> _logger;
        private static readonly Dictionary<string, int> CanhToHour = new()
        {
            ["Ty"] = 0, ["Suu"] = 1, ["Dan"] = 2, ["Mao"] = 3, ["Thin"] = 4, ["Ty2"] = 5,
            ["Ngo"] = 6, ["Mui"] = 7, ["Than"] = 8, ["Dau"] = 9, ["Tuat"] = 10, ["Hoi"] = 11
        };
        private static readonly int[] Primes = { 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37 };
        private static readonly int[] Fibs = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89 };

        public TuViExcelService(IWebHostEnvironment env, ILogger<TuViExcelService> logger)
        {
            _env = env;
            _logger = logger;
        }

        public async Task<TuViResult> CalculateTuViAsync(TuViInput input)
        {
            var result = new TuViResult();
            var filePath = Path.Combine(_env.WebRootPath, "free.xlsx");

            if (!File.Exists(filePath))
            {
                _logger.LogError("Excel file not found: {FilePath}", filePath);
                return result;
            }

            await Task.Run(() =>
            {
                using var workbook = new XLWorkbook(filePath);

                var nhapLieuSheet = workbook.Worksheet("Nhập liệu");
                if (nhapLieuSheet != null)
                {
                    nhapLieuSheet.Cell("D5").Value = input.Gender;
                    nhapLieuSheet.Cell("E5").Value = input.Day;
                    nhapLieuSheet.Cell("F5").Value = input.Month;
                    nhapLieuSheet.Cell("G5").Value = input.Year;
                    nhapLieuSheet.Cell("H5").Value = MapHourToValue(input.Hour, input.Use24HourFormat);
                }

                var tuviSheet = workbook.Worksheet("tuvi");
                if (tuviSheet != null)
                {
                    tuviSheet.Cell("G23").Value = input.ViewYear;
                    FillEmptyCells(tuviSheet, "A11:L40");
                }

                var setupSheet = workbook.Worksheet("Setup");
                if (setupSheet != null)
                {
                    ResolveCycles(setupSheet);
                }

                // Recalculate all formulas to ensure values match the user inputs
                workbook.RecalculateAllFormulas();

                result.TheCachHtml = GenerateTableHtml(workbook.Worksheet("Thể Cách"), "B2:T11", "thecach");
                result.TuViHtml = GenerateTableHtml(tuviSheet, "A11:L40", "tuvi");
            });

            return result;
        }

        private void ResolveCycles(IXLWorksheet sheet)
        {
            try
            {
                // Force ClosedXML to evaluate AA40 first
                var aa40CellVal = sheet.Cell("AA40").Value;
                int aa40 = 1;
                bool parsedAA40 = false;
                
                if (aa40CellVal.IsNumber)
                {
                    aa40 = (int)aa40CellVal.GetNumber();
                    parsedAA40 = true;
                }
                else
                {
                    var text = aa40CellVal.ToString();
                    if (int.TryParse(text, out var val))
                    {
                        aa40 = val;
                        parsedAA40 = true;
                    }
                }

                if (parsedAA40)
                {
                    var k = new int[7];
                    var l = new int[7];

                    for (int i = 1; i <= 6; i++)
                    {
                        int rowIdx = 29 - i;
                        k[i] = (int)sheet.Cell($"K{rowIdx}").Value.GetNumber();
                        l[i] = (int)sheet.Cell($"L{rowIdx}").Value.GetNumber();
                    }

                    // 1. Solve Cycle 1 (M and N)
                    var m = new int[7];
                    var n = new int[7];
                    int curr = aa40;

                    for (int step = 0; step < 6; step++)
                    {
                        if (curr == aa40)
                        {
                            m[curr] = 1;
                        }
                        else
                        {
                            int prev = curr > 1 ? curr - 1 : 6;
                            m[curr] = n[prev] + 1;
                        }

                        n[curr] = k[curr] == 1 ? m[curr] + 8 : m[curr] + 5;
                        curr = curr < 6 ? curr + 1 : 1;
                    }

                    // 2. Solve Cycle 2 (O and P)
                    var o = new int[7];
                    var p = new int[7];
                    int maxN = 0;

                    for (int i = 1; i <= 6; i++)
                    {
                        if (n[i] > maxN) maxN = n[i];
                    }

                    int startO = aa40 <= 3 ? aa40 + 3 : aa40 - 3;
                    curr = startO;

                    for (int step = 0; step < 6; step++)
                    {
                        if (curr == startO)
                        {
                            o[curr] = maxN + 1;
                        }
                        else
                        {
                            int prev = curr > 1 ? curr - 1 : 6;
                            o[curr] = p[prev] + 1;
                        }

                        p[curr] = l[curr] == 1 ? o[curr] + 8 : o[curr] + 5;
                        curr = curr < 6 ? curr + 1 : 1;
                    }

                    // Write resolved values statically to break circular references
                    for (int i = 1; i <= 6; i++)
                    {
                        int rowIdx = 29 - i;
                        sheet.Cell($"M{rowIdx}").Value = m[i];
                        sheet.Cell($"N{rowIdx}").Value = n[i];
                        sheet.Cell($"O{rowIdx}").Value = o[i];
                        sheet.Cell($"P{rowIdx}").Value = p[i];
                    }
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error resolving circular references in Setup sheet");
            }
        }

        private int MapHourToValue(string hour, bool use24HourFormat)
        {
            if (int.TryParse(hour, out var hourNum) && hourNum >= 0 && hourNum <= 23)
                return hourNum;

            if (CanhToHour.TryGetValue(hour, out var mappedHour))
                return mappedHour;

            return 0;
        }

        public string Map24HourToCanh(int hour24)
        {
            var canhMap = new[] { "Tý", "Sửu", "Dần", "Mão", "Thìn", "Tỵ", "Ngọ", "Mùi", "Thân", "Dậu", "Tuất", "Hợi" };
            return canhMap[hour24 % 12];
        }

        private void FillEmptyCells(IXLWorksheet sheet, string range)
        {
            var usedRange = sheet.Range(range);
            var random = new Random();

            foreach (var cell in usedRange.CellsUsed())
            {
                if (string.IsNullOrWhiteSpace(cell.GetString()))
                {
                    var fillValue = GenerateRandomFillValue(random);
                    cell.Value = fillValue;
                }
            }
        }

        private string GenerateRandomFillValue(Random random)
        {
            var source = random.Next(4);
            return source switch
            {
                0 => Primes[random.Next(Primes.Length)].ToString(),
                1 => Fibs[random.Next(Fibs.Length)].ToString(),
                2 => (random.Next(9) + 1).ToString(),
                _ => GeneratePiMultiplier(random)
            };
        }

        private string GeneratePiMultiplier(Random random)
        {
            var multipliers = new[] { 3, 6, 8 };
            var multiplier = multipliers[random.Next(multipliers.Length)];
            var value = Math.Round(multiplier * Math.PI, 2);
            return value.ToString("F2");
        }

        private string GenerateTableHtml(IXLWorksheet? sheet, string range, string tableType = "default")
        {
            if (sheet == null) return string.Empty;

            var usedRange = sheet.Range(range);
            var firstRow = usedRange.RangeAddress.FirstAddress.RowNumber;
            var lastRow = usedRange.RangeAddress.LastAddress.RowNumber;
            var firstColNum = usedRange.RangeAddress.FirstAddress.ColumnNumber;
            var lastColNum = usedRange.RangeAddress.LastAddress.ColumnNumber;
            var totalCols = lastColNum - firstColNum + 1;

            var sb = new System.Text.StringBuilder();
            
            // Wrap in scrollable container to prevent grid squeezes on mobile/tablet viewports
            sb.Append($"<div class=\"overflow-x-auto w-full rounded-2xl border border-outline-variant/50 shadow-inner bg-surface-container-lowest p-4\">");
            sb.Append($"<div class=\"grid\" style=\"grid-template-columns: repeat({totalCols}, minmax(110px, 1fr)); gap: 4px; min-width: 100%; width: max-content;\">");

            for (var row = firstRow; row <= lastRow; row++)
            {
                for (var col = firstColNum; col <= lastColNum; col++)
                {
                    var cell = sheet.Cell(row, col);
                    var value = cell.GetString()?.Trim();
                    var hasValue = !string.IsNullOrEmpty(value);
                    
                    // Style differently for headers vs data cells vs empty cells
                    string cellClass;
                    string cellStyle;

                    if (!hasValue)
                    {
                        cellClass = "border border-outline-variant/30 text-center px-2 py-3 text-xs rounded-lg font-sans opacity-30 flex items-center justify-center min-h-[46px]";
                        cellStyle = "background-color: var(--surface-container-low); color: var(--on-surface-variant);";
                    }
                    else
                    {
                        // Check if it's likely a header (first row, first column, or bold indicators)
                        bool isHeader = row == firstRow || col == firstColNum;
                        
                        if (isHeader)
                        {
                            cellClass = "border border-primary/30 text-center px-2 py-3 text-xs font-bold rounded-lg font-headline flex items-center justify-center min-h-[46px] shadow-sm";
                            cellStyle = "background-color: var(--surface-container-high); color: var(--primary);";
                        }
                        else
                        {
                            cellClass = "border border-outline-variant/50 text-center px-2 py-3 text-xs font-medium rounded-lg font-sans flex items-center justify-center min-h-[46px] shadow-sm hover:bg-primary/5 transition-colors duration-150";
                            cellStyle = "background-color: var(--surface); color: var(--on-surface);";
                        }
                    }

                    sb.Append($"<div class=\"{cellClass}\" style=\"{cellStyle} min-width: 0;\">{value}</div>");
                }
            }

            sb.Append("</div>");
            sb.Append("</div>");
            return sb.ToString();
        }

        public async Task<List<ExcelProfile>> GetProfilesFromExcelAsync()
        {
            var list = new List<ExcelProfile>();
            var filePath = Path.Combine(_env.WebRootPath, "free.xlsx");

            if (!File.Exists(filePath))
            {
                _logger.LogError("Excel file not found for loading profiles: {FilePath}", filePath);
                return list;
            }

            await Task.Run(() =>
            {
                using var workbook = new XLWorkbook(filePath);
                var sheet = workbook.Worksheet("Nhập liệu");
                if (sheet == null) return;

                // Loop from row 6 to 1005 (or until we hit a row with empty name)
                for (int r = 6; r <= 1005; r++)
                {
                    var nameCell = sheet.Cell(r, 3).Value;
                    if (nameCell.IsBlank) continue;

                    var name = nameCell.ToString().Trim();
                    if (string.IsNullOrEmpty(name)) continue;

                    var indexVal = sheet.Cell(r, 2).Value;
                    int index = 0;
                    if (indexVal.IsNumber) index = (int)indexVal.GetNumber();

                    var gender = sheet.Cell(r, 4).Value.ToString().Trim();
                    
                    int day = 1;
                    var dayVal = sheet.Cell(r, 5).Value;
                    if (dayVal.IsNumber) day = (int)dayVal.GetNumber();

                    int month = 1;
                    var monthVal = sheet.Cell(r, 6).Value;
                    if (monthVal.IsNumber) month = (int)monthVal.GetNumber();

                    int year = 1990;
                    var yearVal = sheet.Cell(r, 7).Value;
                    if (yearVal.IsNumber) year = (int)yearVal.GetNumber();

                    var hourVal = sheet.Cell(r, 8).Value;
                    string hour = "0";
                    if (hourVal.IsNumber) hour = ((int)hourVal.GetNumber()).ToString();
                    else hour = hourVal.ToString().Trim();

                    var notes = sheet.Cell(r, 10).Value.ToString().Trim();

                    list.Add(new ExcelProfile
                    {
                        Index = index,
                        FullName = name,
                        Gender = gender,
                        Day = day,
                        Month = month,
                        Year = year,
                        Hour = hour,
                        Notes = notes
                    });
                }
            });

            return list;
        }
    }

    public class ExcelProfile
    {
        public int Index { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Gender { get; set; } = "Nam";
        public int Day { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public string Hour { get; set; } = "0";
        public string Notes { get; set; } = string.Empty;
    }

    public class TuViInput
    {
        public string Gender { get; set; } = "Nam";
        public int Day { get; set; } = DateTime.Now.Day;
        public int Month { get; set; } = DateTime.Now.Month;
        public int Year { get; set; } = DateTime.Now.Year;
        public string Hour { get; set; } = "0";
        public bool Use24HourFormat { get; set; } = false;
        public int ViewYear { get; set; } = DateTime.Now.Year;
    }

    public class TuViResult
    {
        public string TheCachHtml { get; set; } = string.Empty;
        public string TuViHtml { get; set; } = string.Empty;
    }
}