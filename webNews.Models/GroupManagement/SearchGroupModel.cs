using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Models.GroupManagement
{
    public class SearchGroupModel
    {
        public int Id { get; set; }
        public string  Code { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
    }

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
    }
}
