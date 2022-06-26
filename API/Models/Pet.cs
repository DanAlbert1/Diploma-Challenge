using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.models
{
    public class Pet
    {
        public Pet(){

        }

        public int OwnerId { get; set; }

        public string? PetName { get; set; }

        public string? Type { get; set; }
    }
}