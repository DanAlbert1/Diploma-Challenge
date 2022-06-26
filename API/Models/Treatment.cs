using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.models
{
    public class Treatment
    {
        public Treatment(){

        }

        public Treatment(
            int OwnerId,
            string? PetName,
            int ProcedureID,
            DateTime Date,
            string? Notes,
            Decimal Payment
        )
        {
            this.OwnerId = OwnerId;
            this.PetName = PetName;
            this.ProcedureID = ProcedureID;
            this.Date = Date;
            this.Notes = Notes;
            this.Payment = Payment;
        }

        [Key]
        [JsonPropertyName("ID")]
        public int ID { get; set; }

        [JsonPropertyName("OwnerId")]
        public int OwnerId { get; set; }

        [JsonPropertyName("PetName")]
        public string? PetName { get; set; }
        
        [JsonPropertyName("ProcedureID")]
        public int ProcedureID { get; set; }
        
        [JsonPropertyName("Date")]
        public DateTime Date { get; set; }

        [JsonPropertyName("Notes")]
        public string? Notes { get; set; }

        [JsonPropertyName("Payment")]
        public Decimal Payment { get; set; }
    }


    public class TreatmentReq
    {
        public TreatmentReq(){

        }

        public TreatmentReq(
            int OwnerId,
            string? PetName,
            int ProcedureID,
            DateTime Date,
            string? Notes,
            Decimal Payment
        )
        {
            this.OwnerId = OwnerId;
            this.PetName = PetName;
            this.ProcedureID = ProcedureID;
            this.Date = Date;
            this.Notes = Notes;
        }

        [JsonPropertyName("OwnerId")]
        public int OwnerId { get; set; }

        [JsonPropertyName("PetName")]
        public string? PetName { get; set; }
        
        [JsonPropertyName("ProcedureID")]
        public int ProcedureID { get; set; }
        
        [JsonPropertyName("Date")]
        public DateTime Date { get; set; }

        [JsonPropertyName("Notes")]
        public string? Notes { get; set; }
    }


    public class ViewTreatment{
        public ViewTreatment(){

        }

        [Key]
        [JsonPropertyName("ID")]
        public int ID { get; set; }

        [JsonPropertyName("OwnerId")]
        public int OwnerID { get; set; }

        [JsonPropertyName("PetName")]
        public string? PetName { get; set; }

        [JsonPropertyName("ProcedureID")]
        public int ProcedureID { get; set; }

        [JsonPropertyName("Date")]
        public DateTime Date { get; set; }

        [JsonPropertyName("Notes")]
        public string? Notes { get; set; }

        [JsonPropertyName("Payment")]
        public decimal Payment { get; set; }

        [JsonPropertyName("AmountOwed")]
        public decimal AmountOwed { get; set; }
    }
}