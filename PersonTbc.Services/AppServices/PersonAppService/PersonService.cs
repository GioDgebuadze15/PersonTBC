using Microsoft.Extensions.Logging;
using PersonTbc.Data.Form;
using PersonTbc.Database.DatabaseRepository;
using PersonTbc.Data.Models;
using PersonTbc.Data.ViewModels;

namespace PersonTbc.Services.AppServices.PersonAppService;

public class PersonService : IPersonService
{
    private readonly IRepository<Person> _ctx;

    public PersonService(IRepository<Person> ctx)
    {
        _ctx = ctx;
    }

    public object GetPersonById(int id)
    {
        try
        {
            return PersonViewModels.Default.Compile().Invoke(_ctx.GetById(id));
        }
        catch (InvalidOperationException ex)
        {
            //TODO: Log the exception in txt file 
            return null;
        }
    }

    //TODO: apply projection here
    public object GetPersonBySearchValue(string searchString)
    {
        var lowerCaseSearchString = searchString.ToLower().Trim().Split(" ").First();
        var people = _ctx.GetAll();
        return people.Where(x =>
                x.FirstName.ToLower().Contains(lowerCaseSearchString) ||
                x.LastName.ToLower().Contains(lowerCaseSearchString) ||
                x.PersonalId.ToString().Equals(lowerCaseSearchString))
            .Select(PersonViewModels.Default.Compile())
            .ToList();
    }

    //TODO: apply projection here
    public IEnumerable<object> GetAllPeople()
        => _ctx.GetAll().Select(PersonViewModels.Default.Compile());

    public async Task<object> AddPerson(CreatePersonForm createPersonForm)
    {
        if (PersonalIdAlreadyExists(createPersonForm.PersonalId)) return null;
        var person = new Person
        {
            FirstName = createPersonForm.FirstName,
            LastName = createPersonForm.LastName,
            PersonalId = createPersonForm.PersonalId,
            DateOfBirth = createPersonForm.DateOfBirth,
            //TODO: correct this
            GenderId = 1,
        };
        await _ctx.Add(person);
        return PersonViewModels.Default.Compile().Invoke(person);
    }

    public async Task<object> EditPerson(UpdatePersonForm updatePersonForm)
    {
        try
        {
            var person = _ctx.GetById(updatePersonForm.Id);
            person.FirstName = updatePersonForm.FirstName;
            person.LastName = updatePersonForm.LastName;
            person.PersonalId = updatePersonForm.PersonalId;
            person.DateOfBirth = updatePersonForm.DateOfBirth;
            //TODO: correct this
            person.GenderId = 1;
            person.Status = updatePersonForm.Status;

            await _ctx.Update(person);
            return PersonViewModels.Default.Compile().Invoke(person);
        }
        catch (InvalidOperationException ex)
        {
            //TODO: Log the exception in txt file 
            return null;
        }
    }


    public async Task<bool> DeletePerson(int id)
    {
        try
        {
            var person = _ctx.GetById(id);
            await _ctx.Remove(person);
            return true;
        }
        catch (InvalidOperationException e)
        {
            //TODO: Log the exception in txt file 
            return false;
        }
    }

    private bool PersonalIdAlreadyExists(ulong personalId)
    {
        var people = _ctx.GetAll();
        return people.Any(x => x.PersonalId.Equals(personalId));
    }
}