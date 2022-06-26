using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class Pet
    {
        public Pet()
        {            
        }

        public int Id { get; set; }
        public int? OwnerId { get; set; }
        public string? PetName { get; set; }
        public string? Type { get; set; }
    }

public class AddPetReq
{
    public AddPetReq()
    {
        
    }    
    [JsonPropertyName("OwnerID")]
    public int OwnerID { get; set; }

    [JsonPropertyName("PetName")]
    public string? PetName { get; set; }

    [JsonPropertyName("Type")]
    public string? Type { get; set; }
}
}
