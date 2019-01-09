using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Web.Mvc;
using System.Web.Mvc.Html;
using System.Web.Routing;

namespace webNews.HtmlHelpers
{
    public static class HtmlExtensions
    {
        public static MvcHtmlString ValidationHtmlMessageFor<TModel, TProperty>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TProperty>> expression)
        {
            return ValidationHtmlMessageFor(helper, expression, string.Empty, (object)null);
        }
        public static MvcHtmlString ValidationHtmlMessageFor<TModel, TProperty>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TProperty>> expression, string validationMessage)
        {
            return ValidationHtmlMessageFor(helper, expression, validationMessage, (object)null);
        }
        public static MvcHtmlString ValidationHtmlMessageFor<TModel, TProperty>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TProperty>> expression, string validationMessage, object htmlAttributes)
        {
            return ValidationHtmlMessageFor(helper, expression, validationMessage, new RouteValueDictionary(htmlAttributes));
        }
        public static MvcHtmlString ValidationHtmlMessageFor<TModel, TProperty>(this HtmlHelper<TModel> helper, Expression<Func<TModel, TProperty>> expression, string validationMessage, IDictionary<string, object> htmlAttributes)
        {
            return MvcHtmlString.Create(helper.ValidationMessageFor(expression).ToString().Replace("span", "div"));
        }
        public static MvcHtmlString ValidationHtmlMessage(this HtmlHelper htmlHelper, string modelName)
        {
            return MvcHtmlString.Create(htmlHelper.ValidationMessage(modelName).ToString().Replace("span", "div"));
        }
        //public static MvcHtmlString Resource<T>(this HtmlHelper<T> html, string key)
        //{
        //    var resourceSet = webNews.Language.Language.ResourceManager.GetResourceSet(CultureInfo.CurrentUICulture, true, true);
        //    var val = resourceSet.GetString(key);
        //    return MvcHtmlString.Create(String.IsNullOrEmpty(val) ? key : val);
        //}
    }
}