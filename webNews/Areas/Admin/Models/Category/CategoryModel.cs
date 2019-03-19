using System;
using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Areas.Admin.Models.Category
{
    public class CategoryModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int? FromAge { get; set; }
        public int? ToAge { get; set; }
        public int? Status { get; set; }
        public string Description { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public List<FileAttach> ListFiles { get; set; }
        public List<GroupCategory> ListGroupCategorys { get; set; }
        public List<ProductPrice> ListPrices { get; set; }
    }
}