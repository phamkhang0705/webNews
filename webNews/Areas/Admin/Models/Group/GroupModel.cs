using System;
using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Areas.Admin.Models.Group
{
    public class GroupModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Status { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? CreatedDate { get; set; }
        public int? UpdatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string Action { get; set; }
    }
}