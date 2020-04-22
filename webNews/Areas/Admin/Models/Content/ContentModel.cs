using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.Content
{
    public class ContentModel
    {
        public int Id { get; set; }

        [Display(Name = "Loại nội dung")]
        public int? Type { get; set; }

        public string ContentType { get; set; }

        [Display(Name = "Tên nội dung")]
        public string Title { get; set; }

        public string Url { get; set; }

        [Display(Name = "Nội dung liên kết")]
        public string Link { get; set; }

        [Display(Name = "Nội dung đường dẫn")]
        public string ContentUrl { get; set; }

        [Display(Name = "Text hiển thị")]
        public string ContentText { get; set; }

        [Display(Name = "Mô tả thêm")]
        public string Description { get; set; }

        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }

        public string Action { get; set; }
        public List<SelectListItem> ListStatus { get; set; }

        public List<Domain.Entities.ContentType> ListTypes { get; set; }

        public string ContentCode { get; set; }
        public string ContentName { get; set; }

        [Required]
        public string ContentFolder { get; set; }

        public int? ContentTypeStatus { get; set; }
    }
}