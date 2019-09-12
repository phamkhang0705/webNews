using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentTypeManagement;

namespace webNews.Domain.Repositories.ContentManagement
{
    public class ContentManagementRepository : Repository<Vw_Content>, IContentManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public ContentManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<Vw_Content> GetList(SearchContentModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<Vw_Content>();
                    if (filter.Status != -1)
                    {
                        query.Where(x => x.Status == filter.Status);
                    }
                    if (filter.Type != -1)
                    {
                        query.Where(x => x.Type == filter.Type);
                    }
                    //More filter
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<Vw_Content>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<Vw_Content>
                {
                    Total = 0,
                    DataList = new List<Vw_Content>()
                };
            }
        }

        public bool CreateContent(Content content)
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

        public bool UpdateContent(Content content)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    using (var trans = db.OpenTransaction())
                    {
                        try
                        {
                            var cate = db.Single<Content>(x => x.Id == content.Id);

                            cate.Description = content.Description;
                            cate.Status = content.Status;
                            cate.Url = content.Url;
                            cate.ContentType = content.ContentType;
                            cate.ContentUrl = content.ContentUrl;
                            cate.Link = content.Link;
                            cate.Link = content.Link;
                            cate.Title = content.Title;
                            cate.Status = content.Status;
                            cate.Type = content.Type;
                            cate.UpdatedBy = content.UpdatedBy;
                            cate.UpdatedDate = content.UpdatedDate;
                            db.Update(cate);
                            trans.Commit();
                            return true;
                        }
                        catch (Exception e)
                        {
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
    }
}