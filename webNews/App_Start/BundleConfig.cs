using System.Web;
using System.Web.Optimization;

namespace webNews
{
    //public class BundleConfig
    //{

    //    // For more information on bundling, visit https://go.microsoft.com/fwlink/?LinkId=301862
    //    public static void RegisterBundles(BundleCollection bundles)
    //    {
    //        bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
    //                    "~/Scripts/jquery-{version}.js"));

    //        bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
    //                    "~/Scripts/jquery.validate*"));

    //        // Use the development version of Modernizr to develop with and learn from. Then, when you're
    //        // ready for production, use the build tool at https://modernizr.com to pick only the tests you need.
    //        bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
    //                    "~/Scripts/modernizr-*"));

    //        bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
    //                  "~/Scripts/bootstrap.js"));

    //        bundles.Add(new StyleBundle("~/Content/css").Include(
    //                  "~/Content/bootstrap.css",
    //                  "~/Content/site.css"));

    //        bundles.Add(new StyleBundle("~/Content/css/theme").Include(
    //                //Bootstrap Core CSS
    //                "~/Theme/bootstrap/dist/css/bootstrap.min.css",
    //                //Menu CSS
    //                "~/Theme/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.css",
    //                //toast CSS
    //                "~/Theme/plugins/bower_components/toast-master/css/jquery.toast.css",
    //                //morris CSS
    //                "~/Theme/plugins/bower_components/morrisjs/morris.css",
    //                //chartist CSS
    //                "~/Theme/plugins/bower_components/chartist-js/dist/chartist.min.css",
    //                "~/Theme/plugins/bower_components/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.css",
    //                //Calendar CSS
    //                "~/Theme/plugins/bower_components/calendar/dist/fullcalendar.css",
    //                //color CSS
    //                "~/Theme/css/custom.css"
    //            ));

    //        bundles.Add(new ScriptBundle("~/bundles/theme").Include(
    //                //All JqueryD:\Work\webNews\webNews\webNews\Assets\Admin\jquery-1.11.3.min.js
    //                "~/Assets/Admin/jquery-1.11.3.min.js",
    //                //Bootstrap Core JavaScript
    //                "~/Theme/bootstrap/dist/js/bootstrap.min.js",
    //                //Menu Plugin JavaScript
    //                "~/Theme/plugins/bower_components/sidebar-nav/dist/sidebar-nav.min.js",
    //                //slimscroll JavaScript
    //                "~/Theme/js/jquery.slimscroll.js",
    //                //Wave Effects
    //                "~/Theme/js/waves.js",
    //                //chartist chart
    //                "~/Theme/plugins/bower_components/chartist-js/dist/chartist.min.js",
    //                "~/Theme/plugins/bower_components/chartist-plugin-tooltip-master/dist/chartist-plugin-tooltip.min.js",
    //                //Sparkline chart JavaScript
    //                "~/Theme/plugins/bower_components/jquery-sparkline/jquery.sparkline.min.js",
    //                //Style Switcher
    //                "~/Theme/plugins/bower_components/styleswitcher/jQuery.style.switcher.js",
    //                "~/Scripts/Common/language-vi.js",

    //                "~/Scripts/bootstrap-datetimepicker/moment-with-locales.min.js",
    //                "~/Scripts/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js",
    //                "~/Scripts/inputmask/jquery.inputmask.bundle.js",
    //                "~/Scripts/jquery-validate/jquery.validate.js",
    //                "~/Scripts/bootstrap-table/bootstrap-table.js",
    //                "~/Scripts/bootbox/bootbox.min.js",
    //                "~/Scripts/jquery.validate.min.js",
    //                "~/Scripts/jsLatinDecoder.js",
    //                "~/Scripts/jquery.customValidate.js",
    //                "~/Scripts/additional-methods.min.js",

    //                "~/Scripts/Common/Service.js",
    //                //Custom Theme JavaScript
    //                "~/Theme/js/custom.min.js"));          

    //                 bundles.Add(new ScriptBundle("~/bundles/RoleManage").Include(
    //                "~/Scripts/inputmask/jquery.inputmask.bundle.js",
    //                "~/Scripts/jquery-validate/jquery.validate.js",
    //                "~/Scripts/bootstrap-table/bootstrap-table.js",
    //                "~/Scripts/bootbox/bootbox.min.js",
    //                "~/Scripts/bootstrap-datetimepicker/moment-with-locales.min.js",
    //                "~/Scripts/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js",
    //                "~/Scripts/jquery.validate.min.js",
    //                "~/Scripts/Common/Service.js",
    //                "~/Scripts/Admin/RoleManage/Ctrl.js"
    //                ));


