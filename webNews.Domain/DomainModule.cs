using Autofac;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.SqlServer;
using System.Configuration;
using webNews.Domain.Repositories;
using webNews.Domain.Repositories.CategoryManagement;
using webNews.Domain.Repositories.CustomerManagement;
using webNews.Domain.Repositories.FileAttachManagement;
using webNews.Domain.Repositories.GroupCategoryManagement;
using webNews.Domain.Repositories.GroupManagement;
using webNews.Domain.Repositories.OrderTypeManagement;
using webNews.Domain.Repositories.ProductManagement;
using webNews.Domain.Repositories.ProductPriceManagement;
using webNews.Domain.Repositories.RoleManage;
using webNews.Domain.Repositories.RoleManagement;
using webNews.Domain.Repositories.UserManagement;
using webNews.Domain.Services;
using webNews.Domain.Services.CategoryManagement;
using webNews.Domain.Services.CustomerManagement;
using webNews.Domain.Services.FileAttachManagement;
using webNews.Domain.Services.GroupManagement;
using webNews.Domain.Services.OrderTypeManagement;
using webNews.Domain.Services.PriceManagement;
using webNews.Domain.Services.ProductManagement;
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

            builder.RegisterType<ProductPriceRepository>().As<IProductPriceRepository>();
            builder.RegisterType<PriceManagementService>().As<IPriceManagementService>();

            builder.RegisterType<GroupCategoryRepository>().As<IGroupCategoryRepository>();

            builder.RegisterType<OrderTypeRepository>().As<IOrderTypeRepository>();
            builder.RegisterType<OrderTypeManagementService>().As<IOrderTypeManagementService>();

            builder.RegisterType<GroupManagementRepository>().As<IGroupManagementRepository>();
            builder.RegisterType<GroupManagementService>().As<IGroupManagementService>();

            builder.RegisterType<CategoryManagementRepository>().As<ICategoryManagementRepository>();
            builder.RegisterType<CategoryManagementService>().As<ICategoryManagementService>();

            builder.RegisterType<FileAttachManagementRepository>().As<IFileAttachManagementRepository>();
            builder.RegisterType<FileAttachManagementService>().As<IFileAttachManagementService>();

            builder.RegisterType<ProductManagementRepository>().As<IProductManagementRepository>();
            builder.RegisterType<ProductManagementService>().As<IProductManagementService>();

            builder.RegisterType<CustomerManagementRepository>().As<ICustomerManagementRepository>();
            builder.RegisterType<CustomerManagementService>().As<ICustomerManagementService>();

            builder.RegisterGeneric(typeof(Repository<>)).As(typeof(IRepository<>)).InstancePerDependency();
            builder.RegisterGeneric(typeof(Service<>)).As(typeof(IService<>)).InstancePerDependency();

            base.Load(builder);
        }
    }
}