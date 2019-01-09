using System.Web;

namespace webNews.Util
{
    public class SessionManager
    {
        public static void SetValue(string key, object value)
        {
            HttpContext context = HttpContext.Current;
            context.Session[key] = value;
        }

        public static object GetValue(string key)
        {
            HttpContext context = HttpContext.Current;
            return context.Session[key];
        }

        public static void Remove(string Key)
        {
            HttpContext context = HttpContext.Current;
            context.Session.Remove(Key);
        }

        public static void Clear()
        {
            HttpContext context = HttpContext.Current;
            context.Session.RemoveAll();
        }

        public static bool HasValue(string Key)
        {
            HttpContext context = HttpContext.Current;
            return context.Session[Key] != null;
        }
    }
}