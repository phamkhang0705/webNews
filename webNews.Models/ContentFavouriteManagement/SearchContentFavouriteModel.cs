using System;
using System.Collections.Generic;

namespace webNews.Models.ContentFavouriteManagement
{
    public class SearchContentFavouriteModel
    {
        public int Status { get; set; }
        public int UserId { get; set; }
        public DateTime FromTime { get; set; }
        public DateTime ToTime { get; set; }
    }
}