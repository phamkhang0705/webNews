using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Models.Common
{
    public class SearchModel
    {
        public class SearchCommonModel
        {
            public int Id { get; set; }
            public string Code { get; set; }
            public string Name { get; set; }
            public int Status { get; set; }
        }
    }
}
