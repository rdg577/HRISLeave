using System.Linq;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveCreditsEarnedController : Controller
    {

        // Controller for Credits Earned
        // Using trefLeaveCreditsEarned Table

        HRISEntities db = new HRISEntities();
        
        [HttpPost]
        public ActionResult addCreditsEarned(trefLeaveCreditsEarned cc)
        {
            db.trefLeaveCreditsEarneds.Add(cc);
            db.SaveChanges();

            return Json("success", JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult validateCreditsEarned(trefLeaveCreditsEarned cc)
        {
            var q = db.trefLeaveCreditsEarneds
                    .Where(r => r.Type == cc.Type &&
                            r.Vacation == cc.Vacation &&
                            r.Sick == cc.Sick &&
                            r.Num == cc.Num);

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
        public ActionResult loadCreditsEarned()
        {
            var cc = db.trefLeaveCreditsEarneds.OrderByDescending(id => id.Id).ToList(); ;
            return Json(cc, JsonRequestBehavior.DenyGet);
        }

        [HttpPost]
        public ActionResult updateCreditsEarned(trefLeaveCreditsEarned cc)
        {
            db.Entry(cc).State = System.Data.EntityState.Modified;
            db.SaveChanges();

            return Json(cc, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult deleteCreditsEarned(trefLeaveCreditsEarned cc)
        {
            db.Entry(cc).State = System.Data.EntityState.Deleted;
            db.SaveChanges();

            return Json(cc, JsonRequestBehavior.AllowGet);
        }
    }
}