using System.Linq;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveLedgerDescriptionController : Controller
    {

        HRISEntities db =new HRISEntities();
        
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
            db.Entry(lc).State = System.Data.EntityState.Modified;
            db.SaveChanges();

            return Json(lc, JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult removeLedger(trefLeaveLedgerCode lc)
        {

            db.Entry(lc).State = System.Data.EntityState.Deleted;
            db.SaveChanges();


            return Json(lc, JsonRequestBehavior.AllowGet);

        }

    }
}