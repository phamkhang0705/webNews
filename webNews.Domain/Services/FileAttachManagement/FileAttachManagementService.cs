using System.Collections.Generic;
using NLog;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.FileAttachManagement;
using webNews.Domain.Repositories.ProductPriceManagement;
using webNews.Models;

namespace webNews.Domain.Services.FileAttachManagement
{
    public class FileAttachManagementService : Service<FileAttach>, IFileAttachManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IFileAttachManagementRepository _fileAttachManagementRepository;

        public FileAttachManagementService(IFileAttachManagementRepository fileAttachManagementRepository, IRepository<FileAttach> repository) : base(repository)
        {
            _fileAttachManagementRepository = fileAttachManagementRepository;
        }

        public List<FileAttach> GetFileAttach(int cateId)
        {
            return _fileAttachManagementRepository.GetFileAttaches(cateId);
        }
    }
}