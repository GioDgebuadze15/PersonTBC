using FluentValidation;

namespace PersonTbc.Data.Form.Validation;

public class CreatePersonFormValidation : AbstractValidator<CreatePersonForm>
{
    public CreatePersonFormValidation()
    {
        RuleFor(x => x.FirstName).NotEmpty().WithMessage("FirstName is required.");
        RuleFor(x => x.LastName).NotEmpty().WithMessage("LastName is required.");
        RuleFor(x => x.PersonalId.ToString())
            .NotEmpty().WithMessage("PersonalId is required.")
            .Length(11).WithMessage("PersonalId must be exactly 9 digits.");
        RuleFor(x => x.Gender).NotEmpty().WithMessage("Gender is required.");
    }
}