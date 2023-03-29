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
        catch (InvalidOperationException ex)
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
            Gender = new Gender()
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
        person.Gender = new Gender();
        person.Status = updatePersonForm.Status;

        await _ctx.Update(person);
        return person;
    }


    public async Task<bool> DeletePerson(Person person)
        => await _ctx.Remove(person);
}