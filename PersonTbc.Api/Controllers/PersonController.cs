using Microsoft.AspNetCore.Mvc;
using PersonTbc.Data.Models;

namespace PersonTbc.Api.Controllers;

[Route("api/person")]
public class PersonController : ApiController
{
    [HttpPost]
    public IActionResult Add(Person person)
    {
        return Ok();
    }
}