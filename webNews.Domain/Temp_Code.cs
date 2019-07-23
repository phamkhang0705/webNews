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
	[Alias("Temp_Code")]
    public partial class Temp_Code : IHasId<int> 
    {
        [Alias("Id")]
        [AutoIncrement]
        public int Id { get; set; }
        [Required]
        public string Date { get; set; }
        [Required]
        public int Customer { get; set; }
        [Required]
        public int Supplier { get; set; }
        [Required]
        public int InvoiceImport { get; set; }
        [Required]
        public int InvoiceOutport { get; set; }
        [Required]
        public int InvoiceRental { get; set; }
        [Required]
        public int PaymentVoucher { get; set; }
        [Required]
        public int ReceiveVoucher { get; set; }
        [Required]
        public int Category { get; set; }
    }

}
#pragma warning restore 1591
