using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class Shipping
    {
        public Shipping()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string? ShipMode { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}
