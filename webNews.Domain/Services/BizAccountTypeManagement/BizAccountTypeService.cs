using NLog;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.BizAccountManagement;
using webNews.Domain.Repositories.BizAccountTypeManagement;
using webNews.Domain.Services.BizAccountTypeManagement;
using webNews.Models;
using webNews.Models.CategoryManagement;

namespace webNews.Domain.Services.BizAccountTYpeManagement
{
    public class BizAccountTypeService : Service<BizAccountType>, IBizAccountTypeService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IBizAccountTypeRepository _typeRepository;

        public BizAccountTypeService(IBizAccountTypeRepository typeRepository, IRepository<BizAccountType> repository) : base(repository)
        {
            _typeRepository = typeRepository;
        }

        public PagingObject<Vw_BizAccountType> GetList(SearchCategoryModel filter, int pageIndex, int pageSize)
        {
            return _typeRepository.GetList(filter, pageIndex, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _typeRepository.CheckExist(userName);
        }
    }
}