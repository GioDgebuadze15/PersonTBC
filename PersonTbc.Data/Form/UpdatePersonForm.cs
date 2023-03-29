using PersonTbc.Data.Models;

namespace PersonTbc.Data.Form;

public class UpdatePersonForm : CreatePersonForm
{
    public int Id { get; set; }
    public AccountStatus Status { get; set; }
}