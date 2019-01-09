using System.Collections.Generic;

namespace webNews.Models
{
    public class PagingObject<T>
    {
        public List<T> DataList { get; set; }
        public int Total { get; set; }
        public string ExtendInfo { get; set; }
        public int CurrentPage { get; set; }
        public int PageSize { get; set; }
        public string Slug { get; set; }
    }
}
