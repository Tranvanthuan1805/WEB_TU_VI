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

                result.TheCachHtml = GenerateTableHtml(workbook.Worksheet("Thể Cách"), "B2:T11", "thecach");
                result.TuViHtml = GenerateTableHtml(tuviSheet, "A11:L40", "tuvi");
            });

            return result;
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
            var borderColor = tableType == "thecach" ? "#e9c400" : "#79747e";
            sb.Append($"<div class=\"grid\" style=\"grid-template-columns: repeat({totalCols}, minmax(0, 1fr)); gap: 2px;\">");

            for (var row = firstRow; row <= lastRow; row++)
            {
                for (var col = firstColNum; col <= lastColNum; col++)
                {
                    var cell = sheet.Cell(row, col);
                    var value = cell.GetString();
                    var cellClass = tableType == "thecach"
                        ? "border text-center px-2 py-1"
                        : "border text-center px-2 py-1";
                    sb.Append($"<div class=\"{cellClass}\" style=\"border-color: {borderColor}; min-width: 0;\">{value}</div>");
                }
            }

            sb.Append("</div>");
            return sb.ToString();
        }
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