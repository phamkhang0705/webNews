using System.Collections.Generic;
using System.Web.Mvc;

namespace webNews.Services.Common
{
    public class ConstantService : IConstantService
    {
        public List<SelectListItem> ListActive(bool showTitle = true)
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
        public List<SelectListItem> ListSubjectActive(bool showTitle = true)
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
                        Text = "Đang giảng dạy"
                    },
                    new SelectListItem()
                    {
                        Value = "0",
                        Text = "Ngừng giảng dạy"
                    }
                };
            }
            return new List<SelectListItem>
            {
                new SelectListItem()
                    {
                        Value = "1",
                        Text = "Đang giảng dạy"
                    },
                    new SelectListItem()
                    {
                        Value = "0",
                        Text = "Ngừng giảng dạy"
                    },
            };
        }

        public List<SelectListItem> ListCategoryType(bool showTitle = true)
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
                        Text = "Thực phẩm"
                    },
                    new SelectListItem()
                    {
                        Value = "2",
                        Text = "Vật tư"
                    },
                    new SelectListItem()
                    {
                        Value = "3",
                        Text = "Văn phòng phẩm"
                    },
                    new SelectListItem()
                    {
                        Value = "4",
                        Text = "Dịch vụ"
                    }
                };
            }
            return new List<SelectListItem>
            {
                new SelectListItem()
                {
                    Value = "1",
                    Text = "Thực phẩm"
                },
                new SelectListItem()
                {
                    Value = "2",
                    Text = "Vật tư"
                },
                    new SelectListItem()
                    {
                        Value = "3",
                        Text = "Văn phòng phẩm"
                    },
                    new SelectListItem()
                    {
                        Value = "4",
                        Text = "Dịch vụ"
                    }
            };
        }

        public List<SelectListItem> ListBranchType(bool showTitle = true)
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
                        Value = "0",
                        Text = "Trường học"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Chi nhánh"
                    },new SelectListItem()
                    {
                        Value = "2",
                        Text = "Phòng ban"
                    }
                };
            }
            return new List<SelectListItem>
            {
                new SelectListItem()
                {
                    Value = "0",
                    Text = "Trường học"
                },
                new SelectListItem()
                {
                    Value = "1",
                    Text = "Chi nhánh"
                },new SelectListItem()
                {
                    Value = "2",
                    Text = "Phòng ban"
                }
            };
        }

        public List<SelectListItem> ListGiftType(bool showTitle = true)
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
                        Value = "0",
                        Text = "Khóa học"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Mua hàng"
                    }
                };
            }
            return new List<SelectListItem>
            {
                new SelectListItem()
                {
                    Value = "0",
                    Text = "Khóa học"
                },
                new SelectListItem()
                {
                    Value = "1",
                    Text = "Mua hàng"
                }
            };
        }

        public List<SelectListItem> ListInvoiceOutportActive(bool showTitle = true)
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
                        Value = "0",
                        Text = "Phiếu tạm"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Phiếu đang hoạt động"
                    },new SelectListItem()
                    {
                        Value = "2",
                        Text = "Hủy hóa đơn"
                    }
                };
            }
            else
            {
                return new List<SelectListItem>
                {
                    new SelectListItem()
                    {
                        Value = "0",
                        Text = "Phiếu tạm"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Phiếu đang hoạt động"
                    },new SelectListItem()
                    {
                        Value = "2",
                        Text = "Hủy hóa đơn"
                    }
                };
            }
        }

        public List<SelectListItem> ListRemoveProductActive(bool showTitle = true)
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
                        Value = "2",
                        Text = "Phiếu tạm"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Hoàn thành"
                    },new SelectListItem()
                    {
                        Value = "3",
                        Text = "Đã hủy"
                    }
                };
            }
            else
            {
                return new List<SelectListItem>
                {
                    new SelectListItem()
                    {
                        Value = "2",
                        Text = "Phiếu tạm"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Hoàn thành"
                    },new SelectListItem()
                    {
                        Value = "3",
                        Text = "Đã hủy"
                    }
                };
            }
        }

        public List<SelectListItem> ListStudentType(bool showTitle = true)
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
                        Value = "0",
                        Text = "Học viên tiềm năng"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Học viên đang học"
                    },new SelectListItem()
                    {
                        Value = "2",
                        Text = "Học viên kết thúc"
                    },new SelectListItem()
                    {
                        Value = "3",
                        Text = "Học viên đang chờ mở lớp"
                    }
                };
            }
            else
            {
                return new List<SelectListItem>
                {
                    new SelectListItem()
                    {
                        Value = "0",
                        Text = "Học viên tiềm năng"
                    },
                    new SelectListItem()
                    {
                        Value = "1",
                        Text = "Học viên đang học"
                    },new SelectListItem()
                    {
                        Value = "2",
                        Text = "Học viên kết thúc"
                    },new SelectListItem()
                    {
                        Value = "3",
                        Text = "Học viên đang chờ mở lớp"
                    }
                };
            }
        }
        public List<SelectListItem> ListCourseType(bool showTitle = true)
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
                        Text = "khóa học ghép"
                    },
                    new SelectListItem()
                    {
                        Value = "2",
                        Text = "Khóa học riêng"
                    }
                };
            }
            return new List<SelectListItem>
            {
                 new SelectListItem()
                    {
                        Value = "1",
                        Text = "khóa học ghép"
                    },
                    new SelectListItem()
                    {
                        Value = "2",
                        Text = "Khóa học riêng"
                    }
            };
        }
    }
}