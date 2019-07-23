using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webNews.Domain.Entities;
using System.Web.Mvc;
namespace webNews.Areas.Admin.Models.Product
{
    public class ProductModel
    {
        public int Id { get; set; }

        [Display(Name = "Danh mục")]
        [Required(ErrorMessage = "Vui lòng nhập danh mục")]
        public string CategoryId { get; set; }
        [Display(Name = "Mã sản phẩm")]
        [StringLength(10, ErrorMessage = "Mã sản phẩm tối đa 10 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã sản phẩm")]
        public string ProductCode { get; set; }
        [Display(Name = "Tên sản phẩm")]
        [StringLength(200, ErrorMessage = "Tên sản phẩm tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên sản phẩm")]
        public string ProductName { get; set; }
        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }
        [Display(Name = "Tình trạng")]
        [StringLength(2000, ErrorMessage = "Tình trạng tối đa 2000 ký tự")]
        public string Description { get; set; }

        [Display(Name = "Tồn kho")]
        public int? Inventory { get; set; }
        [Display(Name = "Số lượng")]
        [Required(ErrorMessage = "Vui lòng nhập số lượng")]
        public int? Quantity { get; set; }
        [Display(Name = "Ngày kiểm tra")]
        [Required(ErrorMessage = "Vui lòng nhập ngày kiểm tra")]
        public DateTime? CheckDate { get; set; }
        [Display(Name = "Biện pháp xử lý")]
        [Required(ErrorMessage = "Vui lòng nhập biện pháp xử lý")]
        [AllowHtml]
        public string Solution { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public List<FileAttach> ListFiles { get; set; }
        
        public List<ProductPrice> ListPrices { get; set; }
        public string Action { get; set; }
        
        public string files { get; set; }

        public string[] lstFiles { get; set; }

        public List<SelectListItem> ListStatus { get; set; }
        public List<FileAttach> ListFileAttaches { get; set; }
        public List<Domain.Entities.Category> ListCategories { get; set; }
    }
}