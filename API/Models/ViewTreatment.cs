using System;
using System.Collections.Generic;

namespace API.Models
{
    public partial class View_Treatment
    {
        public int? OwnerId { get; set; }
        public int TreatmentId { get; set; }
        public int? FkPetId { get; set; }
        public string? PetName { get; set; }
        public int ProcedureId { get; set; }
        public string? ProcedureName { get; set; }
        public DateTime? Date { get; set; }
        public string? Notes { get; set; }
        public decimal? Payment { get; set; }
        public decimal? AmountOwed { get; set; }
    }
}
