using NLog;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.BizAccountManagement;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.BizAccountManagement
{
    public class BizAccountService : Service<BizAccount>, IBizAccountService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IBizAccountRepository _typeRepository;

        public BizAccountService(IBizAccountRepository typeRepository, IRepository<BizAccount> repository) : base(repository)
        {
            _typeRepository = typeRepository;
        }

        public PagingObject<Vw_BizAccount> GetList(SearchCategoryModel filter, int pageIndex, int pageSize)
        {
            return _typeRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _typeRepository.CheckExist(userName);
        }
    }
}