using System.Collections.Generic;
using System.Text;
using ServiceStack.Data;
using ServiceStack.OrmLite;
using ServiceStack.OrmLite.SqlServer;

namespace webNews.Domain
{
    public interface IWebNewsDbConnectionFactory : IDbConnectionFactory
    {
    }

    public class WebNewsDbConnectionFactory : OrmLiteConnectionFactory, IWebNewsDbConnectionFactory
    {
        public WebNewsDbConnectionFactory(string s) : base(s) { }
        public WebNewsDbConnectionFactory(string s, SqlServer2014OrmLiteDialectProvider provider) : base(s, provider) { }
        public WebNewsDbConnectionFactory(string s, SqlServer2012OrmLiteDialectProvider provider) : base(s, provider) { }
    }
}
