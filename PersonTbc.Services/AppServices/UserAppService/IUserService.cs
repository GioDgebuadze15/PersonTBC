using PersonTbc.Data.Form;

namespace PersonTbc.Services.AppServices.UserAppService;

public interface IUserService
{
    Task<string> RegisterUser(CreateUserForm createUserForm);
    string LoginUser(LoginUserForm loginUserForm);
}