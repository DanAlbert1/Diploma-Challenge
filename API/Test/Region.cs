using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class Region
    {
        public Region()
        {
            Customers = new HashSet<Customer>();
        }

        public int Id { get; set; }
        public string? Region1 { get; set; }

        public virtual ICollection<Customer> Customers { get; set; }
    }
}
