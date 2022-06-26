using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.models
{
    public class Claims
    {
        public Claims(){

        }

        public string? Claim { get; set; }
    }
}