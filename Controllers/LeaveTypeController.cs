using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveTypeController : Controller
    {
        HRISEntities db=new HRISEntities();
        // GET: LeaveType
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
        public ActionResult validateLeaveType(trefLeaveType lt)
        {
            var q = db.trefLeaveTypes.Where(r => r.Code==lt.Code || r.Description==lt.Description || r.NumCode==lt.NumCode);

            if (q.Count() > 0){
                return Json("error", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("ok", JsonRequestBehavior.AllowGet);
            }
        }

        [HttpPost]
        public ActionResult validateLeaveTypeUpdate(trefLeaveType lt)
        {
            var q = db.trefLeaveTypes.Where(r => r.Id!=lt.Id && (r.Code == lt.Code || r.Description == lt.Description || r.NumCode == lt.NumCode));

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
        public ActionResult saveNewLeaveType(trefLeaveType lt)
        {
           
            db.trefLeaveTypes.Add(lt);
            db.SaveChanges();

            return Json(lt,JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult updateLeaveType(trefLeaveType lt)
        {
	        db.Entry(lt).State = System.Data.EntityState.Modified;
            db.SaveChanges();

            return Json(lt, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult removeLeaveType(trefLeaveType lt)
        {

	        db.Entry(lt).State = System.Data.EntityState.Deleted;
            db.SaveChanges();


            return Json(lt, JsonRequestBehavior.AllowGet);
           
        }
     
        [HttpPost]
        public ActionResult loadLeaveType()
        {
            var lt = db.trefLeaveTypes.OrderByDescending(i => i.Id).ToList();

            return Json(lt,JsonRequestBehavior.DenyGet);
        }
    }
}