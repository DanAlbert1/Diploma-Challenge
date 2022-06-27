using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class Customer
    {
        public Customer()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string? CustId { get; set; }
        public string? FullName { get; set; }
        public int? SegId { get; set; }
        public string? Country { get; set; }
        public string? City { get; set; }
        public string? State { get; set; }
        public int? PostCode { get; set; }
        public int? Region { get; set; }

        public virtual Region? RegionNavigation { get; set; }
        public virtual Segment? Seg { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
