using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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
        [Display(Name = "Mã phiếu nhập")]
        public string Code { get; set; }
        [Display(Name = "Nhà cung cấp")]
        public string ProviderCode { get; set; }
        [Display(Name = "Tổng số lượng")]
        public int TotalQuantity { get; set; }
        [Display(Name = "Tổng hóa đơn")]
        public double TotalMoney { get; set; }
        [Display(Name = "Chiết khấu")]
        public bool DiscountType { get; set; }
        public double Discount { get; set; }
        [Display(Name = "VAT")]
        public double VAT { get; set; }
        [Display(Name = "Tổng tiền")]
        public double SumMonney { get; set; }
        [Display(Name = "Thanh toán (F4)")]
        public double PaidMoney { get; set; }
        [Display(Name = "Nợ lại")]
        public double RemainMoney { get; set; }
        [Display(Name = "Phương thức TT")]
        public int PayMethod { get; set; }
        [Display(Name = "Phương thức TT")]
        public string BankCode { get; set; }
        [Display(Name = "Trạng thái")]
        public int Active { get; set; }
        public int UserId { get; set; }
        [Display(Name = "Người tạo")]
        public string UserName { get; set; }
        [Display(Name = "Ngày tạo")]
        public DateTime CreateDate { get; set; }
        [Display(Name = "Ghi chú")]
        public string Note { get; set; }
        public string Domain { get; set; }
        public string BranchCode { get; set; }

        [Display(Name = "Cộng vào TKNCC")]
        public bool AddToProvider { get; set; }
        public int StoreId { get; set; }
        public int? Type { get; set; }

        public List<ProductItem> ProductItems { get; set; }
    }

    public class ProductItem
    {
        public int Id { get; set; }
        public string ProductCode { get; set; }
        public string ProductName { get; set; }
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
