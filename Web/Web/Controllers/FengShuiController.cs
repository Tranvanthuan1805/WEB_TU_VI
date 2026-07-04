using Microsoft.AspNetCore.Mvc;
using Web.Services;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/phongthuy")]
    public class FengShuiController : ControllerBase
    {
        private readonly FengShuiService _fengShuiService;

        public FengShuiController(FengShuiService fengShuiService)
        {
            _fengShuiService = fengShuiService;
        }

        [HttpGet("status")]
        public async Task<IActionResult> GetStatus()
        {
            try
            {
                var isImported = await _fengShuiService.IsImportedAsync();
                return Ok(new { isImported });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpPost("import")]
        public async Task<IActionResult> Import()
        {
            try
            {
                await _fengShuiService.ImportFromExcelAsync();
                return Ok(new { success = true, message = "Đã import dữ liệu phong thủy từ file Excel lên MongoDB thành công!" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = "Lỗi khi import dữ liệu: " + ex.Message });
            }
        }

        [HttpGet("hexagrams")]
        public async Task<IActionResult> GetHexagrams()
        {
            try
            {
                var list = await _fengShuiService.GetHexagramsAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("hexagrams/{index}")]
        public async Task<IActionResult> GetHexagram(int index)
        {
            try
            {
                var linesDoc = await _fengShuiService.GetHexagramLinesByIndexAsync(index);
                if (linesDoc == null)
                {
                    return NotFound(new { error = "Không tìm thấy quẻ này" });
                }

                // Retrieve additional hexagram details by name from the 64Quẻ sheet collection
                HexagramDetailDoc? detailDoc = null;
                if (!string.IsNullOrEmpty(linesDoc.Name))
                {
                    detailDoc = await _fengShuiService.GetHexagramDetailByNameAsync(linesDoc.Name);
                }

                return Ok(new
                {
                    lines = linesDoc,
                    details = detailDoc
                });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("solar-terms")]
        public async Task<IActionResult> GetSolarTerms()
        {
            try
            {
                var list = await _fengShuiService.GetSolarTermsAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }

        [HttpGet("profiles")]
        public async Task<IActionResult> GetProfiles()
        {
            try
            {
                var list = await _fengShuiService.GetProfilesAsync();
                return Ok(list);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }
}
