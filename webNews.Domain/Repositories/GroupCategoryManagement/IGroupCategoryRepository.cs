using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using webNews.Domain.Entities;

namespace webNews.Domain.Repositories.GroupCategoryManagement
{
    public interface IGroupCategoryRepository: IRepository<GroupCategory>
    {
        List<GroupCategory> GetListGroupCategory(int? categoryId = null, int? groupId = null);
        bool CreateGroupCategory(GroupCategory groupCategory);
        bool CreateGroupCategory(List<GroupCategory> lstGroupCategories);

        bool UpdateGroupCategory(GroupCategory groupCategory);
        bool DeleteGroupCategory(int categoryId);
    }
}
