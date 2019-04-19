using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;
using webNews.Domain.Entities;

namespace webNews.Areas.Admin.Models.Promotion
{
    public class PromotionModel
    {
        public int Id { get; set; }

        [Display(Name = "Mã khuyến mại")]
        [StringLength(20, ErrorMessage = "Mã khuyến mại tối đa 20 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã khuyến mại")]
        public string PromotionCode { get; set; }

        [Display(Name = "Tên khuyến mại")]
        [StringLength(200, ErrorMessage = "Tên khuyến mại tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên khuyến mại")]
        public string PromotionName { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        [Display(Name = "Mô tả")]
        [StringLength(2000, ErrorMessage = "Mô tả tối đa 2000 ký tự")]
        public string Description { get; set; }
        [Display(Name = "Từ ngày")]
        public DateTime? FromDate { get; set; }
        [Display(Name = "Đến ngày")]
        public DateTime? ToDate { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public string Action { get; set; }
        
        public List<SelectListItem> ListStatus { get; set; }
    }
}