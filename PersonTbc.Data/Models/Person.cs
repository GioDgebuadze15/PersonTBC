using System.ComponentModel.DataAnnotations;

namespace PersonTbc.Data.Models;

public class Person : BaseModel<int>
{
    [Required] public string FirstName { get; set; }
    [Required] public string LastName { get; set; }
    [Required] public ulong PersonalId { get; set; }
    public DateTime? DateOfBirth { get; set; }

    [Required] public int GenderId { get; set; }
    public GenderEntity Gender { get; set; }
    [Required] public AccountStatus Status { get; set; } = AccountStatus.Active;

    public DateTime CreatedDate { get; set; } = DateTime.Now;
}