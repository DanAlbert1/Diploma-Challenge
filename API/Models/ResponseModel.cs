using System.Text.Json.Serialization;

namespace API.Models;


public class Response<T>
{    
    public Response()
    {
        
    }
    public Response(T data, bool success, string message)
    {
        this.Data = data;
        this.Success = success;
        this.Message = message;
    }

    [JsonPropertyName("Data")]
    public T? Data { get; set; }
    
    [JsonPropertyName("Success")]
    public bool Success { get; set; }

    [JsonPropertyName("Message")]
    public string? Message { get; set; }
}