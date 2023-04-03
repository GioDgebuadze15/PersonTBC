using Microsoft.Extensions.Logging;
using PersonTbc.Data.Form;
using PersonTbc.Database.DatabaseRepository;
using PersonTbc.Data.Models;
using PersonTbc.Data.ViewModels;

namespace PersonTbc.Services.AppServices.PersonAppService;

public class PersonService : IPersonService
{
    private readonly IRepository<Person> _ctx;
    private readonly IRepository<GenderEntity> _genderCtx;
    private readonly ILogger<PersonService> _logger;

    public PersonService(IRepository<Person> ctx, IRepository<GenderEntity> genderCtx, ILogger<PersonService> logger)
    {
        _ctx = ctx;
        _genderCtx = genderCtx;
        _logger = logger;
    }

    public object GetPersonById(int id)
    {
        try
        {
            return PersonViewModels.Default.Compile().Invoke(_ctx.GetById(id));
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "An error occurred in GetPersonById with id {id}", id);
            return new object();
        }
    }

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

    public IEnumerable<object> GetAllPeople()
        => _ctx.GetAll().Select(PersonViewModels.Default.Compile());

    public async Task<object> AddPerson(CreatePersonForm createPersonForm)
    {
        if (PersonalIdAlreadyExists(createPersonForm.PersonalId)) return new object();
        var gender = GetGenderEntity(createPersonForm.Gender);
        if (gender is null) return new object();
        var person = new Person
        {
            FirstName = createPersonForm.FirstName,
            LastName = createPersonForm.LastName,
            PersonalId = createPersonForm.PersonalId,
            DateOfBirth = createPersonForm.DateOfBirth,
            Gender = gender
        };
        var result = await _ctx.Add(person);
        return PersonViewModels.Default.Compile().Invoke(result);
    }


    public async Task<object> EditPerson(UpdatePersonForm updatePersonForm)
    {
        var gender = GetGenderEntity(updatePersonForm.Gender);
        if (gender is null) return new object();
        try
        {
            var person = _ctx.GetById(updatePersonForm.Id);
            person.FirstName = updatePersonForm.FirstName;
            person.LastName = updatePersonForm.LastName;
            person.PersonalId = updatePersonForm.PersonalId;
            person.DateOfBirth = updatePersonForm.DateOfBirth;
            person.Gender = gender;
            person.Status = updatePersonForm.Status;

            await _ctx.Update(person);
            return PersonViewModels.Default.Compile().Invoke(person);
        }
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "An error occurred in EditPerson. Person doesnt exist with id {id}",
                updatePersonForm.Id);
            return new object();
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
        catch (InvalidOperationException ex)
        {
            _logger.LogError(ex, "An error occurred in DeletePerson with id {id}", id);
            return false;
        }
    }

    private bool PersonalIdAlreadyExists(ulong personalId)
    {
        var people = _ctx.GetAll();
        return people.Any(x => x.PersonalId.Equals(personalId));
    }

    private GenderEntity? GetGenderEntity(string gender)
    {
        var genders = _genderCtx.GetAll();
        return genders.FirstOrDefault(x => x.Gender.ToLower().Contains(gender.ToLower()));
    }
}