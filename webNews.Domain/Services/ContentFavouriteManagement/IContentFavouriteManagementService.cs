using webNews.Domain.Entities;
using webNews.Models;
using webNews.Models.ContentFavouriteManagement;

namespace webNews.Domain.Services.ContentFavouriteManagement
{
    public interface IContentFavouriteManagementService : IService<ContentFavourite>
    {
        PagingObject<ContentFavourite> GetList(SearchContentFavouriteModel filter, int pageIndex, int pageSize);

        CoreMessageResponse CreateContentFavourite(ContentFavourite content);

        CoreMessageResponse UpdateContentFavourite(ContentFavourite content);
    }
}