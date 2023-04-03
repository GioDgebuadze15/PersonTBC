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
            .Length(11).WithMessage("PersonalId must be exactly 11 digits.");
        RuleFor(x => x.Gender).NotEmpty().WithMessage("Gender is required.");
        RuleFor(x => x.Status).IsInEnum().WithMessage("Account status is not correct.");
    }
}