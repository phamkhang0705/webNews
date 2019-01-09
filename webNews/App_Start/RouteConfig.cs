using System.Web.Mvc;
using System.Web.Routing;
using webNews.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Configuration;
using ServiceStack.OrmLite.SqlServer;
using ServiceStack.OrmLite;
using webNews.Domain.Entities;
using webNews.Shared;

namespace webNews
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
            routes.MapRoute(
              name: "Default",
              url: "{controller}/{action}/{id}",
              defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            );

        }
    }
}
