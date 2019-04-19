using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using webNews.Models;
using NLog;
using ServiceStack.OrmLite;
using webNews.Models.Common;
using ServiceStack.Data;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories
{
    public class SystemRepository : ISystemRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetLogger("SystemRepository");

        public SystemRepository(IWebNewsDbConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public HomePageInfo GetPageInfo(Filter filter)
        {
            var pageInfo = new HomePageInfo();

            using (var db = _connectionFactory.Open())
            {
                var query = db.From<System_Menu>();
                query = query.Where(x => x.ShowMenu == true && x.Area == "FE" && x.MenuLevel == 1
                                && (filter.Lang != "all"))
                            .OrderBy(x => x.MenuOrder);

                pageInfo.Menus = db.Select(query);

                var medias = db.Select<Medium>();

                //pageInfo.Branches = medias.Where(x => x.MediaType == Medium.TYPE_BRANCH).Select(x => new BasicInfo {
                //    Content = x.Content,
                //    ImageUrl = x.Source,
                //    Href = x.Slug,
                //    TargetUrl = x.Slug,
                //    Title = x.Content
                //}).ToList();

                //pageInfo.Banners = medias.Where(x => x.MediaType == Medium.TYPE_BANNER).Select(x => new BasicInfo
                //{
                //    Content = x.Content,
                //    ImageUrl = x.Source,
                //    Href = x.Slug,
                //    TargetUrl = x.Slug,
                //    Title = x.Content
                //}).ToList();

                //var logo = medias.Where(x => x.MediaType == Medium.TYPE_LOGO).Select(x => new BasicInfo
                //{
                //    Content = x.Content,
                //    ImageUrl = x.Source,
                //    Href = x.Slug,
                //    TargetUrl = x.Slug,
                //    Title = x.Content
                //}).FirstOrDefault();

                //pageInfo.Logo = logo != null ? logo.ImageUrl : HomePageInfo.LOGO_DEFAULT;

                //pageInfo.Options = db.Select<System_Option>().FirstOrDefault();
            }

            return pageInfo;
        }


        public PagingObject<News> GetNews(Filter filter)
        {
            var returnObj = new PagingObject<News>();
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<News>();
                    query = query.Where(x => x.Status == 1 && x.Type == filter.Type && (filter.Lang == "all"));

                    if (filter.CateId != 0)
                    {
                        query = query.Where(x => x.CategoryId == filter.CateId);
                    }

                    returnObj.Total = Convert.ToInt32(db.Count(query));
                    query = query.Skip(filter.Page * filter.PageLength).Take(filter.PageLength);
                    returnObj.DataList = db.Select(query);
                    returnObj.CurrentPage = filter.Page;
                    returnObj.PageSize = filter.PageLength;

                    return returnObj;

                }
            }
            catch(Exception ex)
            {
                _logger.Info("Get news error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public List<NewsCategory> GetNewCategories(Filter filter)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<NewsCategory>();
                    //query = query.Where(x => x.Status == 1 && x.Type == filter.Type && (filter.Lang == "all" || x.Lang == filter.Lang));
                    
                    return db.Select(query);

                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get news category error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public List<ProjectCategory> GetProjectCategories(Filter filter)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<ProjectCategory>();
                    //query = query.Where(x => x.Status == 1 && (filter.Lang == "all" || x.Lang == filter.Lang));

                    return db.Select(query);

                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get projects category error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public PagingObject<Project> GetProjects(Filter filter)
        {
            var returnObj = new PagingObject<Project>();
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Project>();
                    //query = query.Where(x => x.Status == 1 && (filter.Lang == "all" || x.Lang == filter.Lang));

                    if (filter.CateId != 0)
                    {
                        query = query.Where(x => x.CategoryId == filter.CateId);
                    }

                    returnObj.Total = Convert.ToInt32(db.Count(query));
                    query = query.Skip(filter.Page * filter.PageLength).Take(filter.PageLength);
                    returnObj.DataList = db.Select(query);
                    returnObj.CurrentPage = filter.Page;
                    returnObj.PageSize = filter.PageLength;

                    return returnObj;

                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get projects error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public List<System_Menu> GetMenu()
        {
            using (var db = _connectionFactory.Open())
            {
                var query = db.From<System_Menu>();
                query = query.Where(x => x.ShowMenu == true && x.Area == "Admin");
                return db.Select(query);
            }
        }
        public List<System_Menu> GetMenu(string area)
        {
            using (var db = _connectionFactory.Open())
            {
                var query = db.From<System_Menu>();
                query = query.Where(x => x.ShowMenu == true && x.Area == area);
                return db.Select(query);
            }
        }

        public List<System_Menu> GetMenuUser()
        {
            using(var db = _connectionFactory.Open())
            {
                var query = db.From<System_Menu>();
                query = query.Where(x => x.ShowMenu == true && x.Area != "Admin");
                return db.Select(query);
            }
        }

        public List<Security_Function> GetListFunctions()
        {
            using(var db = _connectionFactory.Open())
            {
                var query = db.From<Security_Function>();
                return db.Select(query);
            }
        }

        public List<Security_Permission> GetListSecurity_Permission()
        {
            using(var db = _connectionFactory.Open())
            {
                var query = db.From<Security_Permission>();
                return db.Select(query);
            }
        }

        public List<Security_VwRoleService> GetMarkPermission(List<Security_UserRole> listRole)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {
                    var queryRole = listRole.Select(x => x.Id);
                    var queryMark = db.From<Security_VwRoleService>().Where(e => Sql.In(e.RoleID, queryRole));
                    var listper = db.Select(queryMark).ToList();
                    return listper;
                }
            }
            catch(Exception ex)
            {
                _logger.Error("MarkRole fail: " + ex.Message);
                return null;
            }
        }

        public bool Security_Permission_Update(Security_Permission request)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {
                    if(request.Id > 0)
                    {
                        db.Update(request);
                    }
                    else
                    {
                        db.Insert(request);
                    }
                    return true;
                }
            }
            catch(Exception ex)
            {
                _logger.Error("Security_Permission_Update fail: " + ex.Message);
                return false;
            }
        }

        public int Security_Permission_Delete(int id)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {
                    return db.Delete<Security_Permission>(new { Id = id });
                }
            }
            catch(Exception ex)
            {
                _logger.Error("Security_Permission_Update fail: " + ex.Message);
                return 0;
            }
        }

        public string CodeGen(ObjectType objectType, string name = "Z", int number = 6)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {
                    var code = db.SingleById<Temp_Code>(1);
                    var date = DateTime.ParseExact(code.Date, "yyyyMMdd", CultureInfo.InvariantCulture);
                    var currentDate = DateTime.Now;
                    if (date.Date == currentDate)
                    {
                        code.Customer = 1;
                    }
                    var dateTime = DateTime.Now.ToString("yyyyMMdd");
                    int id = 0;
                    var retryCount = 0;
                    do
                    {
                        switch(objectType)
                        {
                            case ObjectType.Customer:
                                id = code.Customer++;
                                name = PrefixType.Customer+ dateTime;
                                break;

//                            default:
//                                id = code.OtherPerson++;
//                                name = PrefixType.OtherPerson;
//                                break;
                        }

                        if(id != 0)
                        {
                            try
                            {
                                number = Constant.LengthCode.LengthCountChar;
                                db.Update(code);
                                return @"" + name + id.ToString("D" + number);
                            }
                            catch(OptimisticConcurrencyException ex)
                            {
                                retryCount++;
                                _logger.Info("Get Code error DbUpdateConcurrencyException: " + ex.Message);
                                code = db.SingleById<Temp_Code>(1);
                            }
                            catch(Exception ex)
                            {
                                retryCount++;
                                _logger.Info("Get Code error DbUpdateConcurrencyException: " + ex.Message);
                                code = db.SingleById<Temp_Code>(1);
                                _logger.Error(ex);
                            }
                        }
                    } while(retryCount < 3 || id == 0);
                }
            }
            catch(Exception ex)
            {
            }

            return "AUTOGEN";
        }

        public async Task<PagingObject<T>> PagingAsync<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {
                    //Get total items
                    var total = (int)db.Count(query);
                    if(pageIndex == 0 || pageIndex < pageSize)
                        pageIndex = 0;
                    else
                        pageIndex = (pageIndex / pageSize);
                    if(pageIndex != 0 && pageSize != 0)
                    {
                        query.Skip(pageIndex * pageSize).Take(pageSize);
                    }
                    var data = await db.SelectAsync<T>(query);
                    //Get items by current page
                    return new PagingObject<T>
                    {
                        DataList = data,
                        Total = total
                    };
                }
            }
            catch(Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return null;
            }
        }

        public PagingObject<T> Paging<T>(SqlExpression<T> query, int? pageIndex = null, int? pageSize = null)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {
                    //Get total items
                    var total = (int)db.Count(query);
                    if(pageIndex == 0 || pageIndex < pageSize)
                        pageIndex = 0;
                    else
                        pageIndex = (pageIndex / pageSize);
                    if(pageIndex != 0 && pageSize != 0)
                    {
                        query.Skip(pageIndex * pageSize).Take(pageSize);
                    }
                    var data = db.Select<T>(query);
                    //Get items by current page
                    return new PagingObject<T>
                    {
                        DataList = data,
                        Total = total
                    };
                }
            }
            catch(Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return null;
            }
        }

        public PagingObject<T> Paging<T>(List<T> list, int? pageIndex = null, int? pageSize = null)
        {
            try
            {
                using(var db = _connectionFactory.Open())
                {
                    //Get total items
                    var total = list.Count;
                    //Get items by current page
                    return new PagingObject<T>
                    {
                        DataList = list.Skip(pageIndex * pageSize ?? 0).Take(pageSize ?? 0).ToList(),
                        Total = total
                    };
                }
            }
            catch(Exception ex)
            {
                _logger.Error("StackTrace " + ex.StackTrace + " message: " + ex.Message);
                return null;
            }
        }

        public List<Medium> GetMedias(Filter filter)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Medium>();
                    //query = query.Where(x => x.Status == 1 && x.MediaType == filter.ExtraInfo && (filter.Lang == "all" || x.Lang == filter.Lang));

                    return db.Select(query);

                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get medias error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public News GetNews(int id, int type)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var news = db.Select<News>(x => x.Id == id && x.Type == type).FirstOrDefault();

                    if(null != news)
                    {
                        //news.Categories = db.Select<NewsCategory>(x => x.Type == news.Type && x.Lang == news.Lang);
                        //var query = db.From<News>()
                        //    .Where(x => x.CategoryId == news.CategoryId && x.Lang == news.Lang)
                        //    .OrderByDescending(x => x.CreatedDate).Take(10);
                        //news.RelateNews = db.Select(query);

                        //var queryTag = db.From<Tag>().Join<ContentTag, Tag>((c, t) => c.TagId == t.Id)
                        //    .Where<ContentTag>(x => x.Id == news.Id);

                        //news.ListTags = db.Select(queryTag);
                    }

                    return news;

                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get medias error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public List<Province> GetProvinces()
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Province>();
                    return db.Select(query);

                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get Province error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public List<District> GetDistricts(string provinceId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<District>();
                    query.Where(x => x.provinceid == provinceId.ToString());
                    return db.Select(query);
                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get Districts error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }

        public List<Ward> GetWards(string districtId)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Ward>();
                    query.Where(x => x.districtid == districtId.ToString());
                    return db.Select(query);

                }
            }
            catch (Exception ex)
            {
                _logger.Info("Get Wards error", ex, ex.Message, ex.StackTrace);

                return null;
            }
        }
    }
}