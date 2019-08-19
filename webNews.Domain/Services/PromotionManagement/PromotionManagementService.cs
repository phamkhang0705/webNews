using NLog;
using System;
using System.Collections.Generic;
using webNews.Domain.Entities;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.PromotionManagement;
using webNews.Models;
using webNews.Models.Common;
using webNews.Models.PromotionManagement;


namespace webNews.Domain.Services.PromotionManagement
{
    public class PromotionManagementService : Service<Promotion>, IPromotionManagementService
    {
        private readonly Logger _logger = LogManager.GetCurrentClassLogger();
        private readonly IPromotionManagementRepository _promotionRepository;
        private readonly ISystemRepository _systemRepository;

        public PromotionManagementService(IPromotionManagementRepository promotionRepository,ISystemRepository systemRepository, IRepository<Promotion> repository) : base(repository)
        {
            _promotionRepository = promotionRepository;
            _systemRepository = systemRepository;
        }

        public PagingObject<Promotion> GetList(SearchPromotionModel filter, int pageIndex, int pageSize)
        {
            var offset = 0;
            if (pageIndex >= pageSize)
            {
                offset = (pageIndex / pageSize);
            }
            return _promotionRepository.GetList(filter, offset, pageSize);
        }

        public bool CheckExist(string userName)
        {
            return _promotionRepository.CheckExist(userName);
        }

        public CoreMessageResponse CreatePromotion(Promotion promotion)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var check = _promotionRepository.GetByCode(promotion.PromotionCode);

            if (check != null)
            {
                response.ResponseMessage = "Mã khuyến mại đã tồn tại!";
                return response;
            }
            var isInsert = _promotionRepository.CreatePromotion(promotion);

            if (isInsert)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Thêm khuyến mại thành công";
            }
            else
            {
                response.ResponseMessage = "Thêm khuyến mại thất bại";
            }

            return response;
        }

        public CoreMessageResponse UpdatePromotion(Promotion promotion)
        {
            var response = new CoreMessageResponse
            {
                ResponseCode = "00"
            };
            var pro = _promotionRepository.GetById(promotion.Id);

            if (pro == null)
            {
                response.ResponseMessage = "khuyến mại không tồn tại!";
                return response;
            }
            var update = _promotionRepository.UpdatePromotion(promotion);

            if (update)
            {
                response.ResponseCode = "01";
                response.ResponseMessage = "Cập nhật khuyến mại thành công";
            }
            return response;
        }

        public bool Delete(int id)
        {
            return _promotionRepository.Delete(id);
        }

        public Promotion GetPromotionById(int id)
        {
            return _promotionRepository.GetPromotionById(id);
        }

        public Promotion GetByCode(string code)
        {
            return _promotionRepository.GetByCode(code);
        }
    }
}