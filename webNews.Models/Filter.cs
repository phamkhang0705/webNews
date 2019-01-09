using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Models
{
    public class Filter
    {
        public Filter()
        {
            Lang = "vi";
            Page = 0;
            PageLength = 5;
            Type = 1;
        }

        public string Lang { get; set; }
        public int CateId { get; set; }
        public int Page { get; set; }
        public int PageLength { get; set; }
        public int Type { get; set; }
        public string ExtraInfo { get; set; }
    }
}
