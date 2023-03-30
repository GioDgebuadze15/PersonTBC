using Microsoft.EntityFrameworkCore;
using PersonTbc.Data.Models;


namespace PersonTbc.Database.EntityFramework;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Person> People { get; set; }
    public DbSet<GenderEntity> Genders { get; set; }
    public DbSet<User> Users { get; set; }
}