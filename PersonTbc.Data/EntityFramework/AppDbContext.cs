using Microsoft.EntityFrameworkCore;
using PersonTbc.Data.Models;


namespace PersonTbc.Data.EntityFramework;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Person> People { get; set; }
    public DbSet<Gender> Genders { get; set; }
}