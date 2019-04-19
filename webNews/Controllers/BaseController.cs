using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using webNews.Language.Language;
using webNews.Models.Common;
using webNews.Security;
using NLog;

namespace webNews.Controllers
{
    public class BaseController : Controller
    {
        private static readonly Logger Log = LogManager.GetLogger("BaseController");

        #region Cons
        public static string DateFormat = "dd/MM/yyyy";
        public static string DateTimeFormat = "dd/MM/yyyy HH:mm:ss";
        #endregion

        

        public string UserName
        {
            get { return (string)Session[Constant.SessionKey.UserName]; }
        }

        public static int TimeOut
        {
            get { return int.Parse(System.Configuration.ConfigurationManager.AppSettings["JsonServiceClientTimeOut"]); }
        }

        public static string UrlUpload
        {
            get { return System.Configuration.ConfigurationManager.AppSettings["dirUpload"]; }
        }
        public static string UrlViewFileUpload
        {
            get { return ConfigurationManager.AppSettings["DirViewFile"]; }
        }
        public static string UrlDefault
        {
            get { return "/Content/Uploads/TransFile"; }
        }
        public string ControlerName
        {
            get
            {
                string controllerName = this.ControllerContext.RouteData.Values["controller"].ToString();
                return controllerName;
            }
        }

        public BaseController()
        {

        }
        public static string ControllerName
        {
            get
            {
                var routeValues = System.Web.HttpContext.Current.Request.RequestContext.RouteData.Values;
                if (routeValues.ContainsKey("controller"))
                {
                    return routeValues["controller"].ToString();
                }
                return "";
            }
        }

        public static bool ValidateFile(HttpPostedFileBase file, ref string outErr)
        {
            try
            {
                var extensionTypes = ConfigurationManager.AppSettings["ExtensionFileTye"].ToLower().Split(',', ';', '|').ToList();
                var s = Path.GetExtension(file.FileName);
                if (s != null)
                {
                    var extension = s.ToLower();

                    if (!extensionTypes.Contains(extension))
                    {
                        outErr = Resource.Wrong_file_format_Lang;
                        Log.Info("Validate file invalid extension");
                        return false;
                    }
                }

                var knownTypes = ConfigurationManager.AppSettings["AcceptedFileTye"].ToLower().Split(',', ';', '|').ToList();
                if (file.ContentLength > 0)
                {
                    if (!knownTypes.Contains(file.ContentType.ToLower()))
                    {
                        outErr = Resource.Wrong_file_format_Lang;
                        Log.Info("Validate file invalid");
                        return false;
                    }
                    if (file.ContentLength >= int.Parse(ConfigurationManager.AppSettings["MaxFileSize"]))
                    {
                        outErr = Resource.File_exceeded_upload_capacity_Lang;
                        Log.Info("Validate file invalid  MaxFileSize");
                        return false;
                    }
                    return true;
                }
                outErr = Resource.Wrong_file_format_Lang;
                Log.Info("Validate file invalid knownTypes");
                return false;
            }
            catch (Exception ex)
            {
                Log.Error("Validate file Erro " + ex);
                return false;
            }

        }
        public static string GetViewFileUrl()
        {
            return ConfigurationManager.AppSettings["UrlViewFile"];
        }
        public void UploadFile(HttpPostedFileBase file, string path, string fileName)
        {
            try
            {
                var stream = file.InputStream;
                path = Path.Combine(ConfigurationManager.AppSettings["dirUpload"], path);
                if (!Directory.Exists(path))
                    Directory.CreateDirectory(path);
                path = Path.Combine(path, fileName);
                Log.Info("Get Path UploadFile: {0} - FileName: {1}", path, fileName);
                using (var fileStream = System.IO.File.Create(path))
                {
                    stream.CopyTo(fileStream);
                    Log.Info("Copy file oke: Path: {0} - FileName: {1}", path, fileName);
                }
            }
            catch (Exception ex)
            {
                Log.Error("Upload File is error: " + ex);
            }

        }

        public static string GetSafeFileName(string extension)
        {
            var random = new Random();
            return Guid.NewGuid().ToString().Replace("-", "") + random.Next(0, 10000).ToString("00000") + extension;


        }

        public static void DeleteFile(string path)
        {
            try
            {
                Task.Run(() =>
                {
                    path = Path.Combine(ConfigurationManager.AppSettings["dirUpload"].ToString(), path);
                    System.IO.File.Delete(path);
                });
            }
            catch (Exception ex)
            {

            }
        }

        public static string GetDirectory()
        {
            return Path.Combine(DateTime.Now.ToString("MMyyyy"), ControllerName).ToLower();
        }

        protected override void OnActionExecuting(ActionExecutingContext filterContext)
        {
            if (!CheckAuthorizer.IsAuthenticated())
                filterContext.Result = RedirectToAction("Index", "Login", new { Area = "Admin", ReturnUrl = Request.Url.AbsoluteUri });
            else
            {
                if (!CheckAuthorizer.Authorize(Permission.VIEW))
                    filterContext.Result = RedirectToAction("Permission", "Error", new { Area = "Admin" });
            }

        }
        public JsonResult CheckPermission(string permission)
        {
            Permission p;
            switch (permission)
            {
                case "ADD":
                    p = Permission.ADD;
                    break;
                case "DELETE":
                    p = Permission.DELETE;
                    break;
                case "VIEW":
                    p = Permission.VIEW;
                    break;
                case "EDIT":
                    p = Permission.EDIT;
                    break;
                case "XAC_NHAN":
                    p = Permission.XAC_NHAN;
                    break;
                case "EXPORT":
                    p = Permission.EXPORT;
                    break;
                case "RESETPIN":
                    p = Permission.RESETPIN;
                    break;
                default:
                    p = Permission.OTHER;

                    break;
            }
            if (!CheckAuthorizer.Authorize(p))
                return Json(new
                {
                    code = "00",
                    message = string.Format(Resource.PermissionContent_Lang)
                }, JsonRequestBehavior.AllowGet);
            return Json(new
            {
                code = "01",
                message = ""
            }, JsonRequestBehavior.AllowGet);
        }

        #region Check Validate

        public List<string> CheckValidate()
        {
            var error = ModelState.Where(x => x.Value.Errors.Count > 0).Select(x => new { x.Key, x.Value.Errors }).ToArray();
            var errorMessages = new List<string>();
            var validationErrors = ModelState.Values.Select(x => x.Errors);
            validationErrors.ToList().ForEach(ve =>
            {
                var errorStrings = ve.Select(x => x.ErrorMessage);
                errorStrings.ToList().ForEach(em =>
                {
                    errorMessages.Add(em);
                });
            });

            return errorMessages;
        }
    }
    #endregion
}
