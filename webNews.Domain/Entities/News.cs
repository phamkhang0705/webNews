using ServiceStack.DataAnnotations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Domain.Entities
{
    public partial class News
    {
        public const int TYPE_NEWS = 1;
        public const int TYPE_INTRODUCTION = 2;
        public const int TYPE_RECRUITMENT = 3;
        public const int TYPE_SHAREHOLDER = 4;
        public const int TYPE_INVESTMENT = 5;

        [Reference]
        public List<News> RelateNews { get; set; }

        [Reference]
        public List<NewsCategory> Categories { get; set; }

        //[Reference]
        //public List<Tag> ListTags { get; set; }
    }
}
