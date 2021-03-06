﻿using Autofac;
using Autofac.Integration.Mvc;
using NLog;
using ServiceStack;
using System;
using System.Reflection;
using System.Web;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using webNews.Controllers;
using webNews.Domain;
using webNews.Shared;
using webNews.Services.SecurityService;
using webNews.Domain.Services;
using System.Threading;
using System.Globalization;

namespace webNews
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            ServiceStackHelper.Help();
            LicenseUtils.ActivatedLicenseFeatures();

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AutofacConfig.ConfigureContainer();
        }

        private readonly Logger _log = LogManager.GetLogger("ErrorAllPage");

        protected void Application_Error(object sender, EventArgs e)
        {
            var httpContext = ((MvcApplication)sender).Context;
            var currentController = string.Empty;
            var currentAction = string.Empty;
            var currentRouteData = RouteTable.Routes.GetRouteData(new HttpContextWrapper(httpContext));
            var ex = Server.GetLastError();

            if (currentRouteData != null)
            {
                if (!string.IsNullOrEmpty(currentRouteData.Values["controller"]?.ToString()))
                {
                    currentController = currentRouteData.Values["controller"].ToString();
                }

                if (!string.IsNullOrEmpty(currentRouteData.Values["action"]?.ToString()))
                {
                    currentAction = currentRouteData.Values["action"].ToString();
                }
                var errorMsg =
                    $"An unhandled exception occurs in the controller:{currentController}, action:{currentAction}";
                _log.Error(errorMsg + "\n" + ex);
            }

            var controller = new ErrorController();
            var routeData = new RouteData();
            routeData.Values.Add("controller", "Error");
            routeData.Values.Add("action", "Index");

            var httpException = ex as HttpException;
            routeData.Values["errorCode"] = httpException?.GetHttpCode();

            httpContext.ClearError();
            Server.ClearError();
            httpContext.Response.Clear();
            Response.ContentType = "text/html";
            ((IController)controller).Execute(new System.Web.Routing.RequestContext(new HttpContextWrapper(httpContext), routeData));
        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Session_End(object sender, EventArgs e)
        {
            //  Code that runs on application shutdown

            Session.Clear();
        }
    }

    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {
            var builder = new ContainerBuilder();
            builder.RegisterControllers(Assembly.GetExecutingAssembly());

            builder.RegisterModule<DomainModule>();

            builder.RegisterType<UserService>().As<IUserService>();
            builder.RegisterGeneric(typeof(Service<>)).As(typeof(IService<>)).InstancePerDependency();
            var container = builder.Build();
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}
