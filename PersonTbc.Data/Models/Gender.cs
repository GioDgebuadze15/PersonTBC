using System.ComponentModel.DataAnnotations;

namespace PersonTbc.Data.Models;

public class Gender : BaseModel<int>
{
    [Required] public string Value { get; set; }
}