using System.Collections.Generic;
using System.Threading.Tasks;
using webNews.Models;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;
using webNews.Models.Common;

namespace webNews.Domain.Services
{
    public interface ISystemService
    {
        HomePageInfo GetPageInfo(Filter filter);
        List<Medium> GetMedias(Filter filter);
        List<System_Menu> GetMenu();
        News GetNews(int id, int type);
        PagingObject<News> GetNews(Filter filter);
        List<NewsCategory> GetNewCategories(Filter filter);
        List<ProjectCategory> GetProjectCategories(Filter filter);
        PagingObject<Project> GetProjects(Filter filter);
        bool Security_Permission_Update(Security_Permission request);
        int Security_Permission_Delete(int id);
        string ReplaceStringWithToken(Dictionary<string, string> tokens, string input);
        Task<PagingObject<T>> PagingAsync<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null);
        PagingObject<T> Paging<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null);
        string CodeGen(ObjectType objectType, string name = "Z", int number = 10);
        //List object
        PagingObject<T> Paging<T>(List<T> list, int? pageIndex = null, int? pageSize = null);
        List<Province> GetProvinces();
        List<District> GetDistricts(string provinceId);
        List<Ward> GetWards(string districtId);

        List<Bank> GetBanks(int status = 1);
        List<InvoiceType> GetTypes(int status = 1);

        About GetAbout(int status=1);
        About GetForCustomer(int status=1);

        List<Content> GetBanners(int type = 0, int status = 1);
        Content GetBanner(int type = 0, int status = 1);
    }
}
