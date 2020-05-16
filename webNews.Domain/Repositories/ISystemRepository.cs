using webNews.Models.Common;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Threading.Tasks;
using NLog;
using webNews.Models;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories
{
    public interface ISystemRepository
    {
        HomePageInfo GetPageInfo(Filter filter);
        List<Medium> GetMedias(Filter filter);
        List<System_Menu> GetMenu();
        List<System_Menu> GetMenu(string area);
        News GetNews(int id, int type);
        PagingObject<News> GetNews(Filter filter);
        List<NewsCategory> GetNewCategories(Filter filter);
        List<ProjectCategory> GetProjectCategories(Filter filter);
        PagingObject<Project> GetProjects(Filter filter);
        List<System_Menu> GetMenuUser();
        List<Security_Function> GetListFunctions();
        List<Security_Permission> GetListSecurity_Permission();
        List<Security_VwRoleService> GetMarkPermission(List<Security_UserRole> listRole);
        bool Security_Permission_Update(Security_Permission request);
        int Security_Permission_Delete(int id);
        string CodeGen(ObjectType objectType, string name = "Z", int number = 10);

        Task<PagingObject<T>> PagingAsync<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null);
        PagingObject<T> Paging<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null);

        //List object
        PagingObject<T> Paging<T>(List<T> list, int? pageIndex = null, int? pageSize = null);

        List<Province> GetProvinces();
        List<District> GetDistricts(string provinceId);
        List<Ward> GetWards(string wardId);

        List<Bank> GetBanks(int status = 1);
        List<InvoiceType> GetTypes(int status = 1);

        //get about information

        Vw_News GetAbout(int status = 1);
        Vw_News GetForCustomer(int status = 1);

        List<Content> GetBanners(int type = 0, int status = 1);
        Content GetBanner(int type = 0, int status = 1);

        List<MenuFE> GetMenuFE();
    }

}