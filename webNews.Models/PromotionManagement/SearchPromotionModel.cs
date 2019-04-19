using System;
using System.Collections.Generic;

namespace webNews.Models.PromotionManagement
{
    public class SearchPromotionModel
    {
        public string PromotionCode { get; set; }
        public string PromotionName { get; set; }
        public int? Status { get; set; }
    }
}