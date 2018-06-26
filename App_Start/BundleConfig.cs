using System.Web;
using System.Web.Optimization;

namespace LeaveModule
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            //bundles.Add(new StyleBundle("~/Content/css").Include(
            //    "~/Content/leave/leave.css",
            //    "~/Content/leave/leave-card.css",
            //    "~/Content/leave/rtable-create.css",
            //    "~/Content/leave/rtable.css",
            //    "~/Content/leave/utility2.css"));

	        bundles.Add(new StyleBundle("~/bundles/vendorCSS").Include(
                "~/Content/bootstrap-theme.min.css",
                "~/Content/bootstrap.min.css",
		        "~/Content/font-awesome.min.css",
		        "~/Content/toastr.min.css",
                "~/kendo/css/kendo.common.min.css",
                "~/kendo/css/kendo.common.min.css.map",
                //"~/kendo/css/kendo.default.min.css",
                //"~/kendo/css/kendo.default.min.css.map",
                //"~/kendo/css/kendo.default.mobile.css",
                //"~/kendo/css/kendo.default.mobile.css.map",
                //"~/kendo/css/kendo.material.min.css",
                //"~/kendo/css/kendo.material.min.css.map",
                //"~/kendo/css/kendo.material.mobile.css",
                //"~/kendo/css/kendo.material.mobile.css.map",
	            "~/kendo/css/kendo.uniform.min.css",
                "~/kendo/css/kendo.uniform.min.css.map",
                "~/kendo/css/kendo.uniform.mobile.css",
                "~/kendo/css/kendo.uniform.mobile.css.map"));

	        bundles.Add(new ScriptBundle("~/bundles/vendorJS").Include(
				"~/Scripts/jquery-{version}.js",
                //"~/Scripts/angular.min.js",
				"~/Scripts/toastr.js",
		        "~/Scripts/modernizr-*",
                "~/Scripts/bootstrap.min.js",
                "~/Scripts/fastclick.js",
                "~/Scripts/respond.js",
                "~/kendo/js/jquery.min.js",
                "~/kendo/js/kendo.all.min.js"));



            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                "~/Scripts/jquery-{version}.js",
                "~/Scripts/jquery-ui.js",
                "~/Scripts/jquery.slimscroll.js"));

            bundles.Add(new ScriptBundle("~/bundles/angular").Include(
                "~/Scripts/angular.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/vue").Include(
                "~/Scripts/vue.js"));

            bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
                "~/kendo/js/jquery.min.js",
                "~/kendo/js/kendo.all.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/adminlte").Include(
                "~/admin-lte/js/adminlte.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/jquery.validate*"));

            bundles.Add(new ScriptBundle("~/bundles/vendor-js").Include(
                "~/Scripts/toastr.js",
                "~/Scripts/moment.js",
                "~/Scripts/sweetalert.min.js",
                "~/Scripts/jquery.slimscroll.js",
                "~/Scripts/fastclick.js",
                "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/bootstrap.js"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                "~/Content/bootstrap.css",
                "~/Content/bootstrap-theme.css",
                "~/Content/font-awesome.css",
                "~/Content/toastr.min.css",
                "~/Content/ionicons.css",
                "~/kendo/css/kendo.common.min.css",
                "~/kendo/css/kendo.common.min.css.map",
                //"~/kendo/css/kendo.default.min.css",
                //"~/kendo/css/kendo.default.min.css.map",
                //"~/kendo/css/kendo.default.mobile.css",
                //"~/kendo/css/kendo.default.mobile.css.map",
                //"~/kendo/css/kendo.material.min.css",
                //"~/kendo/css/kendo.material.min.css.map",
                //"~/kendo/css/kendo.material.mobile.css",
                //"~/kendo/css/kendo.material.mobile.css.map",
                "~/kendo/css/kendo.uniform.min.css",
                "~/kendo/css/kendo.uniform.min.css.map",
                "~/kendo/css/kendo.uniform.mobile.css",
                "~/kendo/css/kendo.uniform.mobile.css.map",
                "~/admin-lte/css/AdminLTE.css",
                "~/Content/_all-skins.css"));
            
            //bundles.IgnoreList.Clear();
            //BundleTable.EnableOptimizations = true;
        }
    }
}
