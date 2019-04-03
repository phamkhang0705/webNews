using NLog;
using ServiceStack.OrmLite;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.FileAttachManagement
{
    public class FileAttachManagementRepository : Repository<FileAttach>, IFileAttachManagementRepository
    {
        private readonly IWebNewsDbConnectionFactory _connectionFactory;
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();

        public FileAttachManagementRepository(IWebNewsDbConnectionFactory connectionFactory)
            : base(connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public bool CreateFile(List<FileAttach> files)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Insert(files, true);
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

        public bool UpdateFile(List<FileAttach> files)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    try
                    {
                        db.Update(files);
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

        public bool Delete(int? cateId = null, int? productId = null, int? groupId = null)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    if (cateId != null)
                    {
                        var check = db.Delete<FileAttach>(_ => _.CategoryId == cateId);
                        if (check > 0) return true;
                    }
                    if (productId != null)
                    {
                        var check = db.Delete<FileAttach>(_ => _.ProductId == productId);
                        if (check > 0) return true;
                    }
                    if (groupId != null)
                    {
                        var check = db.Delete<FileAttach>(_ => _.GroupId == groupId);
                        if (check > 0) return true;
                    }
                    return false;
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return false;
            }
        }

        public List<FileAttach> GetFileAttaches(int? cateId = null, int? productId = null, int? groupId = null)
        {
            try
            {
                using (var db = _connectionFactory.Open())
                {
                    if (cateId != null)
                    {
                        return db.Select<FileAttach>(_ => _.CategoryId == cateId);
                        
                    }
                    if (productId != null)
                    {
                        return db.Select<FileAttach>(_ => _.ProductId == productId);
                    }
                    if (groupId != null)
                    {
                        return db.Select<FileAttach>(_ => _.GroupId == groupId);
                    }
                    return db.Select<FileAttach>();
                }
            }
            catch (Exception e)
            {
                _logger.Error(e, "DB connection error");
                return new List<FileAttach>();
            }
        }
    }
}