using System.Collections.Generic;
using System.Web.Mvc;

namespace webNews.Services.Common
{
    public interface IConstantService
    {
        List<SelectListItem> ListActive(bool showTitle = true);
        List<SelectListItem> ListSubjectActive(bool showTitle = true);

        List<SelectListItem> ListCategoryType(bool showTitle = true);

        List<SelectListItem> ListBranchType(bool showTitle = true);

        List<SelectListItem> ListGiftType(bool showTitle = true);

        List<SelectListItem> ListInvoiceOutportActive(bool showTitle = true);

        List<SelectListItem> ListRemoveProductActive(bool showTitle = true);

        List<SelectListItem> ListStudentType(bool showTitle = true);
        List<SelectListItem> ListCourseType(bool showTitle = true);
    }
}