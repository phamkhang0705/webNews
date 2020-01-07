using NLog;
using PagedList;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;
using webNews.Models.NewsManagement;

namespace webNews.Domain.Repositories.NewsManagement
{
    public class NewsManagementRepository : Repository<Vw_News>, INewsManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public NewsManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_News> GetList(SearchContentModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_News>();
                    if (filter.Status != -1)
                    {
                        query.Where(x => x.Status == filter.Status);
                    }
                    if (filter.Type != -1)
                    {
                        query.Where(x => x.CategoryId == filter.Type);
                    }
                    query.OrderByDescending(x => x.Id);
                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_News>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_News>
                {
                    Total = 0,
                    DataList = new List<Vw_News>()
                };
            }
        }

        public bool CreateNews(News content)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var cateId = (int)db.Insert(content, true);
                            trans.Commit();
                            return true;
                        }
                        catch (Exception e)
                        {
                            _logger.Error(e, "DB connection error" + e.Message);
                            trans.Rollback();
                            return false;
                        }
                    }
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public bool UpdateNews(News content)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        var cate = db.Single<News>(x => x.Id == content.Id);

                        cate.Description = content.Description;
                        cate.CategoryId = content.CategoryId;
                        cate.Content = content.Content;
                        cate.Status = content.Status;
                        cate.Title = content.Title;
                        cate.Status = content.Status;
                        cate.Type = content.Type;
                        cate.UpdatedBy = content.UpdatedBy;
                        cate.UpdatedDate = content.UpdatedDate;
                        cate.Image = content.Image;
                        cate.ImageComment = content.ImageComment;
                        cate.Tags = content.Tags;
                        cate.ShortName = (content.Title).ToUrlSegment(250).ToLower();
                        db.Update(cate);
                        return true;
                    }
                    catch (Exception e)
                    {
                        return false;
                    }
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public IEnumerable<Vw_News> GetNews(SearchNewsModelFE filter)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_News>().Where(x => x.Status == 1);
                    if (!string.IsNullOrEmpty(filter.group))
                    {
                        query.Where(x => x.CategoryShortName.ToLower() == filter.group.ToLower());
                    }
                    return db.Select(query).ToPagedList(Convert.ToInt32(filter.Page), Convert.ToInt32(filter.PageSize));
                }
            }
            catch (Exception e)
            {
                return new List<Vw_News>();
            }
        }

        public Vw_News GetNewsDetail(int id)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_News>(_ => _.Id == id);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_News();
            }
        }

        public Vw_News GetNewsDetail(string shortName)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var check = db.Single<Vw_News>(_ => _.ShortName == shortName);
                    return check;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_News();
            }
        }
    }
}