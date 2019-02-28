using System.Configuration;

using Autofac;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.SqlServer;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.RoleManage;
using webNews.Domain.Repositories.RoleManagement;
using webNews.Domain.Repositories.UserManagement;
using webNews.Domain.Services;
using webNews.Domain.Services.RoleManage;
using webNews.Domain.Services.RoleManagement;
using webNews.Domain.Services.UserManagement;

namespace webNews.Domain
{
    public class DomainModule : Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            OrmLiteConfig.CommandTimeout = 360;
            OrmLiteConfig.DialectProvider = SqlServer2014Dialect.Provider;
            OrmLiteConfig.DialectProvider.GetStringConverter().UseUnicode = true;

            builder.Register<IWebNewsDbConnectionFactory>(
                p =>
                    new WebNewsDbConnectionFactory(ConfigurationManager.ConnectionStrings["WebNews"].ConnectionString, SqlServer2014OrmLiteDialectProvider.Instance));

            builder.RegisterType<SystemRepository>().As<ISystemRepository>();
            builder.RegisterType<SystemService>().As<ISystemService>();
            builder.RegisterType<UserRepository>().As<IUserRepository>();

            builder.RegisterType<UserManagementRepository>().As<IUserManagementRepository>();
            builder.RegisterType<UserManagementService>().As<IUserManagementService>();

            builder.RegisterType<RoleManageRepository>().As<IRoleManageRepository>();
            builder.RegisterType<RoleManageService>().As<IRoleManageService>();

            builder.RegisterType<RoleManagementRepository>().As<IRoleManagementRepository>();
            builder.RegisterType<RoleManagementService>().As<IRoleManagementService>();

            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(Service<>)).As(typeof(IService<>)).InstancePerDependency();

            base.Load(builder);
        }
    }
}