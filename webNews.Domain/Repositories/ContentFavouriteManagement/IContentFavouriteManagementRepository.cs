using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentFavouriteManagement;

namespace webNews.Domain.Repositories.ContentFavouriteManagement
{
    public interface IContentFavouriteManagementRepository : IRepository<ContentFavourite>
    {
        PagingObject<ContentFavourite> GetList(SearchContentFavouriteModel filter, int pageIndex, int pageSize);

        bool CreateContentFavourite(ContentFavourite content);

        bool UpdateContentFavourite(ContentFavourite content);
    }
}