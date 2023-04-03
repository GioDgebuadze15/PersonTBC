using Microsoft.EntityFrameworkCore;
using PersonTbc.Data.Models;


namespace PersonTbc.Database.EntityFramework;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<GenderEntity>().HasData(
            new GenderEntity {Id = 1, Gender = "Male"},
            new GenderEntity {Id = 2, Gender = "Female"}
        );
    }

    public DbSet<Person> People { get; set; }
    public DbSet<GenderEntity> Genders { get; set; }
    public DbSet<User> Users { get; set; }
}