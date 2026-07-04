using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Web.Data;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly SignInManager<User> _signInManager;
        private readonly UserManager<User> _userManager;

        public AuthController(SignInManager<User> signInManager, UserManager<User> userManager)
        {
            _signInManager = signInManager;
            _userManager = userManager;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, request.RememberMe, lockoutOnFailure: true);

            if (result.Succeeded)
            {
                var user = await _userManager.FindByEmailAsync(request.Email);
                return Ok(new { success = true, email = user?.Email, username = user?.UserName });
            }

            if (result.IsLockedOut)
            {
                return BadRequest(new { error = "Tài khoản tạm thời bị khóa do đăng nhập sai nhiều lần." });
            }

            return BadRequest(new { error = "Tên đăng nhập hoặc mật khẩu không chính xác." });
        }

        [HttpPost("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            return Ok(new { success = true });
        }

        [HttpGet("me")]
        public async Task<IActionResult> Me()
        {
            if (User.Identity?.IsAuthenticated == true)
            {
                var user = await _userManager.GetUserAsync(User);
                if (user != null)
                {
                    var roles = await _userManager.GetRolesAsync(user);
                    return Ok(new
                    {
                        isAuthenticated = true,
                        email = user.Email,
                        username = user.UserName,
                        roles = roles
                    });
                }
            }

            return Ok(new { isAuthenticated = false });
        }
    }

    public class LoginRequest
    {
        [Required(ErrorMessage = "Vui lòng nhập Email")]
        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "Vui lòng nhập mật khẩu")]
        public string Password { get; set; } = string.Empty;

        public bool RememberMe { get; set; } = false;
    }
}
