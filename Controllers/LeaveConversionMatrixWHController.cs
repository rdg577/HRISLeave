using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveConversionMatrixWHController : Controller
    {

        // Controller for Conversion Matrix - Leave Works Hour
        // Using trefLeaveWorkHoursConversionMatrix Table

        HRISEntities db = new HRISEntities();

        // GET: ConversionMatrix
        public ActionResult Index()
		{
			// if out of session, re-login
			if (Session["EIC"] == null) return RedirectToAction("Index", "Home");

			var EIC = Session["EIC"].ToString();

			// check if one of the HR BWD Officer
			var HROfficer = db.trefLeaveAdministrators.Where(r => r.Role.Equals("ModuleAdmin") && r.IsActive).SingleOrDefault(r => r.EIC == EIC);

			if (HROfficer != null) return View();

			Session["DeniedAccessMsg"] = "Oops! You have limited access on this page, please contact HR.";
			return RedirectToAction("UnauthorizedAccess", "Leave");
        }


        [HttpPost]
        public ActionResult addConversionMatrixWH(trefLeaveWorkHoursConversionMatrix cm)
        {
            db.trefLeaveWorkHoursConversionMatrices.Add(cm);
            db.SaveChanges();

            return Json(cm, JsonRequestBehavior.AllowGet);
        }


        [HttpPost]
        public ActionResult loadConversionMatrixWH()
        {
            var cm = db.trefLeaveWorkHoursConversionMatrices.OrderByDescending(id => id.Id).ToList();

            return Json(cm, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult validateConversionMatrixWH(trefLeaveWorkHoursConversionMatrix cm)
        {
            var q = db.trefLeaveWorkHoursConversionMatrices
                    .Where(r => r.Type == cm.Type && 
                            r.Num == cm.Num && 
                            r.DayEquivalent == cm.DayEquivalent);   

            if (q.Count() > 0)
            {
                return Json("exist", JsonRequestBehavior.AllowGet);
            }
            else
            {

                return Json("ok", JsonRequestBehavior.AllowGet);

            }

        }



        [HttpPost]
        public ActionResult updateConversionMatrixWH(trefLeaveWorkHoursConversionMatrix cm)
        {
            db.Entry(cm).State = System.Data.EntityState.Modified;
            db.SaveChanges();

            return Json(cm, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult deleteConversionMatrixWH(trefLeaveWorkHoursConversionMatrix cm)
        {
            db.Entry(cm).State = System.Data.EntityState.Deleted;
            db.SaveChanges();

            return Json(cm, JsonRequestBehavior.AllowGet);
        }



    }
}