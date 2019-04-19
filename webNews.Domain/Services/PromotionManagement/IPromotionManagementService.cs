using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.PromotionManagement;

namespace webNews.Domain.Services.PromotionManagement
{
    public interface IPromotionManagementService : IService<Promotion>
    {
        PagingObject<Promotion> GetList(SearchPromotionModel filter, int pageIndex, int pageSize);

        bool CheckExist(string userName);

        CoreMessageResponse CreatePromotion(Promotion promotion);

        CoreMessageResponse UpdatePromotion(Promotion promotion);

        bool Delete(int id);

        Promotion GetPromotionById(int id);

        Promotion GetByCode(string code);
    }
}