
namespace API.models
{
    public class ProcedureView
    {
        public ProcedureView(){

        }

        public int OwnerId { get; set; }

        public string? PetName { get; set; }

        public DateTime Date { get; set; }
        public int ProcedureID { get; set; }
        
        public string? Description { get; set; }        
        public Decimal Price { get; set; }        
    }
}