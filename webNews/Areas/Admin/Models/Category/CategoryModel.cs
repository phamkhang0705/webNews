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
        public string GroupId { get; set; }
        [Display(Name = "Mã danh mục")]
        [StringLength(10, ErrorMessage = "Mã danh mục tối đa 10 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã danh mục")]
        public string Code { get; set; }
        [Display(Name = "Tên danh mục")]
        [StringLength(200, ErrorMessage = "Tên danh mục tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên danh mục")]
        public string Name { get; set; }
        [Display(Name="Tên danh mục SEO")]
        public string ShortName { get; set; }
        [Display(Name = "Từ")]
        public int? FromAge { get; set; }
        [Display(Name = "Đến")]
        public int? ToAge { get; set; }
        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }
        [Display(Name = "Tháng/Tuổi")]
        public int? AgeType { get; set; }

        [Display(Name = "Mô tả")]
        [AllowHtml]
        //        [StringLength(2000, ErrorMessage = "Mô tả tối đa 2000 ký tự")]
        public string Description { get; set; }
        [AllowHtml]
        [Display(Name = "Thông tin")]
//        [StringLength(2000, ErrorMessage = "Thông tin tối đa 2000 ký tự")]
        public string MoreInformation { get; set; }
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

        public string[] lstFiles { get; set; }

        public List<SelectListItem> ListStatus { get; set; }
        public List<SelectListItem> ListAgeType { get; set; }
        public List<OrderType> ListOrderTypes { get; set; }
        public List<Vw_CategoryPrice> ListCategoryPrices { get; set; }
        public List<GroupCategory> ListGroupCategories { get; set; }
        public List<FileAttach> ListFileAttaches { get; set; }


        // CategoryDetail
        [Display(Name = "Danh mục")]
        [Required(ErrorMessage = "Vui lòng chọn danh mục")]
        public int? CategoryId { get; set; }
        public int? CategoryDetailId { get; set; }

        [Display(Name = "Số lượng")]
        [Required(ErrorMessage = "Vui lòng nhập số lượng")]
        public int? Quantity { get; set; }
        [Display(Name = "Mô tả")]
        
        public string DescriptionDetail { get; set; }

        public List<Domain.Entities.Category> ListCategories { get; set; }
    }
}