using PersonTbc.Data.Form;
using PersonTbc.Data.Models;

namespace PersonTbc.Services.AppServices.PersonAppService;

public interface IPersonService
{
    Person? GetPersonById(int id);
    Task<Person> AddPerson(CreatePersonForm createPersonForm);
    Task<Person> EditPerson(UpdatePersonForm updatePersonForm);
    Task<bool> DeletePerson(Person person);
}