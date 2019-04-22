using System.Collections.Generic;
using System.Web.Mvc;

namespace webNews.Common
{
    public class ConstantService : IConstantService
    {
        public List<SelectListItem> ListStatus(bool showTitle = true)
        {
            if(showTitle)
            {
                return new List<SelectListItem>
                {
                    new SelectListItem()
                    {
                        Value = "-1",
                        Text = "Tất cả",
                        Selected = true
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Hoạt động"
                    },
                    new SelectListItem()
                    {
                        Value = "0",
                        Text = "Ngừng hoạt động"
                    },
                };
            }
            return new List<SelectListItem>
            {
                new SelectListItem()
                {
                    Value = "1",
                    Text = "Hoạt động"
                },
                new SelectListItem()
                {
                    Value = "0",
                    Text = "Ngừng hoạt động"
                },
            };
        }

        public List<SelectListItem> ListAgeType(bool showTitle = true)
        {
            if (showTitle)
            {
                return new List<SelectListItem>
                {
                    new SelectListItem()
                    {
                        Value = "-1",
                        Text = "Tất cả",
                        Selected = true
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Tháng"
                    },
                    new SelectListItem()
                    {
                        Value = "2",
                        Text = "Tuổi"
                    },
                };
            }
            return new List<SelectListItem>
            {
                new SelectListItem()
                {
                    Value = "1",
                    Text = "Tháng"
                },
                new SelectListItem()
                {
                    Value = "2",
                    Text = "Tuổi"
                },
            };
        }
    }
}