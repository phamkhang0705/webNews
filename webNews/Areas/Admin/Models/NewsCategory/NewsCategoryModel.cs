using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.NewsCategory
{
    public class NewsCategoryModel
    {
        public int Id { get; set; }

        [Display(Name = "Tên nhóm")]
        [StringLength(200, ErrorMessage = "Tên nhóm nội dung tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên nhóm nội dung")]
        public string Title { get; set; }

        public string Description { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        public string Action { get; set; }
        public List<SelectListItem> ListStatus { get; set; }
    }
}