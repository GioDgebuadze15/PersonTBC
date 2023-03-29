using System.ComponentModel.DataAnnotations;

namespace PersonTbc.Models;

public abstract class BaseModel<TKEy>
{
    [Key] public TKEy Id { get; set; }
    public DateTime CreatedDate { get; set; } = DateTime.Now;
}