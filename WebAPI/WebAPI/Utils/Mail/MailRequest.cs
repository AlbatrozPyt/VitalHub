namespace WebAPI.Utils.Email
{
    public class MailRequest
    {
        // Email do destinatário
        public string? ToEmail { get; set; }
        //Asunto do email
        public string? Subject { get; set; }
        // Corpo do email
        public string? Body { get; set; }
    }
}
