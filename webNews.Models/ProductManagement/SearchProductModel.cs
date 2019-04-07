using System;
using System.Collections.Generic;

namespace webNews.Models.ProductManagement
{
    public class SearchProductModel
    {
        public int Id { get; set; }
        public int CategoryId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
    }
}