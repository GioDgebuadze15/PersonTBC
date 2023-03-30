using PersonTbc.Data.Form;
using PersonTbc.Database.DatabaseRepository;
using PersonTbc.Data.Models;

namespace PersonTbc.Services.AppServices.PersonAppService;

public class PersonService : IPersonService
{
    private readonly IRepository<Person> _ctx;

    public PersonService(IRepository<Person> ctx)
    {
        _ctx = ctx;
    }

    public Person? GetPersonById(int id)
    {
        try
        {
            return _ctx.GetById(id);
        }
        catch (InvalidOperationException e)
        {
            //TODO: Log the exception in txt file 
            return null;
        }
    }

    public async Task<Person> AddPerson(CreatePersonForm createPersonForm)
    {
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
        return person;
    }

    public async Task<Person> EditPerson(UpdatePersonForm updatePersonForm)
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
        return person;
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
}