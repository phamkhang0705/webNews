using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webNews.Models;

namespace webNews.Domain.Repositories.News
{
    public class INewsRepository
    {
        PagingObject<News> GetNewsPaging(NewsSearch filter, int pageIndex, int pageSize);
    }
}
