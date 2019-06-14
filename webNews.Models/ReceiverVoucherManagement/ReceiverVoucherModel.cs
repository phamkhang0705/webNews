using System;
using System.Collections.Generic;

namespace webNews.Models.ReceiverVoucherManagement
{
    public class SearchReceiverVoucher
    {
        public string Code { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public int? Status { get; set; }
        public bool PaymentType { get; set; }
    }
}