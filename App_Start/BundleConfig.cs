﻿using System.Web;
using System.Web.Optimization;

namespace LeaveModule
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
			//bundles.Add(new StyleBundle("~/Content/css").Include(
			//	"~/Content/bootstrap-theme.min.css",
			//	"~/Content/bootstrap.min.css",
			//	"~/Content/leave/site.css",
			//	"~/Content/leave/utility2.css",
			//	"~/Content/leave/font-awesome/css/font-awesome.min.css",
			//	"~/Content/toastr.min.css"));

			//bundles.Add(new StyleBundle("~/Content/AdminLTE").Include(
			//	"~/Content/AdminLTE/dist/css/AdminLTE.min.css"));

			//bundles.Add(new StyleBundle("~/Content/kendo/css").Include(
			//	"~/Content/kendo/kendo.common-bootstrap.min.css",
			//	"~/Content/kendo/kendo.bootstrap.min.css",
			//	"~/Content/kendo/kendo.uniform.min.css"));

	        //bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
	        //	 "~/Scripts/jquery-{version}.js"));

	        //bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
	        //	"~/Scripts/jquery.validate*"));
			
	        // Use the development version of Modernizr to develop with and learn from. Then, when you're
	        // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
	        //bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
	        //			"~/Scripts/modernizr-*"));

	        //bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
	        //	"~/Scripts/bootstrap.min.js"));

	        //bundles.Add(new ScriptBundle("~/bundles/toastr").Include(
	        //	"~/Scripts/toastr.min.js"));

	        //bundles.Add(new ScriptBundle("~/bundles/AdminLTE").Include(
	        //	"~/Content/AdminLTE/dist/js/app.min.js"));

			//bundles.Add(new ScriptBundle("~/bundles/kendo").Include(
			//	"~/Scripts/kendo/kendo.all.min.js",
			//	"~/Scripts/kendo/kendo.aspnetmvc.min.js",
			//	"~/Scripts/kendo/kendo.angular.min.js",
			//	"~/Scripts/kendo/kendo.angular2.min.js"));

	        bundles.Add(new StyleBundle("~/Content/css").Include(
		        "~/Content/leave/leave.css",
		        "~/Content/leave/leave-card.css",
		        "~/Content/leave/rtable-create.css",
		        "~/Content/leave/rtable.css",
		        "~/Content/leave/utility2.css"));

	        bundles.Add(new StyleBundle("~/bundles/vendorCSS").Include(
		        "~/Content/bootstrap-theme.min.css",
		        "~/Content/bootstrap.min.css",
				"~/Content/kendo/kendo.bootstrap.min.*",
				"~/Content/kendo/kendo.common-bootstrap.core.min.*",
				"~/Content/kendo/kendo.common-bootstrap.min.*",
				"~/Content/kendo/kendo.uniform.min.*",
		        "~/Content/AdminLTE/dist/css/AdminLTE.min.css",
		        "~/Content/font-awesome.min.css",
		        "~/Content/toastr.min.css"));

	        bundles.Add(new ScriptBundle("~/bundles/vendorJS").Include(
				"~/Scripts/jquery-{version}.js",
				"~/Scripts/angular.min.js",
		        "~/Scripts/modernizr-*",
		        "~/Scripts/bootstrap.min.js",
				"~/Scripts/toastr.min.js",
				"~/Scripts/sweetalert.min.js",
		        "~/Content/AdminLTE/dist/js/app.min.js",
		        "~/Scripts/kendo/kendo.all.min.js",
		        "~/Scripts/kendo/kendo.aspnetmvc.min.js"));
            
            bundles.IgnoreList.Clear();
            BundleTable.EnableOptimizations = true;
        }
    }
}
