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
	[Alias("Vw_InvoiceOutput_Detail")]
    public partial class Vw_InvoiceOutput_Detail 
    {
        [Required]
        public int Id { get; set; }
        public int? InvoiceOutputId { get; set; }
        public string CategoryCode { get; set; }
        public string Name { get; set; }
        public int? Quantity { get; set; }
        public double? Price { get; set; }
        public double? TotalMoney { get; set; }
    }

}
#pragma warning restore 1591