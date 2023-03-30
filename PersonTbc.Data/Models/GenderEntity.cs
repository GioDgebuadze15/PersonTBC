using System.ComponentModel.DataAnnotations;

namespace PersonTbc.Data.Models;

public class GenderEntity : BaseModel<int>
{
    [Required] public Gender Gender { get; set; }

    public IList<Person> People { get; set; } = new List<Person>();
}