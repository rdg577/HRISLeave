using System.Linq;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveTypeController : Controller
    {
        HRISEntities db=new HRISEntities();
        
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