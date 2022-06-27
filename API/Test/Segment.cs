using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class Segment
    {
        public Segment()
        {
            Customers = new HashSet<Customer>();
        }

        public int Id { get; set; }
        public string? SegName { get; set; }

        public virtual ICollection<Customer> Customers { get; set; }
    }
}
