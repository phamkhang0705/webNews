﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webNews.Domain.Entities;

namespace webNews.Areas.Admin.Models.Payment
{
    public class PaymentModel
    {
        public int Id { get; set; }
        [Display(Name = "Mã phiếu chi")]
        public string PaymentCode { get; set; }
        [Display(Name = "Hình thức thanh toán")]
        public int? PaymentMethod { get; set; }
        [Display(Name = "Nhân viên")]
        public string UserName { get; set; }
        [Display(Name = "Tổng tiền")]
        public double? TotalMoney { get; set; }
        public bool? PaymentType { get; set; }
        [Display(Name = "Phiếu nhập hàng")]
        public string InvoiceCode { get; set; }
        [Display(Name = "Tài khoản")]
        public string BankCode { get; set; }
        [Display(Name = "Ghi chú")]
        public string Description { get; set; }
        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }
        [Display(Name = "Nợ lại")]
        public double? RemainMoney { get; set; }
        [Display(Name = "Đã thanh toán")]
        public double? PaidMoney { get; set; }
        [Display(Name = "Người tạo")]
        public int? CreatedBy { get; set; }
        [Display(Name = "Ngày tạo")]
        public DateTime? CreatedDate { get; set; }
        public int? UpdateBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? PersonType { get; set; }
        [Display(Name = "Nhà cung cấp")]
        public string CustomerName { get; set; }
        public string Payments_Person { get; set; }
        public string Action { get; set; }
        public List<Vw_InvoiceImport> ListInvoiceImports { get; set; }
        public List<Bank> ListBanks { get; set; }

        [Display(Name = "Số tiền")]
        [Required(ErrorMessage = "Vui lòng nhập số tiền cần thanh toán")]
        public double? PaymentMoney { get; set; }
    }
}