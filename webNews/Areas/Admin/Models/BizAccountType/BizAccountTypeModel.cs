using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using webNews.Domain.Entities;
using System.Web.Mvc;
namespace webNews.Areas.Admin.Models.BizAccountType
{
    public class BizAccountTypeModel
    {
        public int Id { get; set; }

        [Display(Name = "Nhóm tài khoản")]
        [Required(ErrorMessage = "Vui lòng chọn nhóm")]
        public string Group { get; set; }
        [Display(Name = "Mã loại tài khoản")]
        [StringLength(10, ErrorMessage = "Mã loại tài khoản tối đa 10 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã loại tài khoản")]
        public string Code { get; set; }
        [Display(Name = "Tên loại tài khoản")]
        [StringLength(200, ErrorMessage = "Tên loại tài khoản tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên loại tài khoản")]
        public string Name { get; set; }
        [Display(Name = "Mô tả")]
        public string Description { get; set; }
        public string Action { get; set; }
        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        public List<SelectListItem> ListStatus { get; set; }
        public List<BizAccountGroup> ListGroups { get; set; }
    }
}