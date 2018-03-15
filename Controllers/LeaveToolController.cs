using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveToolController : Controller
    {
        private HRISEntities db = new HRISEntities();

        public JsonResult GetLeaveCredit(int days)
        {
            // 15Mar2018@0524
            // fetch and return equivalent leave credit
            var numMonths = days/30;
            var numDays = days%30;

            // query database
            var month = db.trefLeaveCreditsEarneds.SingleOrDefault(r => r.Type.Equals("MONTHLY") && r.Num == numMonths);
            var daily = db.trefLeaveCreditsEarneds.SingleOrDefault(r => r.Type.Equals("DAILY") && r.Num == numDays);

            var m = month != null ? (month.Vacation + month.Sick) : 0;
            var d = daily != null ? (daily.Vacation + daily.Sick) : 0;

            return Json((m + d), JsonRequestBehavior.AllowGet);
        }

        public JsonResult LeaveApprovingOfficer()
        {
            // 31Jan2018@0944
            var data = db.trefLeaveAdministrators
                            .Select(r=>new
                            {
                                r.EIC,
                                r.Role,
                                fullnameLast = db.vEmployeeCompleteFields.FirstOrDefault(g => g.EIC == r.EIC).fullnameLast
                            }).Where(r => r.Role.Equals("ApprovingOfficer"));
            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult OfficeCodeAndName()
        {
            // 29Jan2018@1521
            var data = db.tappOffices.OrderBy(r => r.officeName);
            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult CheckLeaveScheduleConflict(string strBegin, string strEnd)
        {
            // 17Jan2018@1600
            var EIC = Session["EIC"].ToString();

            var dateBegin = Convert.ToDateTime(strBegin);
            var dateEnd = Convert.ToDateTime(strEnd);

            // check existing leave request based on leave period
            var existingUnapprovedLeaves =
                db.tLeaveApps.Where(
                    r => r.EIC == EIC && ((dateBegin >= r.periodFrom && dateBegin <= r.periodTo) || (dateEnd >= r.periodFrom && dateEnd <= r.periodTo))).ToList();
            if (existingUnapprovedLeaves.Count > 0) return Content("1");
            return Content("0");
        }

        public JsonResult LeaveCodesAndAllotment()
        {
            var data = db.vrefLeaveTypeAndAllotments.OrderBy(r => r.Description);
            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult Holidays()
        {
            var year = DateTime.Now.Year;

            var holidays = db.trefHolidays.OrderBy(r => r.month).ThenBy(r => r.day);
            List<object> listHolidays = new List<object>();
            foreach (var holiday in holidays)
            {
                var month = holiday.month ?? 0;
                var day = holiday.day ?? 0;
                var petsa = new DateTime(year, month, day).ToString("MM-dd-yyyy");
                var description = holiday.remarks.ToUpper();
                dynamic obj = new  {petsa, description};
                listHolidays.Add(obj);
            }
            dynamic list = listHolidays.ToArray();
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public JsonResult HolidayDates()
        {
            var year = DateTime.Now.Year;

            var holidays = db.trefHolidays.OrderBy(r => r.month).ThenBy(r => r.day);
            List<string> listHolidays = new List<string>();
            foreach (var holiday in holidays)
            {
                var month = holiday.month ?? 0;
                var day = holiday.day ?? 0;
                var petsa = new DateTime(year, month, day).ToString("MM-dd-yyyy");
                listHolidays.Add(petsa);
            }
            dynamic list = listHolidays != null ? listHolidays.ToArray() : null;
            return Json(list, JsonRequestBehavior.AllowGet);
        }

        public ActionResult ServerDateTime()
        {
            return Content(DateTime.Now.ToString());
        }
        public JsonResult LeaveTypes()
        {
            dynamic data =
                db.trefLeaveTypes.OrderBy(o => o.NumCode)
                    .Where(w => w.IsActive)
                    .Select(s => new { s.Id, s.Description, s.NumCode })
                    .ToList();
            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmployeeEIC()
        {
            dynamic data =
                db.vEmployeeCompleteFields.OrderBy(o => o.lastName).Select(s => new {s.EIC, s.fullnameLast}).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult DepartmentOfficersEIC()
        {
            var empEIC = Session["EIC"].ToString();

            var empData =
                db.vEmployeeCompleteFields.SingleOrDefault(r => r.EIC == empEIC);

            string empGroupID = null;
            if (empData != null) empGroupID = empData.empGroupCode;

            dynamic data =
                db.vDeptOfficers.OrderBy(r=>r.fullnameLast).Where(r => r.groupID == empGroupID).Select(r => new {r.EIC, r.fullnameLast}).ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public JsonResult ApprovingOfficersEIC()
        {
            var empEIC = Session["EIC"].ToString();

            var empData =
                db.vEmployeeCompleteFields.SingleOrDefault(r => r.EIC == empEIC);

            string empGroupID = null;
            if (empData != null) empGroupID = empData.empGroupCode;

            dynamic data =
                db.vApprvOfficers.OrderBy(r => r.fullnameLast)
                    .Where(r => r.empGroupCode == empGroupID)
                    .Select(r => new {r.EIC, r.fullnameLast})
                    .ToList();

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        /*
         * User Profile Image
         */
        public ActionResult UserImage(string id)
        {
            var cover = GetImageFromDataBase(id);
            return cover != null ? File(cover, "image/jpeg") : null;
        }

        public byte[] GetImageFromDataBase(string Id)
        {
            var q = from temp in db.tapp212Image
                    where temp.EIC == Id
                    select temp.imageData;
            byte[] cover = q.SingleOrDefault();
            return cover;
        }
    }
}