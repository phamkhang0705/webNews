// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591

using System;

using ServiceStack.DataAnnotations;
using ServiceStack.Model;
using ServiceStack;

namespace webNews.Domain.Entities
{
	[Alias("Vw_InvoiceRental_Detail")]
    public partial class Vw_InvoiceRental_Detail 
    {
        [Required]
        public int Id { get; set; }
        public int? InvoiceOutportId { get; set; }
        public int? ProductId { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
        public int? CategoryId { get; set; }
        public double? Deposits_Money { get; set; }
        public double? Price { get; set; }
        public int? Quantity { get; set; }
        public double? Transport_Money { get; set; }
        public double? TotalMoney { get; set; }
    }

}
#pragma warning restore 1591