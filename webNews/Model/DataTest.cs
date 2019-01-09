using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace webNews.Models
{
    public class DataTest<T>
    {
        public List<T> data { get; set; }
        public int recordsFiltered { get; set; }
        public int recordsTotal { get; set; }
    }

    public class Data
    {
        public int ID { get; set; }
        public string Name { get; set; }
    }
}