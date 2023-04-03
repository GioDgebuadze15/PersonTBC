using PersonTbc.Data.Form;

namespace PersonTbc.Services.AppServices.PersonAppService;

public interface IPersonService
{
    object GetPersonById(int id);
    object GetPersonBySearchValue(string searchString);
    IEnumerable<object> GetAllPeople();
    Task<object> AddPerson(CreatePersonForm createPersonForm);
    Task<object> EditPerson(UpdatePersonForm updatePersonForm);
    Task<bool> DeletePerson(int id);
}