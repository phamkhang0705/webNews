using System;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.SessionState;
using webNews.Models;
using webNews.Areas.Admin.Models.Login;
using NLog;
using ServiceStack.Caching;
using webNews.Models.Common;
using System.Threading.Tasks;
using webNews.Domain.Entities;
using webNews.Security;
using webNews.Services.SecurityService;

namespace webNews.Areas.Admin.Controllers
{
    public class LoginController : Controller
    {
        private readonly Logger _log = LogManager.GetLogger("LoginController");
        private static readonly MemoryCacheClient Cache = new MemoryCacheClient();
        private readonly IUserService _userService;
        public LoginController(IUserService userService)
        {
            _userService = userService;
        }

        //
        // GET: /Admin/Login/
        public ActionResult Index()
        {
            var obj = GetCapcharImg();
            var loginmodel = new LoginModel();
            loginmodel.CapchaModel = obj;
            return View(loginmodel);
        }

        //
        // GET: /Admin/Login/
        [ValidateInput(false)]
        [HttpPost]
        public ActionResult Login(string username, string password, string language, string capchar)
        {
            username = username.Trim();
            password = password.Trim();
            //var captchar = Session["Captcha"].ToString();
            //if (string.IsNullOrWhiteSpace(captchar) || captchar.ToLower().Trim() != capchar.ToLower().Trim())
            //{
            //    var rs = new
            //    {
            //        Status = "00",
            //        Message = Resource.Captcharinvalid_Lang
            //    };
            //    return Json(new { result = rs }, JsonRequestBehavior.AllowGet);
            //}
            System.Web.HttpContext.Current.Session.Abandon();
            System.Web.HttpContext.Current.Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
            var manager = new SessionIDManager();
            manager.RemoveSessionID(System.Web.HttpContext.Current);
            var newId = manager.CreateSessionID(System.Web.HttpContext.Current);
            bool isRedirected;
            bool isAdded;
            manager.SaveSessionID(System.Web.HttpContext.Current, newId, out isRedirected, out isAdded);

            GetCapcharImg();

            var login = new UserModel
            {
                Password = password,
                UserName = username.Trim(),
                TypeLogin = 1
            };
            Cache.Add(username + newId, login, DateTime.Now.AddMinutes(1));

            return RedirectToAction("Authenticate", "Login", new { username });

        }
        public async Task<ActionResult> Authenticate(string username)
        {
            var rs = new JsonRs
            {
                Status = "00",
                Message = "Đăng nhập lỗi"
            };
            try
            {
                var obj = Cache.Get<UserModel>(username + System.Web.HttpContext.Current.Session.SessionID);
                if (obj != null)
                {
                    Cache.Remove(username + System.Web.HttpContext.Current.Session.SessionID);
                    System_User user = null;
                    rs = _userService.Authenticate(obj.UserName, obj.Password, ref user);
                    if (user != null)
                    {
                        //                        var branchCode = string.Empty;
                        //                        Session[Constant.SessionKey.UserName] = user.UserName;
                        //                        Session[Constant.SessionKey.UserId] = user.Id.ToString();
                        return Json(new { result = rs }, JsonRequestBehavior.AllowGet);
                    }
                    else
                    {
                        rs = new JsonRs()
                        {
                            Data = "",
                            Message = "ok",
                            Status = "01"
                        };
                        return Json(new { result = rs }, JsonRequestBehavior.AllowGet);
                    }

                }
                return Json(new { result = rs }, JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                _log.Error("Login is error: username:{0} - Message: {1}", username, ex);
                return Json(new { result = rs }, JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult VerifyLogin()
        {
            return View();
        }
        public ActionResult Logout()
        {

            bool isOk = Authentication.Logout();
            return Json(new { result = isOk ? 1 : 0 }, JsonRequestBehavior.AllowGet);
            /**/
        }
        [HttpPost]
        public ActionResult ResetCapchar()
        {

            var obj = GetCapcharImg();
            return Json(obj, JsonRequestBehavior.AllowGet);
            /**/
        }

        #region GetCapchar
        private CaptchModel GetCapcharImg()
        {
            var loginModel = new LoginModel();
            var obj = new CaptchModel
            {
                CapImage = "data:image/png;base64," + loginModel.GetCaptchaImage(),
                CapImageText = Convert.ToString(Session["Captcha"])
            };
            return obj;
        }
        #endregion

        [HttpPost]
        public ActionResult ForgotPassword(string userName, string email, string capchar)
        {
            if (capchar.ToLower() == ((string)Session["Captcha"]).ToLower())
            {

                var isSuccess = false;
                var msg = "";
                isSuccess = _userService.VerifyUserAndEmail(userName, email);
                if (!isSuccess)
                {
                    return Json(new
                    {
                        Status = "00",
                        Msg = "Email hoặc tên tài khoản không chính xác. Vui lòng kiểm tra lại!"
                    }, JsonRequestBehavior.AllowGet);
                }

                var userInfo = _userService.GetUserByName(userName);
                if (userInfo == null)
                {
                    msg = "Tài khoản không tồn tại trên hệ thống, vui lòng liên hệ tổng đài để được hỗ trợ!";
                    return Json(new
                    {
                        Status = "00",
                        Msg = msg
                    }, JsonRequestBehavior.AllowGet);
                }
                // đang khóa
                if (userInfo.Status != 1)
                {
                    msg = "Tài khoản đang bị khóa, vui lòng liên hệ tổng đài để được hỗ trợ!";
                    return Json(new
                    {
                        Status = "00",
                        Msg = msg
                    }, JsonRequestBehavior.AllowGet);
                }

                var cusomer = _userService.GetUserByName(userName);
                msg = "Một email lưu mật khẩu mới được gửi tới mail của bạn. Bạn vui lòng kiểm tra Email";
                return Json(new
                {
                    Status = "01",
                    Msg = msg
                }, JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json(new
                {
                    Status = "00",
                    Msg = "Capchar nhập vào không đúng!"
                }, JsonRequestBehavior.AllowGet);
            }
        }

        public string GetCapChaDK()
        {
            var loginModel = new LoginModel();
            return "data:image/png;base64," + loginModel.GetCaptchaImage();
        }
        public string GetCapChaQMK()
        {
            var loginModel = new LoginModel();
            return "data:image/png;base64," + loginModel.GetCaptchaImage();
        }
        public class UserModel
        {
            public string UserName { get; set; }
            public string Password { get; set; }
            public int TypeLogin { get; set; }
        }

        #region Update Password
        //[HttpPost]
        //public ActionResult ShowChangePass()
        //{
        //    var model = new UpdatePassModel();
        //    return PartialView("_ptvUpdatePass", model);
        //}
        //[HttpPost]
        //public JsonResult ChangePassword(UpdatePassModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            var data = new CustomerRequest
        //            {
        //                UserName = Authentication.GetUserName(),
        //                Password = model.OldPass.Trim(),
        //                NewPassword = model.NewPass.Trim()
        //            };
        //            if (model.NewPass.ToUpper() == model.OldPass.ToUpper())
        //            {
        //                return Json(new
        //                {
        //                    Status = "05",
        //                    Message = "Mật khẩu mới đã trùng với mật khẩu cũ."
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            var rs = _customerService.UpdatePassword(data);
        //            if (rs.ResponseCode == "01")
        //            {
        //                return Json(new
        //                {
        //                    Status = "01",
        //                    Message = "Đổi mật khẩu thành công."
        //                }, JsonRequestBehavior.AllowGet);
        //            }
        //            return Json(new
        //            {
        //                Status = "00",
        //                Message = !string.IsNullOrEmpty(rs.ResponseMessage) ? rs.ResponseMessage : Lang.Resource.ServerError_Lang
        //            }, JsonRequestBehavior.AllowGet);
        //        }
        //        catch (Exception ex)
        //        {
        //            _log.Error("Update Password is error: " + ex);
        //            var rs = new JsonRs { Status = "00", Message = Lang.Resource.ServerError_Lang };
        //            return Json(rs, JsonRequestBehavior.AllowGet);
        //        }
        //    }
        //    _log.Error("In Valid Infomation: " + model.ToJson());
        //    var rsError = new JsonRs { Status = "00", Message = Lang.Resource.InvalidInfomation_Lang };
        //    return Json(rsError, JsonRequestBehavior.AllowGet);
        //}
        #endregion
    }
}