    //            bundles.Add(new ScriptBundle("~/bundles/RoleManagement").Include(
    //           "~/Scripts/inputmask/jquery.inputmask.bundle.js",
    //           "~/Scripts/jquery-validate/jquery.validate.js",
    //           "~/Scripts/bootstrap-table/bootstrap-table.js",
    //           "~/Scripts/bootbox/bootbox.min.js",
    //           "~/Scripts/bootstrap-datetimepicker/moment-with-locales.min.js",
    //           "~/Scripts/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js",
    //           "~/Scripts/jquery.validate.min.js",
    //           "~/Scripts/Common/Service.js",
    //           "~/Scripts/Admin/RoleManagement/RoleManagement.js"
    //           ));



    //        bundles.Add(new StyleBundle("~/Theme-fe/css").Include(
    //                  "~/ThemeFE/Content/themes/skin/home.css",
    //                  "~/ThemeFE/Scripts/Plugin/jquery.fancybox-1.3.4/fancybox/jquery.fancybox-1.3.4.css"));

    //        bundles.Add(new ScriptBundle("~/bundles/theme-fe").Include(
    //           "~/ThemeFE/Scripts/jquery-1.8.0.min.js",
    //           "~/ThemeFE/Scripts/Plugin/Cycle/jquery.cycle.all.js",
    //           "~/ThemeFE/Scripts/Plugin/jcarousellite/jcarousellite_1.0.1.min.js",
    //           "~/ThemeFE/Scripts/Plugin/simplyscroll/jquery.simplyscroll-1.0.4.min.js",
    //           "~/ThemeFE/Scripts/Plugin/jquery.fancybox-1.3.4/fancybox/jquery.fancybox-1.3.4.js",
    //           "~/ThemeFE/Scripts/Core/demo.js"
    //           ));

    //        BundleTable.EnableOptimizations = true;
    //    }
    //}
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
            //            "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Theme/css/login").Include(
                      //<!-- Bootstrap -->
                      "~/Theme/vendors/bootstrap/css/bootstrap.min.css",
                      //<!-- Font Awesome -->
                      "~/Theme/vendors/font-awesome/css/font-awesome.min.css",
                      //<!-- NProgress -->
                      "~/Theme/vendors/nprogress/nprogress.css",
                      //<!-- Animate.css -->
                      "~/Theme/vendors/animate.css/animate.min.css",

