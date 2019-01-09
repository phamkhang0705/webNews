using System.Collections.Generic;

namespace webNews.Models.Common
{
    public class BootstrapTableParams
    {
        // ReSharper disable InconsistentNaming
        /// <summary>
        /// Option tìm kiếm
        /// </summary>
        public string search { get; set; }
        /// <summary>
        /// Trường dữ liệu đc chọn sắp xếp
        /// </summary>
        public string sort { get; set; }
        /// <summary>
        /// Kiểu sắp xếp
        /// </summary>
        public string order { get; set; }
        /// <summary>
        /// PageSize - Số bản ghi đc lấy
        /// </summary>
        public int limit { get; set; }
        /// <summary>
        /// Bản ghi bắt đầu đc lấy
        /// </summary>
        public int offset { get; set; }
        // ReSharper restore InconsistentNaming
        public int Page
        {
            get { return offset % limit == 0 ? (offset / limit + 1) : offset / limit; }
        }

        public int ItemPerPage
        {
            get { return limit == 0 ? 15 : limit; }
        }
        public int? Type { get; set; }
    }
    public class DataTableData<T>
    {

        public int total { get; set; }
        public List<T> data = new List<T>();

        public DataTableData(IEnumerable<T> source, int itotal)
        {

            this.total = itotal;
            data.AddRange(source);
        }
    }
}
