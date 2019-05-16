using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using webNews.Domain.Repositories;
using webNews.Models;
using NLog;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;
using webNews.Models.Common;

namespace webNews.Domain.Services
{
    public class SystemService : ISystemService
    {
        private readonly ISystemRepository _systemRepository;
        private readonly Logger _logger = LogManager.GetLogger("SystemService");
        public SystemService(ISystemRepository systemRepository)
        {
            _systemRepository = systemRepository;
        }

        public bool Security_Permission_Update(Security_Permission request)
        {
            return _systemRepository.Security_Permission_Update(request);
        }

        public int Security_Permission_Delete(int id)
        {
            return _systemRepository.Security_Permission_Delete(id);
        }

        public string ReplaceStringWithToken(Dictionary<string, string> tokens, string input)
        {
            if (string.IsNullOrEmpty(input) || tokens == null || tokens.Count == 0) return input;
            var b = new StringBuilder(input);
            foreach (var token in tokens)
            {
                if (!b.ToString().Contains(token.Key)) continue;
                b.Replace(token.Key, token.Value);
            }
            return b.ToString();
        }

        public Task<PagingObject<T>> PagingAsync<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null)
        {
            return _systemRepository.PagingAsync(query, pageIndex, pageSize);
        }

        public PagingObject<T> Paging<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null)
        {
            return _systemRepository.Paging(query, pageIndex, pageSize);
        }

        public PagingObject<T> Paging<T>(List<T> list, int? pageIndex = null, int? pageSize = null)
        {
            return _systemRepository.Paging(list, pageIndex, pageSize);
        }

        public HomePageInfo GetPageInfo(Filter filter)
        {
            return _systemRepository.GetPageInfo(filter);
        }

        public List<System_Menu> GetMenu()
        {
            return _systemRepository.GetMenu();
        }

        public PagingObject<News> GetNews(Filter filter)
        {
            return _systemRepository.GetNews(filter);
        }

        public List<NewsCategory> GetNewCategories(Filter filter)
        {
            return _systemRepository.GetNewCategories(filter);
        }

        public List<ProjectCategory> GetProjectCategories(Filter filter)
        {
            return _systemRepository.GetProjectCategories(filter);
        }

        public PagingObject<Project> GetProjects(Filter filter)
        {
            return _systemRepository.GetProjects(filter);
        }

        public List<Medium> GetMedias(Filter filter)
        {
            return _systemRepository.GetMedias(filter);
        }

        public News GetNews(int id, int type)
        {
            return _systemRepository.GetNews(id, type);
        }

        public List<Province> GetProvinces()
        {
            return _systemRepository.GetProvinces();
        }

        public List<District> GetDistricts(string provinceId)
        {
            return _systemRepository.GetDistricts(provinceId);
        }

        public List<Ward> GetWards(string districtId)
        {
            return _systemRepository.GetWards(districtId);
        }


        public string CodeGen(ObjectType objectType, string name = "Z", int number = 10)
        {
            return _systemRepository.CodeGen(objectType, name, number);
        }

        public List<Bank> GetBanks(int status = 1)
        {
            return _systemRepository.GetBanks(status);
        }

        public List<InvoiceType> GetTypes(int status = 1)
        {
            return _systemRepository.GetTypes(status);
        }
    }
}
