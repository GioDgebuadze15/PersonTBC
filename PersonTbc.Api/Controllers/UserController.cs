using Microsoft.AspNetCore.Mvc;
using PersonTbc.Data.Form;
using PersonTbc.Services.AppServices.UserAppService;

namespace PersonTbc.Api.Controllers;

[Route("api/user")]
public class UserController : ApiController
{
    private readonly IUserService _iUserService;

    public UserController(IUserService iUserService)
    {
        _iUserService = iUserService;
    }

    [HttpPost("/register")]
    public async Task<IActionResult> Register([FromBody] CreateUserForm createUserForm)
    {
        return Ok(await _iUserService.RegisterUser(createUserForm));
    }

    [HttpPost("/login")]
    public IActionResult Login([FromBody] LoginUserForm loginUserForm)
    {
        return Ok(_iUserService.LoginUser(loginUserForm));
    }
}