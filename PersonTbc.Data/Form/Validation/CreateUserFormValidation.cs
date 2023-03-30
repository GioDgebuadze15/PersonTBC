using FluentValidation;

namespace PersonTbc.Data.Form.Validation;

public class CreateUserFormValidation : AbstractValidator<CreateUserForm>
{
    public CreateUserFormValidation()
    {
        RuleFor(x => x.Email)
            .NotEmpty()
            .WithMessage("Email address is required.")
            .EmailAddress()
            .WithMessage("Invalid email address.");

        RuleFor(user => user.Password)
            .NotEmpty()
            .WithMessage("Password is required.")
            .MinimumLength(8)
            .WithMessage("Password must be at least 8 characters long.")
            .Matches("[A-Z]")
            .WithMessage("Password must contain at least one uppercase letter.")
            .Matches("[a-z]")
            .WithMessage("Password must contain at least one lowercase letter.")
            .Matches("[0-9]")
            .WithMessage("Password must contain at least one digit.");

        RuleFor(user => user.ConfirmPassword)
            .Equal(user => user.Password)
            .WithMessage("Password and confirm password do not match.");
    }
}