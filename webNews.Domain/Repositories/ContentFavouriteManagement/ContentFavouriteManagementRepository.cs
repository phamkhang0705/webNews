using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using System.Linq;
using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentFavouriteManagement;

namespace webNews.Domain.Repositories.ContentFavouriteManagement
{
    public class ContentFavouriteManagementRepository : Repository<ContentFavourite>, IContentFavouriteManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public ContentFavouriteManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public PagingObject<ContentFavourite> GetList(SearchContentFavouriteModel filter, int pageIndex, int pageSize)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    var query = db.From<ContentFavourite>();
                    var total = (int)db.Count(query);
                    query.Skip(pageIndex * pageSize).Take(pageSize);
                    return new PagingObject<ContentFavourite>
                    {
                        Total = (int)total,
                        DataList = db.Select(query)
                    };
                }
            }
            catch (Exception e)
            {
                return new PagingObject<ContentFavourite>
                {
                    Total = 0,
                    DataList = new List<ContentFavourite>()
                };
            }
        }

        public bool CreateContentFavourite(ContentFavourite content)
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

        public bool UpdateContentFavourite(ContentFavourite content)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        var cate = db.Single<ContentFavourite>(x => x.Id == content.Id);
                        cate.Status = content.Status;
                        cate.UpdatedTime = DateTime.Now;
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
    }
}