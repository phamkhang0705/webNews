using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.ContentType
{
    public class ContentTypeModel
    {
        public int Id { get; set; }

        [Display(Name = "Mã nhóm nội dung")]
        [StringLength(50, ErrorMessage = "Mã nhóm nội dung tối đa 50 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập mã nhóm nội dung")]
        public string ContentCode { get; set; }

        [Display(Name = "Tên nhóm")]
        [StringLength(200, ErrorMessage = "Tên nhóm nội dung tối đa 200 ký tự")]
        [Required(ErrorMessage = "Vui lòng nhập tên nhóm nội dung")]
        public string ContentName { get; set; }

        public string Description { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        public string Action { get; set; }
        public List<SelectListItem> ListStatus { get; set; }
    }
}