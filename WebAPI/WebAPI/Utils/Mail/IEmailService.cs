using WebAPI.Utils.Email;

namespace WebAPI.Utils.Mail
{
    public interface IEmailService
    {
        // Método assincrono para envio de e-mail
        Task SendEmailAsync(MailRequest mailResquest);
    }
}
