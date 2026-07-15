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
                    tuviSheet.Cell("G24").Value = "Có";
                    tuviSheet.Cell("F13").Value = "Mệnh Chủ";
                }

                var setupSheet = workbook.Worksheet("Setup");
                if (setupSheet != null)
                {
                    ResolveCycles(setupSheet);
                }

                // Recalculate all formulas to ensure values match the user inputs
                workbook.RecalculateAllFormulas();

                result.TheCachHtml = GenerateTableHtml(workbook.Worksheet("Thể Cách"), "B2:T11", "thecach");
                result.TuViHtml = GenerateTuViGridHtml(tuviSheet);
            });

            return result;
        }

        private string GenerateTuViGridHtml(IXLWorksheet? sheet)
        {
            if (sheet == null) return string.Empty;

            var sb = new System.Text.StringBuilder();

            sb.Append("<div class=\"tuvi-chart-container\" style=\"width: 100%; max-width: 1020px; margin: 0 auto; overflow-x: auto; padding: 4px; background: #ffffff;\">");
            
            sb.Append("<style>");
            sb.Append("  .excel-table { width: 100%; border-collapse: collapse; table-layout: fixed; font-family: sans-serif; background: #ffffff; }");
            sb.Append("  .excel-cell { padding: 2px 3px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11.5px; }");
            sb.Append("  @media print {");
            sb.Append("    .tuvi-chart-container { padding: 0; }");
            sb.Append("  }");
            sb.Append("</style>");

            sb.Append("<table class=\"excel-table\">");
            
            sb.Append("<colgroup>");
            sb.Append("  <col style=\"width: 9%;\" />");
            sb.Append("  <col style=\"width: 9%;\" />");
            sb.Append("  <col style=\"width: 9%;\" />");
            sb.Append("  <col style=\"width: 7.5%;\" />");
            sb.Append("  <col style=\"width: 7.5%;\" />");
            sb.Append("  <col style=\"width: 7.5%;\" />");
            sb.Append("  <col style=\"width: 7.5%;\" />");
            sb.Append("  <col style=\"width: 7.5%;\" />");
            sb.Append("  <col style=\"width: 7.5%;\" />");
            sb.Append("  <col style=\"width: 9%;\" />");
            sb.Append("  <col style=\"width: 9%;\" />");
            sb.Append("  <col style=\"width: 9%;\" />");
            sb.Append("  <col style=\"width: 2%;\" />");
            sb.Append("</colgroup>");
            sb.Append("<tbody>");

            for (int r = 1; r <= 41; r++)
            {
                sb.Append("<tr>");
                for (int c = 1; c <= 13; c++)
                {
                    var cell = sheet.Cell(r, c);
                    
                    int rowspan = 1;
                    int colspan = 1;
                    bool isMerged = false;
                    bool isTopLeftOfMerge = false;

                    foreach (var mergedRange in sheet.MergedRanges)
                    {
                        if (mergedRange.Contains(cell))
                        {
                            isMerged = true;
                            if (cell.Address.ToString() == mergedRange.RangeAddress.FirstAddress.ToString())
                            {
                                isTopLeftOfMerge = true;
                                rowspan = mergedRange.Rows().Count();
                                colspan = mergedRange.Columns().Count();
                            }
                            break;
                        }
                    }

                    if (isMerged && !isTopLeftOfMerge)
                    {
                        continue;
                    }

                    var value = cell.GetString()?.Trim() ?? "";
                    var style = GetCellCssStyle(cell);

                    var borderStyles = new List<string>();
                    
                    if (cell.Style.Border.TopBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-top: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-top: 1px solid #cbd5e1;");

                    if (cell.Style.Border.BottomBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-bottom: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-bottom: 1px solid #cbd5e1;");

                    if (cell.Style.Border.LeftBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-left: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-left: 1px solid #cbd5e1;");

                    if (cell.Style.Border.RightBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-right: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-right: 1px solid #cbd5e1;");

                    var borderCss = string.Join(" ", borderStyles);

                    try
                    {
                        var bg = cell.Style.Fill.BackgroundColor;
                        if (bg == XLColor.Yellow || bg.Color.Name == "Yellow" || bg.Color.R == 255 && bg.Color.G == 255 && bg.Color.B == 0)
                        {
                            style += " background-color: #fef08a !important; border: 1px dashed #ca8a04 !important; font-weight: bold;";
                        }
                    }
                    catch {}

                    if (r == 41)
                    {
                        style += " background-color: #0284c7 !important; color: #ffffff !important; font-weight: bold; text-align: center;";
                    }

                    string spanAttr = "";
                    if (rowspan > 1) spanAttr += $" rowspan=\"{rowspan}\"";
                    if (colspan > 1) spanAttr += $" colspan=\"{colspan}\"";

                    sb.Append($"<td class=\"excel-cell\"{spanAttr} style=\"{style} {borderCss}\" title=\"{value}\">");
                    sb.Append(value);
                    sb.Append("</td>");
                }
                sb.Append("</tr>");
            }

            sb.Append("</tbody>");
            sb.Append("</table>");
            sb.Append("</div>");

            return sb.ToString();
        }

        private string GetCellCssStyle(IXLCell cell)
        {
            var styles = new List<string>();
            
            if (cell.Style.Font.Bold)
                styles.Add("font-weight: bold;");
            
            var pt = cell.Style.Font.FontSize;
            if (pt > 0)
                styles.Add($"font-size: {Math.Max(8.0, pt * 0.95)}px;");
                
            var align = cell.Style.Alignment.Horizontal;
            if (align == XLAlignmentHorizontalValues.Center)
                styles.Add("text-align: center;");
            else if (align == XLAlignmentHorizontalValues.Right)
                styles.Add("text-align: right;");
            else
                styles.Add("text-align: left;");

            try
            {
                var bg = cell.Style.Fill.BackgroundColor;
                if (bg.ColorType == XLColorType.Color || bg.ColorType == XLColorType.Theme)
                {
                    var c = bg.Color;
                    var rgb = $"{c.R:X2}{c.G:X2}{c.B:X2}";
                    if (rgb != "FFFFFF" && rgb != "000000")
                    {
                        styles.Add($"background-color: #{rgb};");
                    }
                }
            }
            catch {}

            try
            {
                var fontColor = cell.Style.Font.FontColor;
                if (fontColor.ColorType == XLColorType.Color || fontColor.ColorType == XLColorType.Theme)
                {
                    var c = fontColor.Color;
                    var rgb = $"{c.R:X2}{c.G:X2}{c.B:X2}";
                    if (rgb == "000000") rgb = "1e293b";
                    styles.Add($"color: #{rgb};");
                }
            }
            catch { }

            return string.Join(" ", styles);
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

                    // 3. Solve Cycle 3 (AK4 to AK9) and Cycle 4 (AK10 to AK15)
                    try
                    {
                        double ak4 = 1, ak5 = 1, ak6 = 1, ak7 = 1, ak8 = 1, ak9 = 1;
                        string m23 = sheet.Cell("M23").GetString()?.Trim() ?? "";
                        string m24 = sheet.Cell("M24").GetString()?.Trim() ?? "";
                        string m25 = sheet.Cell("M25").GetString()?.Trim() ?? "";
                        string m26 = sheet.Cell("M26").GetString()?.Trim() ?? "";
                        string m27 = sheet.Cell("M27").GetString()?.Trim() ?? "";
                        string m28 = sheet.Cell("M28").GetString()?.Trim() ?? "";

                        for (int iter = 0; iter < 100; iter++)
                        {
                            ak4 = (m23 == "1") ? 1 : ak5 + 1;
                            ak5 = (m24 == "1") ? 1 : ak6 + 1;
                            ak6 = (m25 == "1") ? 1 : ak7 + 1;
                            ak7 = (m26 == "1") ? 1 : ak8 + 1;
                            ak8 = (m27 == "1") ? 1 : ak9 + 1;
                            ak9 = (m28 == "1") ? 1 : ak4 + 1;
                        }

                        double ak10 = 1, ak11 = 1, ak12 = 1, ak13 = 1, ak14 = 1, ak15 = 1;
                        for (int iter = 0; iter < 100; iter++)
                        {
                            ak10 = (ak7 == 1) ? 7 : ak11 + 1;
                            ak11 = (ak8 == 1) ? 7 : ak12 + 1;
                            ak12 = (ak9 == 1) ? 7 : ak13 + 1;
                            ak13 = (ak4 == 1) ? 7 : ak14 + 1;
                            ak14 = (ak5 == 1) ? 7 : ak15 + 1;
                            ak15 = (ak6 == 1) ? 7 : ak10 + 1;
                        }

                        sheet.Cell("AK4").Value = ak4;
                        sheet.Cell("AK5").Value = ak5;
                        sheet.Cell("AK6").Value = ak6;
                        sheet.Cell("AK7").Value = ak7;
                        sheet.Cell("AK8").Value = ak8;
                        sheet.Cell("AK9").Value = ak9;

                        sheet.Cell("AK10").Value = ak10;
                        sheet.Cell("AK11").Value = ak11;
                        sheet.Cell("AK12").Value = ak12;
                        sheet.Cell("AK13").Value = ak13;
                        sheet.Cell("AK14").Value = ak14;
                        sheet.Cell("AK15").Value = ak15;
                    }
                    catch (Exception loopEx)
                    {
                        _logger.LogError(loopEx, "Error resolving AK circular references");
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

            var xlRange = sheet.Range(range);
            var firstRow = xlRange.RangeAddress.FirstAddress.RowNumber;
            var lastRow = xlRange.RangeAddress.LastAddress.RowNumber;
            var firstColNum = xlRange.RangeAddress.FirstAddress.ColumnNumber;
            var lastColNum = xlRange.RangeAddress.LastAddress.ColumnNumber;

            var sb = new System.Text.StringBuilder();

            sb.Append("<div class=\"excel-table-container\" style=\"width: 100%; overflow-x: auto; padding: 4px; background: #ffffff;\">");
            
            sb.Append("<style>");
            sb.Append("  .thecach-table { border-collapse: collapse; table-layout: fixed; font-family: sans-serif; background: #ffffff; min-width: 950px; width: 100%; }");
            sb.Append("  .thecach-cell { padding: 4px 6px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 11px; }");
            sb.Append("</style>");

            sb.Append("<table class=\"thecach-table\">");
            sb.Append("<tbody>");

            for (int r = firstRow; r <= lastRow; r++)
            {
                sb.Append("<tr>");
                for (int c = firstColNum; c <= lastColNum; c++)
                {
                    var cell = sheet.Cell(r, c);

                    // Check if cell is merged
                    int rowspan = 1;
                    int colspan = 1;
                    bool isMerged = false;
                    bool isTopLeftOfMerge = false;

                    foreach (var mergedRange in sheet.MergedRanges)
                    {
                        if (mergedRange.Contains(cell))
                        {
                            isMerged = true;
                            if (cell.Address.ToString() == mergedRange.RangeAddress.FirstAddress.ToString())
                            {
                                isTopLeftOfMerge = true;
                                rowspan = mergedRange.Rows().Count();
                                colspan = mergedRange.Columns().Count();
                            }
                            break;
                        }
                    }

                    if (isMerged && !isTopLeftOfMerge)
                    {
                        continue; // Skip rendering
                    }

                    var value = cell.GetFormattedString()?.Trim() ?? "";
                    var style = GetCellCssStyle(cell);

                    // Reconstruct gridlines
                    var borderStyles = new List<string>();
                    
                    if (cell.Style.Border.TopBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-top: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-top: 1px solid #cbd5e1;");

                    if (cell.Style.Border.BottomBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-bottom: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-bottom: 1px solid #cbd5e1;");

                    if (cell.Style.Border.LeftBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-left: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-left: 1px solid #cbd5e1;");

                    if (cell.Style.Border.RightBorder != XLBorderStyleValues.None)
                        borderStyles.Add("border-right: 2px solid #0f172a;");
                    else
                        borderStyles.Add("border-right: 1px solid #cbd5e1;");

                    var borderCss = string.Join(" ", borderStyles);

                    string spanAttr = "";
                    if (rowspan > 1) spanAttr += $" rowspan=\"{rowspan}\"";
                    if (colspan > 1) spanAttr += $" colspan=\"{colspan}\"";

                    sb.Append($"<td class=\"thecach-cell\"{spanAttr} style=\"{style} {borderCss}\" title=\"{value}\">");
                    sb.Append(value);
                    sb.Append("</td>");
                }
                sb.Append("</tr>");
            }

            sb.Append("</tbody>");
            sb.Append("</table>");
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