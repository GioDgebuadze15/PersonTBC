using PersonTbc.Data.Form;
using PersonTbc.Data.Models;

namespace PersonTbc.Services.AppServices.UserAppService;

public interface IUserService
{
    Task<RegistrationResponse> RegisterUser(CreateUserForm createUserForm);
    LoginResponse LoginUser(LoginUserForm loginUserForm);
}