using System.Web.Mvc;
using System.Web.Routing;

namespace webNews
{
    public class RouteConfig
    {
        // public static IWebNewsDbConnectionFactory _connectionFactory;
        //        public RouteConfig(IWebNewsDbConnectionFactory connectionFactory)
        //        {
        //            _connectionFactory = connectionFactory;
        //        }

        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");

            routes.MapRoute(
              name: "CategoryRental",
              url: "san-pham-thue",
              defaults: new { controller = "Category", action = "Index", id = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
              name: "CategorySearch",
              url: "san-pham",
              defaults: new { controller = "Category", action = "Search", type = UrlParameter.Optional, agetype = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
              name: "CategoryRentalSearch",
              url: "san-pham",
              defaults: new
              {
                  controller = "Category",
                  action = "Search",
                  group = UrlParameter.Optional,
                  categorytype = UrlParameter.Optional,
                  name = UrlParameter.Optional,
                  page = UrlParameter.Optional
              },
              namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
              name: "CategorySale",
              url: "san-pham-ban",
              defaults: new { controller = "Category", action = "Sale", id = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
              name: "About",
              url: "gioi-thieu",
              defaults: new { controller = "Home", action = "About", id = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );
            routes.MapRoute(
              name: "ForCustomer",
              url: "danh-cho-khach-hang",
              defaults: new { controller = "Home", action = "ForCustomer", id = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
              name: "CategoryRentalDetail",
              url: "san-pham-thue/{rental_short_name}",
              defaults: new { controller = "Category", action = "Detail", rental_short_name = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
             name: "Event",
             url: "goi-su-kien",
             defaults: new { controller = "News", action = "Index", id = UrlParameter.Optional },
             namespaces: new[] { "webNews.Controllers" }
           );

            routes.MapRoute(
             name: "News",
             url: "tin-tuc",
             defaults: new { controller = "News", action = "News", id = UrlParameter.Optional },
             namespaces: new[] { "webNews.Controllers" }
           );

            routes.MapRoute(
              name: "EventDetail",
              url: "goi-su-kien/{event_short_name}",
              defaults: new { controller = "News", action = "Detail", event_short_name = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
              name: "NewsDetail",
              url: "tin-tuc/{news_short_name}",
              defaults: new { controller = "News", action = "NewsDetail", news_short_name = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );
            routes.MapRoute(
                name: "Login",
                url: "dang-nhap",
                defaults: new { controller = "User", action = "Login", id = UrlParameter.Optional },
                namespaces: new[] { "webNews.Controllers" }
            );

            routes.MapRoute(
                name: "Home",
                url: "trang-chu",
                defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
                namespaces: new[] { "webNews.Controllers" }
            );
            routes.MapRoute(
                 name: "Cart",
                 url: "gio-hang",
                 defaults: new { controller = "Cart", action = "Index", id = UrlParameter.Optional },
                 namespaces: new[] { "webNews.Controllers" }
             ); routes.MapRoute(
                  name: "Order",
                  url: "dat-hang",
                  defaults: new { controller = "Cart", action = "CheckOut", id = UrlParameter.Optional },
                  namespaces: new[] { "webNews.Controllers" }
              );
            routes.MapRoute(
              name: "Default",
              url: "{controller}/{action}/{id}",
              defaults: new { controller = "Home", action = "Index", id = UrlParameter.Optional },
              namespaces: new[] { "webNews.Controllers" }
            );
            routes.MapRoute(
                "Default_Area",
                "{controller}/{action}/{id}",
                new { controller = "Home", action = "Index", id = UrlParameter.Optional }
            ).DataTokens.Add("area", "Admin");
        }

        //        public static void RewirteUrl(RouteCollection routes)
        //        {
        //            _connectionFactory = new WebNewsDbConnectionFactory(ConfigurationManager.ConnectionStrings["WebNews"].ConnectionString, SqlServer2014OrmLiteDialectProvider.Instance);
        //
        //            using (var db = _connectionFactory.OpenDbConnection())
        //            {
        //                var menus = db.Select<System_Menu>();
        //                foreach (var menu in menus)
        //                {
        //                    if (!string.IsNullOrEmpty(menu.AliasUrl))
        //                    {
        //                        routes.MapRoute(
        //                          name: menu.Controller,
        //                          url: (string.IsNullOrEmpty(menu.Area) ? "" : menu.Area + "/") + menu.AliasUrl,
        //                          defaults: new { controller = menu.Controller, action = "Index", id = UrlParameter.Optional }
        //                      ).DataTokens = new RouteValueDictionary(new { area = menu.Area });
        //                    }
        //                }
        //            }
        //        }
    }
}