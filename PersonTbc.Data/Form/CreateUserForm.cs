using System.ComponentModel.DataAnnotations;

namespace PersonTbc.Data.Form;

public class CreateUserForm
{
    public string Email { get; set; }

    [DataType(DataType.Password)] public string Password { get; set; }

    [DataType(DataType.Password)]
    [Compare(nameof(Password))]
    public string ConfirmPassword { get; set; }
}