using System.Web.Optimization;

namespace webNews
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

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

            bundles.Add(new StyleBundle("~/Themecss/css").Include(
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

            bundles.Add(new ScriptBundle("~/Themelib/lib").Include(
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
            bundles.Add(new StyleBundle("~/Theme/fashecolorlibcss").Include(
               "~/Theme/front-end/vendor/animate/animate.css",
               "~/Theme/front-end/vendor/daterangepicker/daterangepicker.css",
               "~/Theme/front-end/vendor/slick/slick.css",
               "~/Theme/front-end/css/custom.css"
                ));

            bundles.Add(new ScriptBundle("~/Theme/fashecolorlibjs").Include(
                "~/Theme/front-end/vendor/jquery/jquery-3.2.1.min.js",
                "~/Theme/front-end/vendor/animsition/js/animsition.min.js",
                "~/Theme/front-end/vendor/bootstrap/js/popper.js",
                "~/Theme/front-end/vendor/bootstrap/js/bootstrap.min.js",
                "~/Theme/front-end/vendor/select2/select2.min.js",
                "~/Theme/front-end/vendor/slick/slick.min.js",
                "~/Theme/front-end/vendor/countdowntime/countdowntime.js",
                "~/Theme/front-end/vendor/lightbox2/js/lightbox.min.js",
                "~/Theme/front-end/vendor/sweetalert/sweetalert.min.js",
                "~/Theme/front-end/vendor/parallax100/parallax100.js",
                "~/Theme/front-end/vendor/noui/nouislider.min.js"
                , "~/Theme/front-end/js/keep_alive.js"
                ));

            bundles.Add(new ScriptBundle("~/Theme/facebookjs").Include(
                "~/Theme/front-end/js/facebook.js"
                ));
            BundleTable.EnableOptimizations = true;
        }
    }
}