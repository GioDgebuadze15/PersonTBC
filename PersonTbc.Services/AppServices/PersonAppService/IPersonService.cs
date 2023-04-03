using PersonTbc.Data.Form;
using PersonTbc.Data.Models;

namespace PersonTbc.Services.AppServices.PersonAppService;

public interface IPersonService
{
    object GetPersonById(int id);
    object GetPersonBySearchValue(string searchString);
    IEnumerable<object> GetAllPeople();
    Task<AddPersonResponse> AddPerson(CreatePersonForm createPersonForm);
    Task<EditPersonResult> EditPerson(UpdatePersonForm updatePersonForm);
    Task<DeletePersonResult> DeletePerson(int id);
}