using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebAPI.Domains;
using WebAPI.Interfaces;
using WebAPI.Repositories;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EnderecoController : ControllerBase
    {
        private readonly IEnderecoInterface _endereco;

        public EnderecoController()
        {
            _endereco = new EnderecoRepository();
        }

        [HttpGet("ListarCidades")]
        public IActionResult ListarCidades(string cidade)
        {
            try
            {
                return Ok(_endereco.Cidades(cidade));
            }
            catch (Exception)
            {
                return BadRequest();
            }
        }
    }
}
