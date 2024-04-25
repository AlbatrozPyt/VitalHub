using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPI.Contexts;
using WebAPI.Domains;
using WebAPI.Utils.Mail;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RecuperarSenhaController : ControllerBase
    {
        private readonly VitalContext _context;
        private readonly EmailSendService _emailSendService;
        public RecuperarSenhaController(VitalContext context, EmailSendService emailSendService)
        {
            _context = context;
            _emailSendService = emailSendService;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCOdePassword(string email)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                // Gerar um código com 4 algarismo
                Random random = new Random();
                int recoveryCode = random.Next(1000, 9999);

                user.CodRecupSenha = recoveryCode;

                await _context.SaveChangesAsync();

                await _emailSendService.SendRecovery(user.Email!, recoveryCode);

                return Ok("Código enviado com sucesso!");
            }
            catch (Exception ex)
            {

                return BadRequest(ex.Message);
            }
        }

        // Crie um controller para validar o código enviado para o email
        // Se o código for , resete o código anterior no banco e devolva
        // um status code informando se o código for válido

        [HttpPost("Validar código")]
        public async Task<IActionResult> ValidarCode(int CodRecupSenha, string Email)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == Email);

                if (user == null)
                {
                    return NotFound("Usuário não encontrado");
                }

                if (user.CodRecupSenha != CodRecupSenha)
                {
                    return BadRequest("Código inválido");
                }
                user.CodRecupSenha = null;

                await _context.SaveChangesAsync();
                return Ok("Códgo válido");
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
