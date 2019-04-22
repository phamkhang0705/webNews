using System;
using System.Collections.Generic;

namespace webNews.Models.CustomerManagement
{
    public class SearchCustomerModel
    {
        public string CustomerCode { get; set; }
        public string CustomerName { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Facebook { get; set; }
        public int? Status { get; set; }
        public int CustomerType { get; set; }
    }
}