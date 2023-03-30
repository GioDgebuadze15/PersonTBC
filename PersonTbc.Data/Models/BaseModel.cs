using System.ComponentModel.DataAnnotations;

namespace PersonTbc.Data.Models;

public abstract class BaseModel<TKEy>
{
    [Key] public TKEy Id { get; set; }
}