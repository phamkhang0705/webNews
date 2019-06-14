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
	[Alias("Vw_ReceiverVoucher")]
    public partial class Vw_ReceiverVoucher 
    {
        [Required]
        public int Id { get; set; }
        public string PaymentCode { get; set; }
        public int? PaymentMethod { get; set; }
        public string UserName { get; set; }
        public double? TotalMoney { get; set; }
        public bool? PaymentType { get; set; }
        public string InvoiceCode { get; set; }
        public string BankCode { get; set; }
        public string Description { get; set; }
        public int? Status { get; set; }
        public double? RemainMoney { get; set; }
        public double? PaidMoney { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdateBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? PersonType { get; set; }
        public string Payments_Person { get; set; }
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public double? PaymentMoney { get; set; }
    }

}
#pragma warning restore 1591
