using System.Linq;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveConversionMatrixDPController : Controller
    {

        // Controller for Conversion Matrix Days Present Function
        // Using trefLeaveCreditsForZeroVLCredit Table

        HRISEntities db = new HRISEntities();
        
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