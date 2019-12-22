using System;
using System.Collections.Generic;

namespace webNews.Models.CategoryManagement
{
    public class SearchCategoryModel
    {
        public int Id { get; set; }
        public List<int> GroupId { get; set; }
        public int OrderTypeId { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public int FromAge { get; set; }
        public int ToAge { get; set; }
        public int Status { get; set; }
    }

    public class SearchCategoryModelFE
    {
        public string name { get; set; }
        public int? type { get; set; }
        public int? agetype { get; set; }
        public string group { get; set; }
        public int? Page { get; set; }
        public int? PageSize { get; set; }
        public int? IsRental { get; set; }
        public int? IsSale { get; set; }
        public string categorytype { get; set; }
    }
}