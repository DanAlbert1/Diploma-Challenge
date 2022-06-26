
namespace API.models
{
    public class Procedure
    {
        public Procedure(){

        }

        public int ProcedureID { get; set; }

        public string? Description { get; set; }

        public Decimal Price { get; set; }       
    }
}