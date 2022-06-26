using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.models
{
    public class OwnerRequest
    {
        public OwnerRequest(){

        }
        public OwnerRequest(string? Surname, string? Firstname, string? Phone, string? Email ){
            this.Surname = Surname;
            this.Firstname = Firstname;
            this.Phone = Phone;
            this.Email = Email;
        }

        [JsonPropertyName("Surname")]
        public string? Surname { get; set; }

        [JsonPropertyName("Firstname")]
        public string? Firstname { get; set; }

        [JsonPropertyName("Phone")]
        public string? Phone { get; set; }

        [JsonPropertyName("Email")]
        public string? Email { get; set; }
    }
}