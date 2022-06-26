using System;
using System.Collections.Generic;

namespace API.Models
{
    public class Treatment
    {
        public int Id { get; set; }
        public int? FkPetId { get; set; }
        public int? FkProcedureId { get; set; }
        public DateTime? Date { get; set; }
        public string? Notes { get; set; }
        public decimal? Payment { get; set; }
    }
    public class TreatmentReq
    {        
        public int? FkPetId { get; set; }
        public int? FkProcedureId { get; set; }
        public DateTime? Date { get; set; }
        public string? Notes { get; set; }
        public decimal? Payment { get; set; }
    }
}
