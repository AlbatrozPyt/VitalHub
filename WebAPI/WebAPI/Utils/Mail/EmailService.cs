
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

namespace WebAPI.Utils.Mail
{
    public class EmailService : IEmailService
    {
        // Variável que armazena as configs de EmailSettings
        private readonly EmailSettings emailSettings;
        // Construtor que recbe a dependencia de injection de EmailSettings
        public EmailService(IOptions<EmailSettings> options)
        {

            emailSettings = options.Value;
        }

        // Método para envio de Email
        public async Task SendEmailAsync(MailRequest mailResquest)
        {
            try
            {
                // Obejto que representa o email
                var email = new MimeMessage();

                // Define o remetente do email
                email.Sender = MailboxAddress.Parse(emailSettings.Email);

                // Define o destinatário do email
                email.To.Add(MailboxAddress.Parse(mailResquest.ToEmail));

                // Cria corpo do email
                var builder = new BodyBuilder();

                // Define o corpo do email como HTML
                builder.HtmlBody = mailResquest.Body;

                // Define o corpo do email no obj MimeMessage
                email.Body = builder.ToMessageBody();

                // Cria um client SMTP para envio de email
                using(var smtp = new SmtpClient())
                {
                    // Conecte-se ao servidor SMTP usando
                    smtp.Connect(emailSettings.Host, emailSettings.Port,SecureSocketOptions.StartTls);

                    // Autentica-se no servidor SMTP usando os dados de emailSettings
                    smtp.Authenticate(emailSettings.Email, emailSettings.Password);

                    // Envia o email
                    await smtp.SendAsync(email);
                }
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
