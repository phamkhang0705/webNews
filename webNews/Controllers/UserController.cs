using System;
using System.Configuration;
using System.Web.Mvc;
using Facebook;
using webNews.Common;
using webNews.Domain.Entities;
using webNews.Domain.Services;
using webNews.Domain.Services.CustomerManagement;
using webNews.Models.Common;

namespace webNews.Controllers
{
    public class UserController : Controller
    {

        private readonly ICustomerManagementService _customerService;
        private readonly ISystemService _systemService;

        public UserController(ICustomerManagementService customerService, ISystemService systemService)
        {
            _customerService = customerService;
            _systemService = systemService;
        }
        private Uri RedirectUri
        {
            get
            {
                var uriBuilder = new UriBuilder(Request.Url);
                uriBuilder.Query = null;
                uriBuilder.Fragment = null;
                uriBuilder.Path = Url.Action("FacebookCallback");
                return uriBuilder.Uri;
            }
        }

        // GET: User
        [HttpGet]
        public ActionResult Register()
        {
            return View();
        }

        public ActionResult Login()
        {
            return View();
        }

        public ActionResult LoginFacebook()
        {
            var fb = new FacebookClient();
            var loginUrl = fb.GetLoginUrl(new
            {
                client_id = ConfigurationManager.AppSettings["FbAppId"],
                client_secret = ConfigurationManager.AppSettings["FbAppSecret"],
                redirect_uri = RedirectUri.AbsoluteUri,
                response_type = "code",
                scope = "email",
            });

            return Redirect(loginUrl.AbsoluteUri);
        }

        public ActionResult FacebookCallback(string code)
        {
            var fb = new FacebookClient();
            dynamic result = fb.Post("oauth/access_token", new
            {
                client_id = ConfigurationManager.AppSettings["FbAppId"],
                client_secret = ConfigurationManager.AppSettings["FbAppSecret"],
                redirect_uri = RedirectUri.AbsoluteUri,
                code = code
            });

            var accessToken = result.access_token;
            if (!string.IsNullOrEmpty(accessToken))
            {
                fb.AccessToken = accessToken;
                // Get the user's information, like email, first name, middle name etc
                dynamic me = fb.Get("me?fields=name,link,first_name,middle_name,last_name,id,email");
                string id = me.id;
                string link = me.link;
                string email = me.email;
                string userName = me.email;
                string firstname = me.first_name;
                string middlename = me.middle_name;
                string lastname = me.last_name;
                string full_name = lastname + " " + middlename + " " + firstname;
                var user = new System_User();
                user.Email = email;
                user.UserName = full_name;
                user.Status = 1;
                user.FullName = full_name;
                user.CreatedDate = DateTime.Now;
                var resultInsert = false;
                var check = _customerService.GetByEmail(email);
                if (check == null)
                {
                    var cus = new Vw_Customer()
                    {
                        CustomerCode = _systemService.CodeGen(ObjectType.Customer),
                        CustomerName = full_name,
                        CustomerType = 1,
                        Status = 1,
                        CreatedDate = DateTime.Now,
                        Phone = "",
                        Facebook = "",
                        Address = "",
                        Email = email
                    };
                    var isInsert = _customerService.CreateCustomer(cus);
                    if (isInsert.ResponseCode == "01")
                    {
                        resultInsert = true;
                    }
                }
                else
                {
                    //todo
                    resultInsert = true;
                }

                if (resultInsert)
                {
                    var userSession = new UserLogin();
                    userSession.UserName = user.FullName;
                    userSession.UserID = user.Id;
                    Session.Add(Common.Common.CommonConstants.USER_SESSION, userSession);
                }
            }
            return Redirect("/");
        }

        public ActionResult Logout()
        {
            Session[Common.Common.CommonConstants.USER_SESSION] = null;
            return Redirect("/");
        }

        //[HttpPost]
        //public ActionResult Login(LoginModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var dao = new UserDao();
        //        var result = dao.Login(model.UserName, Encryptor.MD5Hash(model.Password));
        //        if (result == 1)
        //        {
        //            var user = dao.GetById(model.UserName);
        //            var userSession = new UserLogin();
        //            userSession.UserName = user.UserName;
        //            userSession.UserID = user.ID;
        //            Session.Add(CommonConstants.USER_SESSION, userSession);
        //            return Redirect("/");
        //        }
        //        else if (result == 0)
        //        {
        //            ModelState.AddModelError("", "Tài khoản không tồn tại.");
        //        }
        //        else if (result == -1)
        //        {
        //            ModelState.AddModelError("", "Tài khoản đang bị khoá.");
        //        }
        //        else if (result == -2)
        //        {
        //            ModelState.AddModelError("", "Mật khẩu không đúng.");
        //        }
        //        else
        //        {
        //            ModelState.AddModelError("", "đăng nhập không đúng.");
        //        }
        //    }
        //    return View(model);
        //}

        //[HttpPost]
        //[CaptchaValidation("CaptchaCode", "registerCapcha", "Mã xác nhận không đúng!")]
        //public ActionResult Register(RegisterModel model)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        var dao = new UserDao();
        //        if (dao.CheckUserName(model.UserName))
        //        {
        //            ModelState.AddModelError("", "Tên đăng nhập đã tồn tại");
        //        }
        //        else if (dao.CheckEmail(model.Email))
        //        {
        //            ModelState.AddModelError("", "Email đã tồn tại");
        //        }
        //        else
        //        {
        //            var user = new User();
        //            user.Name = model.Name;
        //            user.Password = Encryptor.MD5Hash(model.Password);
        //            user.Phone = model.Phone;
        //            user.Email = model.Email;
        //            user.Address = model.Address;
        //            user.CreatedDate = DateTime.Now;
        //            user.Status = true;
        //            if (!string.IsNullOrEmpty(model.ProvinceID))
        //            {
        //                user.ProvinceID = int.Parse(model.ProvinceID);
        //            }
        //            if (!string.IsNullOrEmpty(model.DistrictID))
        //            {
        //                user.DistrictID = int.Parse(model.DistrictID);
        //            }

        //            var result = dao.Insert(user);
        //            if (result > 0)
        //            {
        //                ViewBag.Success = "Đăng ký thành công";
        //                model = new RegisterModel();
        //            }
        //            else
        //            {
        //                ModelState.AddModelError("", "Đăng ký không thành công.");
        //            }
        //        }
        //    }
        //    return View(model);
        //}
    }
}