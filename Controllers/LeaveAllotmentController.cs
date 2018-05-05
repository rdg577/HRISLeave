using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveAllotmentController : Controller
    {
        HRISEntities db = new HRISEntities();
        // GET: Allotment
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
        public ActionResult loadAllotment()
        {
            var alot = (from a in db.trefLeaveAllotments
                        join b in db.trefLeaveTypes on
                           a.LeaveCode equals b.NumCode
                        select new { a.Id, a.LeaveCode, b.Description, b.Code, a.Value, a.IsCalendarDays, b.IsActive }
                            ).OrderByDescending(a => a.Id).ToList();

            

            return Json(alot, JsonRequestBehavior.DenyGet);
        }
      

        [HttpPost]
        public ActionResult loadcboAlot()
        {
            var al= (from a in db.trefLeaveTypes
                         select new { a.Code, a.NumCode, a.Description }
                        ).OrderBy(a => a.Description).ToList();

            return Json(al, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult validateAlot(trefLeaveAllotment a)
        {
            var q = db.trefLeaveAllotments.Where(r =>r.Id != a.Id && (r.LeaveCode == a.LeaveCode));

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
        public ActionResult saveNewAlot(trefLeaveAllotment a)
        {
            db.trefLeaveAllotments.Add(a);
            db.SaveChanges();

            return Json(a, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult updateAlot(trefLeaveAllotment a)
        {
            db.Entry(a).State = System.Data.EntityState.Modified;
            db.SaveChanges();

            return Json(a, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult removeAlot(trefLeaveAllotment a)
        {

            db.Entry(a).State = System.Data.EntityState.Deleted;
            db.SaveChanges();


            return Json(a, JsonRequestBehavior.AllowGet);

        }

    }
}