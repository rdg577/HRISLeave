using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveConversionMatrixDPController : Controller
    {

        // Controller for Conversion Matrix Days Present Function
        // Using trefLeaveCreditsForZeroVLCredit Table

        HRISEntities db = new HRISEntities();

        // GET: ConversionMatrixDP
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
        public ActionResult addConversionMatrixDP(trefLeaveCreditForZeroVLCredit cm)
        {
            db.trefLeaveCreditForZeroVLCredits.Add(cm);
            db.SaveChanges();

            return Json(cm, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult validateConversionMatrixDP(trefLeaveCreditForZeroVLCredit cm)
        {
            var q = db.trefLeaveCreditForZeroVLCredits
                    .Where(r => r.DaysPresent == cm.DaysPresent &&
                            r.DaysLWOP == cm.DaysLWOP &&
                            r.LeaveCreditsEarned == cm.LeaveCreditsEarned);

            if (q.Count() > 0)
            {
                return Json("exist", JsonRequestBehavior.AllowGet);
            }else{
                return Json("ok", JsonRequestBehavior.AllowGet);
            }
            
        }


        [HttpPost]
        public JsonResult loadConversionMatrixDP()
        {
            var ce = db.trefLeaveCreditForZeroVLCredits.OrderByDescending(id => id.Id).ToList();

            return Json(ce, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult updateConversionMatrixDP(trefLeaveCreditForZeroVLCredit cm)
        {
            db.Entry(cm).State = System.Data.EntityState.Modified;
            db.SaveChanges();

            return Json(cm, JsonRequestBehavior.AllowGet);

        }

        [HttpPost]
        public ActionResult deleteConversionMatrixDP(trefLeaveCreditForZeroVLCredit cm)
        {
            db.Entry(cm).State = System.Data.EntityState.Deleted;
            db.SaveChanges();

            return Json(cm, JsonRequestBehavior.AllowGet);
        }

    }
}