﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace webNews.Models.OrderTypeManagement
{
    public class SearchOrderTypeModel
    {
        public int Id { get; set; }
        public string  Code { get; set; }
        public string Name { get; set; }
        public int Status { get; set; }
    }

    public class OrderTypeModel
    {
        public int Id { get; set; }
        public string Code { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public int? Status { get; set; }
    }
}
