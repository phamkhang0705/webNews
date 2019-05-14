using System;
using System.Collections.Generic;

namespace webNews.Models.PaymentVoucherManagement
{
    public class SearchPaymentVoucher
    {
        public string Code { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? Status { get; set; }
    }
}