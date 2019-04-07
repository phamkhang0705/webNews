using System.Collections.Generic;
using webNews.Domain.Entities;

namespace webNews.Domain.Services.FileAttachManagement
{
    public interface IFileAttachManagementService : IService<FileAttach>
    {
        List<FileAttach> GetFileAttach(int? cateId = null, int? productId = null, int? groupId = null);
    }
}