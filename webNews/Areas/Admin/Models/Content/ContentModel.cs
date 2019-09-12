using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.Content
{
    public class ContentModel
    {
        public int Id { get; set; }
        public int? Type { get; set; }
        public string ContentType { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Link { get; set; }
        public string ContentUrl { get; set; }
        
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