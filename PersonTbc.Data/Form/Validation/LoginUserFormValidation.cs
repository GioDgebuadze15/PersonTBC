using FluentValidation;

namespace PersonTbc.Data.Form.Validation;

public class LoginUserFormValidation : AbstractValidator<LoginUserForm>
{
    public LoginUserFormValidation()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email address is required.")
            .EmailAddress()
            .WithMessage("Invalid email address.");

        RuleFor(user => user.Password)
            .NotEmpty()
            .WithMessage("Password is required.");
    }
}