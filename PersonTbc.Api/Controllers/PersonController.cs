using Microsoft.AspNetCore.Mvc;
using PersonTbc.Data.Form;
using PersonTbc.Services.AppServices.PersonAppService;

namespace PersonTbc.Api.Controllers;

[Route("api/person")]
public class PersonController : ApiController
{
    private readonly IPersonService _iPersonService;

    public PersonController(IPersonService iPersonService)
    {
        _iPersonService = iPersonService;
    }

    [HttpGet("{id::int}")]
    public IActionResult GetOne(int id)
    {
        return Ok(_iPersonService.GetPersonById(id));
    }

    [HttpGet]
    public IActionResult GetAll()
    {
        return Ok();
    }

    [HttpPost]
    public IActionResult Add([FromBody] CreatePersonForm createPersonForm)
    {
        return Ok(_iPersonService.AddPerson(createPersonForm));
    }

    [HttpPut]
    public IActionResult Edit([FromBody] UpdatePersonForm updatePersonForm)
    {
        return Ok(_iPersonService.EditPerson(updatePersonForm));
    }

    [HttpDelete("{id::int}")]
    public IActionResult Delete(int id)
    {
        return Ok(_iPersonService.DeletePerson(id));
    }
}