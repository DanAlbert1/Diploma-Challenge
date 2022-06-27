using System;
using System.Collections.Generic;

namespace API.Test
{
    public partial class Order
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? Quantity { get; set; }
        public DateTime? ShipDate { get; set; }
        public int? ShipMode { get; set; }

        public virtual Customer? Customer { get; set; }
        public virtual Product? Product { get; set; }
        public virtual Shipping? ShipModeNavigation { get; set; }
    }

    public class OrderReq{
        public OrderReq(){
            
        }

        public int? CustomerId { get; set; }
        public int? ProductId { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? Quantity { get; set; }
        public DateTime? ShipDate { get; set; }
        public int? ShipMode { get; set; }
    }
}
