using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.SessionState;
using webNews.Domain;
using webNews.Domain.Entities;
using System.Web.Caching;
using static System.String;
using System.Threading;
using System;

namespace webNews.Security
{
    public class Authentication
    {
        public static void ClearAllSession()
        {
        }

        public static bool Authenticate(string username, string password)
        {
            HttpContext.Current.Session.Timeout = 600;
            if (username == null || password == null) return false;

            if (username.Equals("superadmin") && password.Equals("password"))
            {
                HttpContext.Current.Session["username"] = username;
                return true;
            }
            return false;
        }

        public static bool Logout()
        {
            if (GetUserName() == null) return true;
            if (HttpContext.Current == null) return true;
            HttpContext.Current.Session.Abandon();
            HttpContext.Current.Response.Cookies.Add(new HttpCookie("EC_SessionId", ""));
            SessionIDManager manager = new SessionIDManager();
            manager.RemoveSessionID(HttpContext.Current);
            var newId = manager.CreateSessionID(HttpContext.Current);
            bool isRedirected;
            bool isAdded;
            manager.SaveSessionID(HttpContext.Current, newId, out isRedirected, out isAdded);
            return true;
        }

        public static string GetMenu()
        {
            if (HttpContext.Current == null) return string.Empty;
            if (HttpContext.Current.Session["###Menu###"] == null) return string.Empty;
            return HttpContext.Current.Session["###Menu###"].ToString();
        }

        public static string GetMenuUser()
        {
            if (HttpContext.Current == null) return string.Empty;
            if (HttpContext.Current.Session["###MenuUser###"] == null) return string.Empty;
            return HttpContext.Current.Session["###MenuUser###"].ToString();
        }

        public static void MarkLanguage(string language)
        {
            if (HttpContext.Current == null) return;
            HttpContext.Current.Session["languagecode"] = language;
        }

        public static void MarkAuthenticate(System_User user, Vw_UserInfo userInfor)
        {
            HttpContext.Current.Session["username"] = user.UserName;
            HttpContext.Current.Session["userid"] = user.Id;
            //HttpContext.Current.Session["avatar"] = user.Image;
            HttpContext.Current.Session["user"] = user;
            HttpContext.Current.Session["userInfor"] = userInfor;
        }

        public static void MarkPermission(List<Security_VwRoleService> permission)
        {
            if (HttpContext.Current == null) return;
            HttpContext.Current.Session["permission"] = permission;
        }

        public static void MarkRole(List<Security_UserRole> listRole)
        {
            if (HttpContext.Current == null) return;
            HttpContext.Current.Session["roleUser"] = listRole;
        }

        public static void MarkMennu(List<System_Menu> menus)
        {
            var menu = menus.Where(p => (p.ParentId ?? 0) == 0).OrderBy(p => p.MenuOrder).ToList().Aggregate("", (current, item) => current + BuildMenu(item, menus));
            HttpContext.Current.Session["###Menu###"] = menu;
        }

        public static void MarkMenuUser(List<System_Menu> menus)
        {
            var menu = menus.Where(p => (p.ParentId ?? 0) == 0).OrderBy(p => p.MenuOrder).ToList().Aggregate("", (current, item) => current + BuildMenu(item, menus));
            HttpContext.Current.Session["###MenuUser###"] = menu;
        }

        public static List<Security_VwRoleService> GetPermission()
        {
            if (HttpContext.Current == null) return new List<Security_VwRoleService>();
            if (HttpContext.Current.Session["permission"] == null) return new List<Security_VwRoleService>();
            return (List<Security_VwRoleService>)HttpContext.Current.Session["permission"];
        }

        public static void MarkCaptchar(string captchar)
        {
            if (HttpContext.Current == null) return;
            HttpContext.Current.Session["Captcha"] = captchar;
        }

        public static int GetUserId()
        {
            if (HttpContext.Current == null) return -1;
            if (HttpContext.Current.Session["userid"] == null) return -1;
            return Convert.ToInt32(HttpContext.Current.Session["userid"]);
        }

        private static bool CheckPermissionMenu(System_Menu item, List<System_Menu> listMenus)
        {
            var check = CheckAuthorizer.Authorize(Permission.VIEW, item.Controller ?? "");
            if (check)
                return true;
            var listchild = listMenus.Where(p => p.ParentId == item.Id);

            var systemMenus = listchild as System_Menu[] ?? listchild.ToArray();
            if (systemMenus.Any())
            {
                foreach (var subMenu in systemMenus)
                {
                    check = CheckPermissionMenu(subMenu, listMenus);
                    if (check)
                        return true;
                }
            }
            return false;
        }

        private static string BuildMenu(System_Menu item, List<System_Menu> listMenus)
        {
            var menu = "";
            if (CheckPermissionMenu(item, listMenus))
            {
                var listChild = listMenus.Where(p => p.ParentId == item.Id).OrderBy(p => p.MenuOrder);

                if (listChild.Any())
                {
                    if (item.MenuLevel == 1)
                        menu += "<li><a><i class='fa fa-" + item.AliasUrl + "'></i> " + item.Text.ToUpper() + "<span class='fa fa-chevron-down'></span></a>";
                    else
                    {
                        menu += "<li><a>" + item.Text.ToUpper() + "<span class='fa fa-chevron-down'></span></a>";
                    }

                    if (item.MenuLevel != null)
                        menu += "<ul class='nav child_menu'>";
                    menu = listChild.Aggregate(menu, (current, submenu) => current + BuildMenu(submenu, listMenus));
                    menu += "</ul></li>";
                }
                else
                {
                    if (item.Area == "")
                    {
                        menu += Format("<li><a href='/" + item.Controller + "'>" + "&nbsp;&nbsp;" + item.Text + "</a></li>");
                    }
                    else
                    {
                        menu += Format("<li><a href='/" + item.Area + "/" + item.Controller + "'>" + "&nbsp;&nbsp;" + item.Text + "</a></li>");
                    }
                }
            }
            return menu;
        }

        public static string GetLanguageCode()
        {
            if (HttpContext.Current == null) return "vi";
            if (HttpContext.Current.Session["languagecode"] == null) return "vi";
            return (string)HttpContext.Current.Session["languagecode"];
        }

        public static string GetUserName()
        {
            if (HttpContext.Current == null) return null;
            if (HttpContext.Current.Session["username"] == null) return null;
            return HttpContext.Current.Session["username"].ToString();
        }

        public static string GetUserAvatar()
        {
            if (HttpContext.Current == null) return null;
            if (HttpContext.Current.Session["avatar"] == null) return null;
            return HttpContext.Current.Session["avatar"].ToString();
        }

        public static System_User GetCurrentUser()
        {
            if (HttpContext.Current == null) return null;
            if (HttpContext.Current.Session["user"] == null) return null;
            return (System_User)HttpContext.Current.Session["user"];
        }

        public static Vw_UserInfo GetUserInfor()
        {
            if (HttpContext.Current == null) return null;
            if (HttpContext.Current.Session["userInfor"] == null) return null;
            return (Vw_UserInfo)HttpContext.Current.Session["userInfor"];
        }

        public static int? GetUserRole()
        {
            if (HttpContext.Current == null) return null;
            if (HttpContext.Current.Session["userInfor"] == null) return null;
            var infor = (Vw_UserInfo)HttpContext.Current.Session["userInfor"];
            //return infor.RoleId;
            return 1;
        }
    }
    public enum MenuLevel
    {
        Second = 1,
        Third = 2,
    }
}
