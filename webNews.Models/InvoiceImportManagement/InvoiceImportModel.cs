using System;
using System.Collections.Generic;

namespace webNews.Models.InvoiceImportManagement
{
    public class SearchInvoiceImport
    {
        public string Code { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? Status { get; set; }
    }

    public class InvoiceImportModel
    {
        public int Id { get; set; }
        public string Code { get; set; }

        public string SupplierCode { get; set; }

        public string SupplierName { get; set; }

        public int TotalQuantity { get; set; }

        public double? TotalMoney { get; set; }

        public bool DiscountType { get; set; }

        public double? Discount { get; set; }

        public double? VAT { get; set; }

        public double? SumMoney { get; set; }

        public double? PaidMoney { get; set; }

        public double? RemainMoney { get; set; }

        public int PayMethod { get; set; }

        public string BankCode { get; set; }

        public int? Active { get; set; }

        public int UserId { get; set; }

        public string UserName { get; set; }

        public DateTime? CreatedDate { get; set; }

        public string Note { get; set; }

        public int? Type { get; set; }
        public int CreatedBy { get; set; }

        public List<CategoryItem> CategoryItems { get; set; }
    }

    public class CategoryItem
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public double PriceSale { get; set; }
        public double PriceInput { get; set; }
        public int Quantity { get; set; }
        public double ImportPrice { get; set; }
        public double ReturnPrice { get; set; }
        public double TotalMoney { get; set; }
        public DateTime DateLimit { get; set; }
        public int TotalQuantity { get; set; }
        public int RealTotalQuantity { get; set; }
        public int QuantityFail { get; set; }
    }
}