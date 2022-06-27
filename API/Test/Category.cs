using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class Category
    {
        public Category()
        {
            Products = new HashSet<Product>();
        }

        public int CatId { get; set; }
        public string? CatName { get; set; }

        public virtual ICollection<Product> Products { get; set; }
    }
}
