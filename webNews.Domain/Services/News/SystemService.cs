using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using webNews.Domain.Repositories;
using webNews.Models;
using NLog;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;

namespace webNews.Domain.Services.News
{
    public class NewsService : INewsService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly Logger _logger = LogManager.GetLogger("NewsService");
        public NewsService(ISystemRepository systemRepository)
        {
            _systemRepository = systemRepository;
        }
    }
}
