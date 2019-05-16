using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webNews.Domain.Entities;
using webNews.Models.InvoiceOutportManagement;

namespace webNews.Areas.Admin.Models.InvoiceRental
{
    public class InvoiceRentalModel
    {
        public int Id { get; set; }

        [Display(Name = "Mã phiếu xuất")]
        public string Code { get; set; }

        [Display(Name = "Khách hàng")]
        public string CustomerCode { get; set; }

        public string CustomerName { get; set; }

        [Display(Name = "Tổng số lượng")]
        public int? TotalQuantity { get; set; }

        [Display(Name = "Tổng hóa đơn")]
        public double? TotalMoney { get; set; }

        [Display(Name = "Chiết khấu")]
        public bool? DiscountType { get; set; }

        [Display(Name = "Chiết khấu")]
        public double? Discount { get; set; }

        [Display(Name = "VAT")]
        public double? VAT { get; set; }

        [Display(Name = "Tổng tiền")]
        public double? SumMoney { get; set; }

        [Display(Name = "Thanh toán (F4)")]
        public double? PaidMoney { get; set; }

        [Display(Name = "Nợ lại")]
        public double? RemainMoney { get; set; }

        [Display(Name = "Phương thức TT")]
        public int PayMethod { get; set; }

        [Display(Name = "Phương thức TT")]
        public string BankCode { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Active { get; set; }

        public int UserId { get; set; }

        [Display(Name = "Người tạo")]
        public string UserName { get; set; }

        [Display(Name = "Ngày tạo")]
        public DateTime? CreatedDate { get; set; }

        [Display(Name = "Ghi chú")]
        public string Note { get; set; }

        public int? Type { get; set; }
        public int CreatedBy { get; set; }

        public List<CategoryItem> CategoryItems { get; set; }
        public string Action { get; set; }
        public List<Vw_InvoiceOutport_Detail> InvoiceOutportDetails { get; set; }
    }
}