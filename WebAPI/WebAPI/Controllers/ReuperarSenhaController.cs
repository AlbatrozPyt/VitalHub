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
    public class ReuperarSenhaController : ControllerBase
    {
        private readonly VitalContext _context;
        private readonly EmailSendingService _emailSendingService;


        public ReuperarSenhaController(VitalContext context, EmailSendingService emailSendingService) 
        {
            _context = context;
            _emailSendingService = emailSendingService;
        }

        [HttpPost]
        public async Task<IActionResult> SendRecoveryCodePassword(string email)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.Email == email);

                if (user == null)
                {
                    return NotFound("Usuário não encontrado.");
                }

                // Gerar o codigo de 4 digitos
                Random random = new Random();
                int recoveryCode = random.Next(1000, 9999);

                user.CodRecupSenha = recoveryCode;

                await _context.SaveChangesAsync();

                await _emailSendingService.SendRecovery(user.Email!, recoveryCode);

                return Ok("Codigo enviado com sucesso.");
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost("Validar")]
        public async Task<IActionResult> ValidateCode(int codigo)
        {
            try
            {
                var user = await _context.Usuarios.FirstOrDefaultAsync(x => x.CodRecupSenha == codigo);

                if (user != null)
                {
                    user.CodRecupSenha = null;
                    await _context.SaveChangesAsync();
                    return Ok("Codigo valido");
                }

                return NotFound("codigo invalido");
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
