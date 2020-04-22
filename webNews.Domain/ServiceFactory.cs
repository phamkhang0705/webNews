using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.OrmLite.SqlServer;
using webNews.Domain.Repositories;

namespace webNews.Domain
{
    public static class ServiceFactory
    {

        static Hashtable services = new Hashtable();
        static ServiceFactory()
        {
            services.Add(typeof(WebNewsDbConnectionFactory), new WebNewsDbConnectionFactory(ConfigurationManager.ConnectionStrings["WebNews"].ConnectionString, SqlServer2014OrmLiteDialectProvider.Instance));
            services.Add(typeof(SystemRepository), new SystemRepository(new WebNewsDbConnectionFactory(ConfigurationManager.ConnectionStrings["WebNews"].ConnectionString, SqlServer2014OrmLiteDialectProvider.Instance)));
        }
        public static SystemRepository SystemRepository
        {
            get
            {
                return (SystemRepository)services[typeof(SystemRepository)];
            }
            set
            {
                services[typeof(SystemRepository)] = value;
            }
        }
        public static T GetService<T>()
        {
            foreach (var service in services.Values)
            {
                if (service is T)
                {
                    return (T)service;
                }
            }
            return default(T);
        }
    }
}
