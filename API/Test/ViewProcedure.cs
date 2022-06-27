using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class ViewProcedure
    {
        public int? OwnerId { get; set; }
        public string? PetName { get; set; }
        public DateTime? Date { get; set; }
        public int ProcedureId { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
    }
}
