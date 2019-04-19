using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.PromotionManagement;

namespace webNews.Domain.Repositories.PromotionManagement
{
    public interface IPromotionManagementRepository : IRepository<Promotion>
    {
        PagingObject<Promotion> GetList(SearchPromotionModel filter, int pageIndex, int pageSize);

        bool CheckExist(string code);

        bool CreatePromotion(Promotion promotion);

        bool UpdatePromotion(Promotion promotion);

        bool Delete(int id);

        Promotion GetPromotionById(int id);

        Promotion GetByCode(string code);
    }
}