using Microsoft.AspNetCore.Mvc;
using WebAPI.Interfaces;
using WebAPI.Repositories;
using WebAPI.Utils.BlobStorage;
using WebAPI.ViewModels;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private IUsuarioRepository usuarioRepository { get; set; }

        public UsuarioController()
        {
            usuarioRepository = new UsuarioRepository();
        }

        [HttpPut("AlterarSenha")]
        public IActionResult UpdatePassword(string email, AlterarSenhaViewModel senha)
        {
            try
            {
                usuarioRepository.AlterarSenha(email, senha.SenhaNova!);

                return Ok("Senha alterada com sucesso !");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("BuscarPorId")]
        public IActionResult GetById(Guid id)
        {
            try
            {
                return Ok(usuarioRepository.BuscarPorId(id));
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("AlterarFotoPerfil")]
<<<<<<< HEAD
        public async Task<IActionResult> UploadProfileImage(Guid id, [FromForm] UsusarioViewModel user)
        {
            try
            {
                var usuarioBuscado = usuarioRepository.BuscarPorId(id);

=======
        public async Task<IActionResult> UploadProfileImage(Guid id,[FromForm] UsuarioViewModel user)
        {
            try
            {
                Usuario usuarioBuscado = usuarioRepository.BuscarPorId(id);
>>>>>>> Pedro
                if (usuarioBuscado == null)
                {
                    return NotFound();
                }

<<<<<<< HEAD
                // lógica para o upload de imagem
                var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobmatheusenrike;AccountKey=wBs/O9Sjz94SbXLDSZa1JvmHfkKtI7sCuf5ZXRNMtYKQ6do+ljl+GJKB/0ySq4Yd34Wx8u6609c1+AStnI0uXg==;EndpointSuffix=core.windows.net";

                var containerName = "conteiner-mk";

                string fotoUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!, connectionString, containerName);

=======
                // Lógica para o upload de imagem
                var connectionString = "DefaultEndpointsProtocol=https;AccountName=blobvitalhubg15;AccountKey=IN+DEYZjIQLDCG4pTvAa3ZGD+yCno9aN4lFvYzx/c7gWu1qL5vkMS5xlDcs481AIga9Q68gZa3u1+AStLB6aag==;EndpointSuffix=core.windows.net";

                var containerName = "containervitalhubpedro";

                string fotoUrl = await AzureBlobStorageHelper.UploadImageBlobAsync(user.Arquivo!, connectionString, containerName);

                // Fim da lógica

>>>>>>> Pedro
                usuarioBuscado.Foto = fotoUrl;

                usuarioRepository.AtualizarFoto(id, fotoUrl);

                return Ok();
<<<<<<< HEAD
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

=======

            }
            catch (Exception)
            {

                return BadRequest();
            }
        }
>>>>>>> Pedro
    }
}
