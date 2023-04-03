using System.Security.Claims;
using Microsoft.IdentityModel.JsonWebTokens;
using Microsoft.IdentityModel.Tokens;
using PersonTbc.Data.Form;
using PersonTbc.Data.Models;
using PersonTbc.Database.EntityFramework;

namespace PersonTbc.Services.AppServices.UserAppService;

public class UserService : IUserService
{
    private readonly AppDbContext _ctx;

    public UserService(AppDbContext ctx)
    {
        _ctx = ctx;
    }


    public async Task<RegistrationResponse> RegisterUser(CreateUserForm createUserForm)
    {
        var existedUser = _ctx.Users.FirstOrDefault(x => x.Email.Equals(createUserForm.Email));
        //TODO: return described error
        if (existedUser is not null) return new RegistrationResponse(400, "User already exists!", null);

        var user = new User
        {
            Id = Guid.NewGuid().ToString(),
            Email = createUserForm.Email,
            Password = PasswordHasher.HashPassword(createUserForm.Password),
        };
        _ctx.Add(user);
        await _ctx.SaveChangesAsync();
        var token = GenerateJwtToken(user);
        return new RegistrationResponse(200, null, token);
    }

    public LoginResponse LoginUser(LoginUserForm loginUserForm)
    {
        var user = _ctx.Users.FirstOrDefault(x => x.Email.Equals(loginUserForm.Email));
        //TODO: return described error
        if (user is null) return new LoginResponse(404, "Incorrect data", null);
        var passwordIsCorrect = PasswordHasher.VerifyPassword(loginUserForm.Password, user.Password);
        if (!passwordIsCorrect) return new LoginResponse(404, "Incorrect data", null);

        var token = GenerateJwtToken(user);
        return new LoginResponse(200, null, token);
    }

    private static string GenerateJwtToken(User user)
    {
        var handler = new JsonWebTokenHandler();
        var key = new RsaSecurityKey(RsaKey.GetRsaKey());
        var token = handler.CreateToken(new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            }),
            Expires = DateTime.UtcNow.AddDays(1),
            SigningCredentials = new SigningCredentials(key, SecurityAlgorithms.RsaSha256),
        });
        return token ?? "empty";
    }
}

