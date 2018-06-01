using System.Linq;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveConversionMatrixWHController : Controller
    {

        // Controller for Conversion Matrix - Leave Works Hour
        // Using trefLeaveWorkHoursConversionMatrix Table

        HRISEntities db = new HRISEntities();
        
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