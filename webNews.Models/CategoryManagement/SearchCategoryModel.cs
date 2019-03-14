using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Models.CategoryManagement
{
    public class SearchCategoryModel
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public int OrderTypeId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int FromAge { get; set; }
        public int ToAge { get; set; }
        public int Status { get; set; }
    }

    public class CategoryModel
    {
        public int Id { get; set; }
        public int? GroupId { get; set; }
        public int? OrderTypeId { get; set; }
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
    }
}
