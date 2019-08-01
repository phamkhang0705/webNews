using System;
using System.Collections.Generic;

namespace webNews.Models.InvoiceOutportManagement
{
    public class SearchInvoiceOutport
    {
        public string Code { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? Status { get; set; }
        public int? Type { get; set; }
        public bool IsRental { get; set; }
    }

    public class InvoiceOutportModel
    {
        public int Id { get; set; }
        public string Code { get; set; }

        public string CustomerCode { get; set; }

        public string CustomerName { get; set; }

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
        public double? TotalDeposit { get; set; }
        public double? TotalTransport { get; set; }
        public double? TotalDepositDiscount { get; set; }
        public double? TotalTransportDiscount { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public string DeliveryAddress { get; set; }
        public string DeliveryPhone { get; set; }
        public string InvoiceType { get; set; }

        public List<CategoryItem> CategoryItems { get; set; }
    }

    public class CategoryItem
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public double Price { get; set; }
        public double PriceInput { get; set; }
        public int Quantity { get; set; }
        public double OutputPrice { get; set; }
        public double ReturnPrice { get; set; }
        public double TotalMoney { get; set; }
        public DateTime DateLimit { get; set; }
        public int TotalQuantity { get; set; }
        public int RealTotalQuantity { get; set; }
        public int QuantityFail { get; set; }
        public string ProductCode { get; set; }
        public double Deposits_Money { get; set; }
        public double Transport_Money { get; set; }
    }
}