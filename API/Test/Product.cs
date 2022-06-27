using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class Product
    {
        public Product()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string? ProdId { get; set; }
        public int? CatId { get; set; }
        public string? Description { get; set; }
        public decimal? UnitPrice { get; set; }

        public virtual Category? Cat { get; set; }
        public virtual ICollection<Order> Orders { get; set; }
    }
}
