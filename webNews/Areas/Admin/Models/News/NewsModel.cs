﻿using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Web.Mvc;

namespace webNews.Areas.Admin.Models.News
{
    public class NewsModel
    {
        public int Id { get; set; }
        public int? Type { get; set; }
        [Display(Name = "Nhóm bài viết")]
        public int? CategoryId { get; set; }
        [Display(Name = "Tiêu đề")]
        public string Title { get; set; }
        [Display(Name = "Nội dung")]
        public string Content { get; set; }
        [Display(Name = "Nội dung chi tiết")]
        public string ContentDetail { get; set; }
        public string Description { get; set; }
        [Display(Name = "Trạng thái")]
        public int? Status { get; set; }
        public string Image { get; set; }
        public string Action { get; set; }
        public List<SelectListItem> ListStatus { get; set; }
        public List<Domain.Entities.NewsCategory> ListTypes { get; set; }
        [Display(Name = "Loại bài viết")]
        public string CategoryTitle { get; set; }
    }
}