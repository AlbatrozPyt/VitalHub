using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace WebAPI.ViewModels
{
    public class UsusarioViewModel
    {
        [NotMapped]
        [JsonIgnore]

        public IFormFile? Arquivo { get; set; }

        public string? Foto { get; set; }
    }
}
