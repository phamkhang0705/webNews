using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using webNews.Domain.Entities;

namespace webNews.Domain
{
    public class HomePageInfo
    {

        public const string LOGO_DEFAULT = "";

        public HomePageInfo()
        {
            this.Branches = new List<BasicInfo>();
            this.Banners = new List<BasicInfo>();
            this.Parters = new List<BasicInfo>();
            this.Menus = new List<System_Menu>();
            //this.Options = new System_Option();
        }

        public string Logo { get; set; }

        public List<BasicInfo> Branches { get; set; }
        public List<BasicInfo> Banners { get; set; }
        public List<BasicInfo> Parters { get; set; }
        public List<System_Menu> Menus { get; set; }

        //public System_Option Options { get; set; }
    }

    public class BasicInfo
    {
        public string Href { get; set; }
        public string ImageUrl { get; set; }
        public string TargetUrl { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
    }
}