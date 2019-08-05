using System.Collections.Generic;
using System.Linq;
using System.Web;
using webNews.Domain.Entities;

namespace webNews.Security
{
    public class CheckAuthorizer
    {
        public static bool Authorize(Permission permission)
        {
            //need to test for implement
            //if (Authentication.GetUserName().ToLower() == "administrator" || Authentication.GetUserName().ToLower() == "admin")
            //        return true;
            //var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;
            //if (routeValues != null)
            //{
            //    var controllerName = "";
            //    if (routeValues.ContainsKey("controller"))
            //    {
            //        controllerName = routeValues["controller"].ToString();
            //    }
            //    controllerName = controllerName.ToLower();

            //    //return true;
            //    List<Security_VwRoleService> lstPermision = Authentication.GetPermission().Where(p => (p.IDInSystem ?? "").ToLower() == (controllerName)).ToList();
            //    if (lstPermision.Count == 0) return false;
            //    return lstPermision.Any(e => e.PermissionID == permission.GetHashCode());

            //}
            return true;
        }
        public static bool Authorize(Permission permission, string controllerName)
        {
            //nhannv fix Admin full quyền
            //if (HttpContext.Current != null && HttpContext.Current.Session["username"] != null &&
            //    HttpContext.Current.Session["username"].ToString().ToLower() == "admin")
            //{
            //    return true;
            //}

            if (Authentication.GetUserName().ToLower() == "administrator")
                return true;
            var routeValues = HttpContext.Current.Request.RequestContext.RouteData.Values;
            if (routeValues != null)
            {
                controllerName = controllerName.ToLower();
                List<Security_VwRoleService> lstPermision = Authentication.GetPermission().Where(p => (p.IDInSystem ?? "").ToLower() == (controllerName)).ToList();

                if (lstPermision.Count == 0) return false;
                return lstPermision.Any(e => e.PermissionID == permission.GetHashCode());

            }
            return true;
        }

        public static bool IsAuthenticated()
        {
            //            return true;
            return Authentication.GetUserId() != -1;
        }
    }
}
