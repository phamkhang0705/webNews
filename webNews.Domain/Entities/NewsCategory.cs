using ServiceStack.DataAnnotations;
using System.Collections.Generic;

namespace webNews.Domain.Entities
{
    public partial class NewsCategory
    {
        [Reference]
        public List<NewsCategory> CategoryChilds { get; set; }
    }
}
