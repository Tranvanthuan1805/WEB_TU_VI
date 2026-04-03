using Microsoft.AspNetCore.Mvc;
using HGO.ASPNetCore.FileManager.CommandsProcessor;

namespace Web.Controllers
{
    [Route("api/filemanager")]
    [ApiController]
    public class FileManagerController : ControllerBase
    {
        private readonly IFileManagerCommandsProcessor _processor;

        public FileManagerController(IFileManagerCommandsProcessor processor)
        {
            _processor = processor;
        }

        [HttpPost]
        [HttpGet]
        public async Task<IActionResult> HgoApi(string id, string command, string parameters, IFormFile file)
        {
            return await _processor.ProcessCommandAsync(id, command, parameters, file);
        }
    }
}
