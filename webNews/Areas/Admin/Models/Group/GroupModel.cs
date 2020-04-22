using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.Group
{
    public class GroupModel
    {
        public int Id { get; set; }

        [Display(Name = "Mã nhóm")]
        [StringLength(10, ErrorMessage = "Mã nhóm tối đa 10 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã nhóm")]
        public string Code { get; set; }

        [Display(Name = "Tên nhóm")]
        [StringLength(200, ErrorMessage = "Tên nhóm tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên nhóm")]
        public string Name { get; set; }

        [Display(Name = "Tên nhóm SEO")]
        public string ShortName { get; set; }

        [Display(Name = "Mô tả")]
        [StringLength(2000, ErrorMessage = "Mô tả tối đa 2000 ký tự")]
        public string Description { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string Action { get; set; }

        public List<SelectListItem> ListStatus { get; set; }
    }
}