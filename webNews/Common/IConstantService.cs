using System.Collections.Generic;
using System.Web.Mvc;

namespace webNews.Common
{
    public interface IConstantService
    {
        List<SelectListItem> ListStatus(bool showTitle = true);
        List<SelectListItem> ListAgeType(bool showTitle = true);
    }
}