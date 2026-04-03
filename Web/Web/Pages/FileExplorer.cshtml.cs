using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace Web.Pages
{
    [Authorize(Roles = "Administrator")]
    public class FileExplorerModel : PageModel
    {
        private readonly IWebHostEnvironment _env;

        public FileExplorerModel(IWebHostEnvironment env)
        {
            _env = env;
        }

        public string RootFolder { get; private set; } = "";

        public void OnGet()
        {
            RootFolder = Path.Combine(_env.ContentRootPath, "wwwroot", "FileServer");
        }
    }
}
