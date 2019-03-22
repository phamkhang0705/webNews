using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webNews.Domain.Entities;
using System.Web.Mvc;
namespace webNews.Areas.Admin.Models.Category
{
    public class CategoryModel
    {
        public int Id { get; set; }

        [Display(Name = "Mã nhóm")]
        [Required(ErrorMessage = "Vui lòng nhập mã nhóm")]
        public int GroupId { get; set; }
        [Display(Name = "Mã danh mục")]
        [StringLength(10, ErrorMessage = "Mã danh mục tối đa 10 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã danh mục")]
        public string Code { get; set; }
        [Display(Name = "Tên danh mục")]
        [StringLength(200, ErrorMessage = "Tên danh mục tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên danh mục")]
        public string Name { get; set; }
        [Display(Name = "Từ tuổi")]
        public int? FromAge { get; set; }
        [Display(Name = "Đến tuổi")]
        public int? ToAge { get; set; }
        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }
        [Display(Name = "Mô tả")]
        [StringLength(2000, ErrorMessage = "Mô tả tối đa 2000 ký tự")]
        public string Description { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public List<FileAttach> ListFiles { get; set; }
        public List<GroupCategory> ListGroupCategorys { get; set; }
        public List<Domain.Entities.Group> ListGroups { get; set; }
        public List<ProductPrice> ListPrices { get; set; }
        public string Action { get; set; }

        public string prices { get; set; }
        public string groupids { get; set; }
        public string groupnames { get; set; }
        public string files { get; set; }

        public List<SelectListItem> ListStatus { get; set; }
        public List<OrderType> ListOrderTypes { get; set; }
        public List<Vw_CategoryPrice> ListCategoryPrices { get; set; }
        public List<GroupCategory> ListGroupCategories { get; set; }
        public List<FileAttach> ListFileAttaches { get; set; }
    }
}