using System.Linq.Expressions;
using PersonTbc.Data.Models;

namespace PersonTbc.Data.ViewModels;

public static class PersonViewModels
{
    public static Expression<Func<Person, object>> Default =>
        person => new
        {
            person.Id,
            person.FirstName,
            person.LastName,
            person.PersonalId,
            person.DateOfBirth,
            Gender = person.GenderId == 1 ? "Male" : "Female",
            AccountStatus = person.Status == 0 ? "Active" : "Passive",
            person.CreatedDate
        };
}