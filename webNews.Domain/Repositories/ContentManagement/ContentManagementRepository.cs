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
                    try
                    {
                        var type = db.Single<ContentType>(x => x.Id == content.Type);
                        content.ContentType = type.ContentCode;
                        var cateId = (int)db.Insert(content, true);
                        return true;
                    }
                    catch (Exception e)
                    {
                        _logger.Error(e, "DB connection error" + e.Message);
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

        public bool UpdateContent(Content content)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        var obj = db.Single<Content>(x => x.Id == content.Id);
                        var type = db.Single<ContentType>(x => x.Id == content.Type);
                        obj.Description = content.Description;
                        obj.Status = content.Status;
                        obj.Url = content.Url;
                        obj.ContentType = type.ContentCode;
                        obj.ContentText = content.ContentText;
                        obj.ContentUrl = content.ContentUrl;
                        obj.Link = content.Link;
                        obj.Link = content.Link;
                        obj.Title = content.Title;
                        obj.Status = content.Status;
                        obj.Type = content.Type;
                        obj.UpdatedBy = content.UpdatedBy;
                        obj.UpdatedDate = content.UpdatedDate;
                        db.Update(obj);
                        return true;
                    }
                    catch (Exception e)
                    {
                        _logger.Error(e, "Update content error");
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

        public Vw_Content GetByCode(string code)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    return db.Single<Vw_Content>(x => x.ContentType == code);
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new Vw_Content();
            }
        }
    }
}