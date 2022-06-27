using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace API.Models
{
    public class ViewOrders
    {
        public ViewOrders()
        {
                        
        }
        
        public int Id { get; set; }
        public int CustId { get; set; }
        public string? Description { get; set; }
        public DateTime? OrderDate { get; set; }
        public int? Quantity { get; set; }
        public DateTime? ShipDate { get; set; }
        public string? ShipMode { get; set; }
       
    }
}
