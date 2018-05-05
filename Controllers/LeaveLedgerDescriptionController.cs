using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveLedgerDescriptionController : Controller
    {

        HRISEntities db =new HRISEntities();

        // GET: LedgerDescription
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
        public ActionResult loadLedger()
        {
            var lc =db.trefLeaveLedgerCodes.OrderByDescending(i => i.Id).ToList();
               
            return Json(lc,JsonRequestBehavior.DenyGet);
        }


        [HttpPost]
        public ActionResult validateLedger(trefLeaveLedgerCode lc)
        {
            var q = db.trefLeaveLedgerCodes.Where(r => r.Id != lc.Id && (r.Code == lc.Code || r.Description == lc.Description));

            if (q.Count() > 0)
            {
                return Json("error", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("ok", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult saveNewLedger(trefLeaveLedgerCode lc)
        {

            db.trefLeaveLedgerCodes.Add(lc);
            db.SaveChanges();

            return Json(lc, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult updateLedger(trefLeaveLedgerCode lc)
        {
	        db.Entry(lc).State = EntityState.Modified;
            db.SaveChanges();

            return Json(lc, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult removeLedger(trefLeaveLedgerCode lc)
        {

	        db.Entry(lc).State = EntityState.Deleted;
            db.SaveChanges();


            return Json(lc, JsonRequestBehavior.AllowGet);

        }

    }
}