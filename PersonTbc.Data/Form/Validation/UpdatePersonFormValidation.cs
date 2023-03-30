using FluentValidation;

namespace PersonTbc.Data.Form.Validation;

public class UpdatePersonFormValidation : AbstractValidator<UpdatePersonForm>
{
    public UpdatePersonFormValidation()
    {
        RuleFor(x => x.Id).NotEqual(0);
        RuleFor(x => x.FirstName).NotEmpty().WithMessage("FirstName is required.");
        RuleFor(x => x.LastName).NotEmpty().WithMessage("LastName is required.");
        RuleFor(x => x.PersonalId.ToString())
            .NotEmpty().WithMessage("PersonalId is required.")
            .Length(9).WithMessage("PersonalId must be exactly 9 digits.");
        RuleFor(x => x.Gender).IsInEnum().WithMessage("Gender is not correct.");
        RuleFor(x => x.Status).IsInEnum().WithMessage("Account status is not correct.");
    }
}