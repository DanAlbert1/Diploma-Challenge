using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.models
{
    public class Owner
    {
        public Owner(){

        }

        public Owner(
            string? userID, string? surname,
            string? firstName, string? phone, string? email)
        {
            UserID = userID;
            Surname = surname;
            Firstname = firstName;
            Phone = phone;
            Email = email;
        }


        public int OwnerId { get; set; }
        public string? UserID { get; set; }

        public string? Surname { get; set; }

        public string? Firstname { get; set; }

        public string? Phone { get; set; }
        public string? Email { get; set; }
    }
}