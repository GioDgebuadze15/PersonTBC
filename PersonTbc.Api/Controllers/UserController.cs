using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PersonTbc.Data.Form;
using PersonTbc.Services.AppServices.UserAppService;

namespace PersonTbc.Api.Controllers;

[Route("api/user")]
[AllowAnonymous]
public class UserController : ApiController
{
    private readonly IUserService _iUserService;

    public UserController(IUserService iUserService)
    {
        _iUserService = iUserService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] CreateUserForm createUserForm)
    {
        var result = await _iUserService.RegisterUser(createUserForm);
        if (result.StatusCode is 400) return BadRequest(result);
        return Ok(result);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginUserForm loginUserForm)
    {
        var result = _iUserService.LoginUser(loginUserForm);
        if (result.StatusCode is 404) return NotFound(result);
        return Ok(result);
    }
}

