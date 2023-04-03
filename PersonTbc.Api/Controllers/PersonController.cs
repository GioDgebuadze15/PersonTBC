using Microsoft.AspNetCore.Authorization;
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

    [HttpGet("search")]
    public IActionResult Get([FromQuery] string searchString)
    {
        return Ok(_iPersonService.GetPersonBySearchValue(searchString));
    }


    [HttpGet]
    public IActionResult GetAll()
        => Ok(_iPersonService.GetAllPeople());

    [HttpPost]
    [Authorize]
    public async Task<IActionResult> Add([FromBody] CreatePersonForm createPersonForm)
    {
        var result = await _iPersonService.AddPerson(createPersonForm);
        return result.StatusCode switch
        {
            400 => BadRequest(result),
            404 => NotFound(result),
            _ => Ok(result)
        };
    }

    [HttpPut]
    [Authorize]
    public async Task<IActionResult> Edit([FromBody] UpdatePersonForm updatePersonForm)
    {
        var result = await _iPersonService.EditPerson(updatePersonForm);
        return result.StatusCode switch
        {
            400 => BadRequest(result),
            404 => NotFound(result),
            _ => Ok(result)
        };
    }

    [HttpDelete("{id::int}")]
    [Authorize]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _iPersonService.DeletePerson(id);
        if (result.StatusCode is 404) return NotFound(result);
        return Ok(result);
    }
}