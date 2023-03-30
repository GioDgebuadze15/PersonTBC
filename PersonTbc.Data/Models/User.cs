using System.ComponentModel.DataAnnotations;

namespace PersonTbc.Data.Models;

public class User : BaseModel<string>
{
    [Required] public string Email { get; set; }
    [Required] public string Password { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}