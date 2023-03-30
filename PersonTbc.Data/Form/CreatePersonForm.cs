using PersonTbc.Data.Models;

namespace PersonTbc.Data.Form;

public class CreatePersonForm
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public uint PersonalId { get; set; }

    public DateTime? DateOfBirth { get; set; }
    public Gender Gender { get; set; }
}