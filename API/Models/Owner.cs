using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class Owner
    {
        public Owner()
        {
                        
        }
        
        public int OwnerId { get; set; }
        public string? Surname { get; set; }
        public string? FirstName { get; set; }
        public string? Phone { get; set; }
    }
    
    public class CreateOwnerReq
{
    public CreateOwnerReq()
    {
        
    }
    
    [JsonPropertyName("Surname")]
    public string? Surname { get; set; }

    [JsonPropertyName("FirstName")]
    public string? FirstName { get; set; }

    [JsonPropertyName("Phone")]
    public string? Phone { get; set; }
}

public class LoginModel
{
    public LoginModel()
    {
        
    }
    
    [JsonPropertyName("Phone")]
    public string? Phone { get; set; }
}
}
