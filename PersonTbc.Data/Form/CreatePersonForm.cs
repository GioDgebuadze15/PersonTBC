using PersonTbc.Data.Models;

namespace PersonTbc.Data.Form;

public class CreatePersonForm
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public ulong PersonalId { get; set; }

    public DateTime? DateOfBirth { get; set; }
    public string Gender { get; set; }
}