                      //<!-- Custom Theme Style -->
                      "~/Theme/css/custom.min.css"
                ));

            bundles.Add(new ScriptBundle("~/Theme/js/login").Include(
                      //Jquery
                      "~/Theme/vendors/Jquery/jquery-1.11.3.min.js"
                ));

            bundles.Add(new StyleBundle("~/Theme/css").Include(
                      //<!-- Bootstrap -->
                      "~/Theme/vendors/bootstrap/css/bootstrap.min.css",
                      //<!-- Font Awesome -->
                      "~/Theme/vendors/font-awesome/css/font-awesome.min.css",
                      //<!-- NProgress -->
                      "~/Theme/vendors/nprogress/nprogress.css",
                      //<!-- iCheck -->
                      "~/Theme/vendors/iCheck/green.css",

                      //<!-- bootstrap-progressbar -->
                      "~/Theme/vendors/bootstrap-progressbar/css/bootstrap-progressbar-3.3.4.min.css",
                      //<!-- JQVMap -->
                      "~/Theme/vendors/jqvmap/jqvmap.min.css",
                      //<!-- bootstrap-daterangepicker -->
                      "~/Theme/vendors/bootstrap-daterangepicker/daterangepicker.css",
                      //<!-- bootstrap-table -->
                      "~/Theme/vendors/bootstrap-table/bootstrap-table.css",

                      //<!-- Custom Theme Style -->
                      "~/Theme/css/custom.min.css",
                      "~/Style/Admin/custom.css",
                      "~/Theme/vendors/jQueryUI/jquery-ui.css",
                      "~/Content/bootstrap-switch.min.css",
                       "~/Content/checkbox3.min.css",
                         "~/Content/multi-select.css",
                          "~/Content/select2.min.css",
                           "~/Content/Site.css"
                ));

            bundles.Add(new ScriptBundle("~/Theme/lib").Include(
                      //Jquery
                      "~/Theme/vendors/Jquery/jquery-1.12.4.js",
                      //<!-- Bootstrap -->
                      "~/Theme/vendors/bootstrap/js/bootstrap.min.js",
                      //<!-- FastClick -->
                      "~/Theme/vendors/fastclick/lib/fastclick.js",
                      //<!-- NProgress -->
                      "~/Theme/vendors/nprogress/nprogress.js",
                      //<!-- Chart.js -->
                      "~/Theme/vendors/Chart.js/Chart.min.js",
                      //<!-- gauge.js -->
                      //"~/Theme/vendors/gauge.js/gauge.min.js",
                      //<!-- bootstrap-progressbar -->
                      "~/Theme/vendors/bootstrap-progressbar/js/bootstrap-progressbar.min.js",
                      //<!-- iCheck -->
                      //"~/Theme/vendors/iCheck/icheck.min.js",
                      //<!-- Skycons -->
                      "~/Theme/vendors/skycons/skycons.js",
                      //<!-- Flot -->
                      "~/Theme/vendors/Flot/jquery.flot.js",
                      "~/Theme/vendors/Flot/jquery.flot.pie.js",
                      "~/Theme/vendors/Flot/jquery.flot.time.js",
                      "~/Theme/vendors/Flot/jquery.flot.stack.js",
                      "~/Theme/vendors/Flot/jquery.flot.resize.js",
                      //<!-- Flot plugins -->
                      "~/Theme/vendors/flot.orderbars/js/jquery.flot.orderBars.js",
                      "~/Theme/vendors/flot-spline/js/jquery.flot.spline.min.js",
                      "~/Theme/vendors/flot.curvedlines/curvedLines.js",
                      //<!-- DateJS -->
                      "~/Theme/vendors/DateJS/build/date.js",
                      //<!-- JQVMap -->
                      //"~/Theme/vendors/jqvmap/jquery.vmap.js",
                      //"~/Theme/vendors/jqvmap/jquery.vmap.world.js",
                      //"~/Theme/vendors/jqvmap/jquery.vmap.sampledata.js",
                      //<!-- bootstrap-daterangepicker -->
                      "~/Theme/vendors/moment/moment.min.js",
                      "~/Theme/vendors/bootstrap-daterangepicker/daterangepicker.js",

                      //<!-- Custom Theme Scripts -->
                      "~/Theme/js/custom.js",
                      //"~/Theme/js/custom.min.js"
                      "~/Theme/vendors/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js",
                      // "~/Theme/vendors/bootstrap-select/bootstrap-select.js",
                      "~/Theme/vendors/inputmask/jquery.inputmask.bundle.js",
                      "~/Theme/vendors/metisMenu/dist/metisMenu.min.js",
                      "~/Theme/vendors/jquery-validate/jquery.validate.js",
                      "~/Theme/vendors/bootstrap-table/bootstrap-table.js",
                      "~/Theme/vendors/bootbox/bootbox.min.js",
                        //format number
                        "~/Scripts/jquery.number.min.js",
                      "~/Scripts/shortcut.js",
                      //JqueryUI
                      "~/Theme/vendors/jQueryUI/jquery-ui.js",
                      "~/Scripts/jquery.multi-select.js",
                      "~/Scripts/select2.full.min.js",
                       "~/Scripts/bootstrap-switch.min.js",
                        "~/Scripts/app.js"
                ));

            bundles.Add(new ScriptBundle("~/bundles/RoleManagement").Include(
           "~/Scripts/inputmask/jquery.inputmask.bundle.js",
           "~/Scripts/jquery-validate/jquery.validate.js",
           "~/Scripts/bootstrap-table/bootstrap-table.js",
           "~/Scripts/bootbox/bootbox.min.js",
           "~/Scripts/bootstrap-datetimepicker/moment-with-locales.min.js",
           "~/Scripts/bootstrap-datetimepicker/bootstrap-datetimepicker.min.js",
           "~/Scripts/jquery.validate.min.js",
           "~/Scripts/Common/Service.js",
           "~/Scripts/Admin/RoleManagement/RoleManagement.js"
           ));
            // BundleTable.EnableOptimizations = true;
        }
    }
}
