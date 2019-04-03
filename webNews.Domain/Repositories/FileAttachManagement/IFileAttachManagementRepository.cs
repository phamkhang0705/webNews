using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.FileAttachManagement
{
    public interface IFileAttachManagementRepository : IRepository<FileAttach>
    {
        bool CreateFile(List<FileAttach> files);

        bool UpdateFile(List<FileAttach> files);

        bool Delete(int? cateId = null, int? productId = null, int? groupId = null);

        List<FileAttach> GetFileAttaches(int? cateId = null, int? productId = null, int? groupId = null);
    }
}