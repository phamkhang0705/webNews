// <auto-generated />
// This file was generated by a T4 template.
// Don't change it directly as your change would get overwritten.  Instead, make changes
// to the .tt file (i.e. the T4 template) and save it to regenerate this file.

// Make sure the compiler doesn't complain about missing Xml comments
#pragma warning disable 1591

using System;

using ServiceStack.DataAnnotations;
using ServiceStack.Model;
using ServiceStack;

namespace webNews.Domain.Entities
{
	[Alias("DanhMucSanPham")]
    public partial class DanhMucSanPham : IHasId<int> 
    {
        [Alias("Id")]
        [AutoIncrement]
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
#pragma warning restore 1591
