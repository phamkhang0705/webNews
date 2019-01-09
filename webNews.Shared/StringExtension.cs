using ServiceStack;

namespace webNews.Shared
{
    public static class StringExtension
    {
        public static T GetFromJson<T>(this string t)
        {
            return t.FromJson<T>();
        }
    }
}