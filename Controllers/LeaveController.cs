using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.InteropServices;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;
using Microsoft.Ajax.Utilities;
using Newtonsoft.Json;

namespace LeaveModule.Controllers
{
    public class LeaveController : Controller
    {
        private HRISEntities db = new HRISEntities();

        [ActionName("LeaveLedger")]
        public ActionResult LeaveCard()
        {
            // 27Feb2018@0900
            /*
             * Leave Ledger view
             */
            if (Session["EIC"] == null) return RedirectToAction("Index", "Home");

            return View("LeaveCard");
        }

        public JsonResult GetLeaveCardData()
        {
            // 26Feb2018@1624 GetLeaveCardData
            /*
             * Extract Leave Ledger Data
             * for Leave Card Generation
             */
            // can add logic that only the owner of the leave request can print preview
            var EIC = Session["EIC"].ToString();

            var data = db.spLeaveCardGenerate(EIC);

            return Json(data, JsonRequestBehavior.AllowGet);
        }

        public ActionResult SetTargetLeaveForPrintPreview(int recNo)
        {
            // 22Feb2018@2128 SetTargetLeaveForPrintPreview
            /*
             * Save Leave Request recNo into session for
             * Print Preview use
             */
            // can add logic that only the owner of the leave request can print preview
            var EIC = Session["EIC"].ToString();

            var leave = db.tLeaveApps.SingleOrDefault(r => r.recNo == recNo && r.EIC == EIC);
            if (leave != null)
            {
                Session["TargetLeaveRequest"] = leave.recNo;
            }

            return View();
        }

        public ActionResult ApproveLeaveRequest(int recNo, bool isApproved, string disapprovalRemark)
        {
            // 31Jan2018@2340
            if(Session["EIC"]==null) return RedirectToAction("Index", "Home");

            var EIC = Session["EIC"].ToString();

            try
            {
                var item = db.tLeaveApps.SingleOrDefault(r => r.recNo == recNo);

                if (item == null) return Content("<p>Ooops! Leave request cannot be found.");

                var timeStamp = DateTime.Now;

                item.DateApprovedDisapproved = timeStamp;       // timestamp of action
                item.IsApproved = isApproved;                   // either True or False
                item.datePosted = timeStamp;                    // same timestamp with date approved or disapproved
                if (!isApproved)
                {
                    item.DisapprovalRemark = disapprovalRemark;      
                }

                // post notification to applicant
                db.tLogDashboards.Add(new tLogDashboard
                {
                    ModuleName = "LEAVE",
                    CtrlNo = item.controlNo,
                    Status = isApproved ? "APPROVED" : "DISAPPROVED - " + disapprovalRemark,
                    Remarks = "Leave Application [" + item.periodFrom + " to " + item.periodTo + "].",
                    ActionEIC = EIC,                    // the actor is from HR Leave Admin who Recommend or Deny
                    DT = DateTime.Now
                });

                db.SaveChanges();

                return Content("0");    // success
            }
            catch (Exception e)
            {
                var errMsg = "<p>Ooops, something went wrong kaibigan.</p>" +
                                "<p>Source: " + e.Source + "<br/>" +
                                "Message: " + e.Message + "<br/>" +
                                "Inner Exception: " + e.InnerException.Message + "</p>";

                return Content(errMsg);
            }
        }
        public ActionResult LeaveRequestForApproval()
        {
            // 30Jan2018@1700

            // extract leave request for approval of the user
            if (Session["EIC"] == null) return RedirectToAction("Index", "Home");

            var EIC = Session["EIC"].ToString();

            var data = db.vLeaveApps
                            .Select(r => new
                            {
                                r.recNo,
                                r.dateFiled,
                                r.EIC,
                                r.leaveID,
                                r.LeaveCode,
                                r.LeaveDescription,
                                r.commutation,
                                r.periodFrom,
                                r.periodTo,
                                r.place,
                                r.location,
                                r.applyDay,
                                r.IsRecommendedAtOffice,
                                r.IsRecommendedAtHR,
                                r.IsApproved,
                                r.ApprovalEIC,
                                profile = db.vEmployeeCompleteFields.FirstOrDefault(g => g.EIC == r.EIC)
                            })
                            .OrderBy(r=>r.IsApproved)
                            .ThenBy(r => r.dateFiled)
                            .Where(r => r.IsRecommendedAtHR == true && r.IsApproved == null && r.ApprovalEIC == EIC);

            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }
        public ActionResult Approve()
        {
            // 01Feb2018@0335
            if (Session["EIC"] == null) return RedirectToAction("Index", "Home");

            var EIC = Session["EIC"].ToString();

            // check if one of the HR BWD Officer
            var HROfficer = db.trefLeaveAdministrators.Where(r => r.Role.Equals("ApprovingOfficer")).SingleOrDefault(r => r.EIC == EIC);
            return HROfficer != null ? (ActionResult) View() : RedirectToAction("Index", "Home");

        }

        public ActionResult HRLevelRecommendation(int recNo, bool isRecommended, string approvingEIC)
        {
            // 31Jan2018@1656
            if (Session["EIC"] == null) return Content("1");

            var EIC = Session["EIC"].ToString();
            try
            {
                var item = db.tLeaveApps.SingleOrDefault(r => r.recNo == recNo);

                if (item == null) return Content("<p>Ooops! Leave request cannot be found.");

                item.HRRecommendedByEIC = EIC;
                item.HRDateRecommended = DateTime.Now;    // timestamp of action
                item.IsRecommendedAtHR = isRecommended;   // either True or False
                if (isRecommended)
                {
                    item.ApprovalEIC = approvingEIC;      // EIC of the approving officer
                }
                else
                {
                    item.ApprovalEIC = null;      // no need of EIC of the approving officer
                }

                // post notification to applicant
                db.tLogDashboards.Add(new tLogDashboard
                {
                    ModuleName = "LEAVE",
                    CtrlNo = item.controlNo,
                    Status = isRecommended ? "RECOMMENDED" : "DENIED",
                    Remarks = "Leave Application [" + item.periodFrom + " to " + item.periodTo + "].",
                    ActionEIC = EIC,                    // the actor is from HR Leave Admin who Recommend or Deny
                    DT = DateTime.Now
                });

                db.SaveChanges();

                return Content("0");    // success
            }
            catch (Exception e)
            {
                var errMsg = "<p>Ooops, something went wrong kaibigan.</p>" +
                                "<p>Source: " + e.Source + "<br/>" +
                                "Message: " + e.Message + "<br/>" +
                                "Inner Exception: " + e.InnerException.Message + "</p>";

                return Content(errMsg);
            }

        }

        public ActionResult LeaveRecommendationAtHR(string officeCode)
        {
            // 30Jan2018@1700
            var officeEICs = db.vEmployeeCompleteFields.Where(r => r.officeCode == officeCode).Select(r=>r.EIC);
            var data = db.vLeaveApps
                                    .Select(r=>new
                                    {
                                        r.recNo,
                                        r.dateFiled,
                                        r.EIC,
                                        r.leaveID,
                                        r.LeaveCode,
                                        r.LeaveDescription,
                                        r.commutation,
                                        r.periodFrom,
                                        r.periodTo,
                                        r.place,
                                        r.location,
                                        r.applyDay,
                                        r.IsRecommendedAtOffice,
                                        r.IsRecommendedAtHR,
                                        r.IsApproved,
                                        r.IsVLUsedAsSL,
                                        profile=db.vEmployeeCompleteFields.FirstOrDefault(g => g.EIC == r.EIC)
                                    })
                                    .OrderBy(r=>r.dateFiled)
                                    .Where(r => officeEICs.Contains(r.EIC))
                                    //.Where(r=>r.IsRecommendedAtOffice==true && r.IsRecommendedAtHR==null);

                                    // Basta wala pa ma.approve-bahan pwede pa i-cancel or edit ang leave request by the
                                    // HR Leave Admin Officer
                                    .Where(r => r.IsRecommendedAtOffice == true && r.IsApproved == null);

            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        [HttpPost]
        public ActionResult OfficeLevelRecommendation(int recNo, bool isRecommended)
        {
            // 23Jan2018@1522
            if (Session["EIC"] == null) return Content("1");

            var EIC = Session["EIC"].ToString();
            try
            {
                var item = db.tLeaveApps.SingleOrDefault(r => r.recNo == recNo);
                
                if (item == null) return Content("<p>Ooops! Leave request cannot be found.");
                
                item.IsRecommendedAtOffice = isRecommended;
                item.DateAtOfficeRecommended = DateTime.Now;    // timestamp of action

                // post notification to applicant
                db.tLogDashboards.Add(new tLogDashboard
                {
                    ModuleName = "LEAVE",
                    CtrlNo = item.controlNo,
                    Status = isRecommended ? "RECOMMENDED" : "DENIED",
                    Remarks = "Leave Application [" + item.periodFrom + " to " + item.periodTo + "].",
                    ActionEIC = EIC,                            // the actor is the Office supervisor
                    DT = DateTime.Now
                });

                db.SaveChanges();

                return Content("0");    // success
            }
            catch (Exception e)
            {
                var errMsg = "<p>Ooops, something went wrong kaibigan.</p>" +
                                "<p>Source: " + e.Source + "<br/>" +
                                "Message: " + e.Message + "<br/>" +
                                "Inner Exception: " + e.InnerException.Message + "</p>";

                return Content(errMsg);
            }
        }

        public JsonResult LeaveRecommendationAtOffice()
        {
            // 23Jan2018@0100
            if(Session["EIC"]==null) return Json(null, JsonRequestBehavior.AllowGet);

            var EIC = Session["EIC"].ToString();

            var list = 
                db.vLeaveApps
                    .Select(r => new
                    {
                        r.recNo,
                        r.dateFiled, 
                        r.EIC, 
                        r.Fullname, 
                        r.OfficeRecommendedByEIC,
                        r.IsRecommendedAtOffice,
                        r.IsRecommendedAtHR,
                        profile = db.vEmployeeCompleteFields.Where(x => x.EIC == r.EIC),
                        // detalye = db.vLeaveApps.Where(x => x.EIC == r.EIC && x.dateFiled == r.dateFiled && x.IsRecommendedAtOffice == null)
                        detalye = db.vLeaveApps.Where(x => x.EIC == r.EIC && x.dateFiled == r.dateFiled && (x.IsRecommendedAtHR == null))
                    })
                    // .Where(r => r.OfficeRecommendedByEIC == EIC && r.IsRecommendedAtOffice == null)
                    .Where(r => r.OfficeRecommendedByEIC == EIC && r.IsRecommendedAtHR == null)
                    .DistinctBy(r => r.dateFiled);
            return Json(list.ToList(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult Recommend()
        {
            // 22Jan2018@0900
            if(Session["EIC"]==null) return RedirectToAction("Index", "Home");

            var EIC = Session["EIC"].ToString();

            // check if one of the HR BWD Officer
            var HROfficer = db.trefLeaveAdministrators.Where(r => r.Role.Equals("ModuleAdmin")).SingleOrDefault(r => r.EIC == EIC);
            return HROfficer != null ? View("HRRecommend") : View();
        }

        public ActionResult CancelLeaveRequest(int Id)
        {
            // 18Jan2018@0930
            var leave = db.tLeaveApps.SingleOrDefault(r => r.recNo == Id);
            if (leave != null)
            {
                db.tLeaveApps.Remove(leave);
                db.SaveChanges();
                return Content("1");    // successfull
            }
            return Content("0");
        }

        [HttpPost]
        public ActionResult ProcessLeaveRequest(IEnumerable<LeaveRequestModel> leaveRequests )
        {
            // 16jan2018@1200
            // Save leave requests of the applicant
            try
            {
                
                var EIC = Session["EIC"].ToString();
                var recommendingEIC = "";

                var dateFiled = DateTime.Now;

                foreach (var item in leaveRequests)
                {

                    recommendingEIC = item.recommendingOfficerEIC;

                    var tmpControlNo = EIC.Substring(0, 16) + (new Random().Next(1000,9999)).ToString();

                    var leaveRequest = new tLeaveApp
                    {
                        controlNo = tmpControlNo,
                        EIC = EIC,
                        leaveID = item.leaveTypeID,
                        periodFrom = item.dateBegin,
                        periodTo = item.dateEnd,
                        applyDay = item.daysAbsent,
                        isWithPay = item.isWithPay,
                        commutation = item.commutation,
                        place = item.place,
                        location = item.location,
                        remarks = item.remarks,
                        OfficeRecommendedByEIC = item.recommendingOfficerEIC,
                        // to make sure that leave request will have same timestamp
                        dateFiled = dateFiled,
                        IsVLUsedAsSL = item.isVLUsedAsSL
                    };

                    db.tLeaveApps.Add(leaveRequest);

                    // post notification to recommending officer at office level
                    db.tLogDashboards.Add(new tLogDashboard
                    {
                        ModuleName = "LEAVE",
                        CtrlNo = tmpControlNo,
                        Status = "Leave Application for RECOMMENDATION",
                        ActionEIC = recommendingEIC,
                        DT = DateTime.Now
                    });

                }

                db.SaveChanges();
            }
            catch (Exception e)
            {
                var errMsg = "<p>Ooops, something went wrong kaibigan.</p>" +
                                "<p>Source: " + e.Source + "<br/>" +
                                "Message: " + e.Message + "<br/>" +
                                "Inner Exception: " + e.InnerException.Message + "</p>";

                return Content(errMsg);
            }
            return Content("0");
        }

        public ActionResult MyLeave()
        {
            // if out of session, re-login
            if (Session["EIC"] == null) return RedirectToAction("Index", "Home");

            return View();
        }

        public ActionResult CreateRequest()
        {
            // if out of session, re-login
            if (Session["EIC"] == null) return RedirectToAction("Index", "Home");

            return View();
        }

        public ActionResult Settings()
        {
            // if out of session, re-login
            if (Session["EIC"] == null) return RedirectToAction("Index", "Home");

            var EIC = Session["EIC"].ToString();

            // check if one of the HR BWD Officer
            var HROfficer = db.trefLeaveAdministrators.Where(r => r.Role.Equals("ModuleAdmin")).SingleOrDefault(r => r.EIC == EIC);

            if (HROfficer == null)
            {
                ViewBag.ModuleAdmin = false;
            }
            else
            {
                ViewBag.ModuleAdmin = true;
            }
            return View();
        }

        public ActionResult ForwardCreditBalance(string EIC, string AsOf, string VLBalanceForwarded, string SLBalanceForwarded)
        {
            // if out of session, re-login
            if (Session["EIC"] == null)
            {
                var errMsg = "<p>Ooops, something went wrong kaibigan. Session timeout, please login again.</p>";
                return Content(errMsg);
            }

            // check for double entry of EIC
            var notExist = db.tLeaveBalanceForwardeds.SingleOrDefault(o => o.EIC == EIC) == null ? true : false;

            if (notExist)
            {
                try
                {
                    var sessionEIC = (string) (Session["EIC"]);

                    // STORE FORWARDED BALANCE AS POINT OF ORIGIN
                    var t = new tLeaveBalanceForwarded();
                    t.EIC = EIC;
                    t.AsOf = Convert.ToDateTime(AsOf);
                    t.VLBalanceForwarded = Convert.ToDouble(VLBalanceForwarded);
                    t.SLBalanceForwarded = Convert.ToDouble(SLBalanceForwarded);
                    t.TotalBalanceForwarded = (Convert.ToDouble(VLBalanceForwarded) + Convert.ToDouble(SLBalanceForwarded));
                    t.EICForwardedBy = sessionEIC;
                    t.DateForwarded = DateTime.Now;

                    db.tLeaveBalanceForwardeds.Add(t);

                    // STORE FORWARDED BALANCE IN THE MASTER LEDGER
                    var m = new tLeaveAppLedgerMaster();
                    m.EIC = EIC;
                    m.SLCreditBalance = Convert.ToDouble(SLBalanceForwarded);
                    m.VLCreditBalance = Convert.ToDouble(VLBalanceForwarded);
                    m.Timestamp=DateTime.Now;
                    db.tLeaveAppLedgerMasters.Add(m);

                    // STORE FORWARDED BALANCE IN THE LEDGER
                    // VACATION LEAVE
                    var l = new tLeaveAppLedger();
                    l.EIC = EIC;
                    l.LedgerCode = "101";
                    l.Value = Convert.ToDouble(VLBalanceForwarded);
                    l.Timestamp = Convert.ToDateTime(AsOf);
                    db.tLeaveAppLedgers.Add(l);

                    // SICK LEAVE
                    var d = new tLeaveAppLedger();
                    d.EIC = EIC;
                    d.LedgerCode = "102";
                    d.Value = Convert.ToDouble(SLBalanceForwarded);
                    d.Timestamp = Convert.ToDateTime(AsOf);
                    db.tLeaveAppLedgers.Add(d);

                    db.SaveChanges();
                }
                catch (Exception e)
                {
                    var errMsg = "<p>Ooops, something went wrong kaibigan.</p>" +
                                 "<p>Source: " + e.Source + "<br/>" +
                                 "Message: " + e.Message + "<br/>" +
                                 "Inner Exception: " + e.InnerException.Message + "</p>";

                    return Content(errMsg);
                }

                return Content("0");
            }
            else
            {
                return Content("Ooops! Selected employee already exist...");
            }
        }

        public ActionResult LedgerPosting()
        {
            // This is applicable only to employees with forwarded balance on leave credits.

            // This action will post entries to leave ledger based on DTR Submitted, such as
            // 1. Leave Credits earned - VL and SL
            // 2. Tardy and Undertime
            // 3. Leave
            
            var DTRsAtLeaveLedger = db.tLeaveAppLedgers.Select(r => r.DTRId).Distinct();
            var EICsWithForwardedLeaveCredits = db.tLeaveBalanceForwardeds.Select(r => r.EIC);
            var DTRs = db.tAttDTRs.Where(r => EICsWithForwardedLeaveCredits.Contains(r.EIC));

            // select all DTRs that is not yet processed
            var DTRsForPosting = DTRs.Where(r => !DTRsAtLeaveLedger.Contains(r.DtrID)).OrderBy(r=>r.EIC).ThenBy(r => r.Year).ThenBy(r => r.Month).ThenBy(r => r.Period);

            
            
            try
            {
                // get a list of EICs
                var EICs = EICsWithForwardedLeaveCredits.Distinct().ToList();
                foreach (var EIC in EICs)
                {
                    var PetsaKaron = DateTime.Now;

                    // set balances to 0 in every employee
                    double VLBalance = 0.0, SLBalance = 0.0;

                    // get the standing credit balance
                    tLeaveAppLedgerMaster LastBalanceRecord = null;

                    LastBalanceRecord = db.tLeaveAppLedgerMasters.OrderByDescending(r => r.Id).First(r => r.EIC == EIC);

                    // null, kung wala pa jud ma.proseso ang iyang dtr para sa leave ledger
                    if (LastBalanceRecord != null)
                    {
                        // get the date the balance has been forwarded which
                        // will be used as the base date for query on
                        // DTRs for Posting
                        var balanceForwardedRec = db.tLeaveBalanceForwardeds.Where(r => r.EIC == EIC).Select(r => r.AsOf).Take(1).ToList();
                        var baseDate = balanceForwardedRec[0].Date;

                        // test if baseDate is the last day of the year
                        var baseDateIsLastDayOfTheYear = baseDate.Month == 12 && baseDate.Day == 31;

                        // create a list of DTR for Posting
                        List<tAttDTR> DTRListForPost = null;

                        // create query as per baseDate: add 1 month if baseDateIsLastDayOfTheYear is true else as is
                        if (baseDateIsLastDayOfTheYear)
                        {
                            // baseDate: add 1 month if baseDateIsLastDayOfTheYear is true
                            baseDate = baseDate.AddMonths(1);
                            DTRListForPost = (DTRsForPosting
                               .Where(r => (r.EIC == EIC) && (r.dtStamp > baseDate))).ToList();
                        }
                        else
                        {
                            // baseDate: as is, if baseDateIsLastDayOfTheYear is false
                            DTRListForPost = (DTRsForPosting
                               .Where(r => (r.EIC == EIC) && (r.dtStamp > baseDate))).ToList();
                        }
                        
                        VLBalance += LastBalanceRecord.VLCreditBalance;
                        SLBalance += LastBalanceRecord.SLCreditBalance;

                        
                        foreach (var DTR in DTRListForPost)
                        {
                            var LeaveCreditEarned = 0.0;
                            var VLCreditEarned = 0.0;
                            var SLCreditEarned = 0.0;

                            int year = 0, month = 0;

                            year = DTR.Year ?? PetsaKaron.Year;
                            month = DTR.Month ?? PetsaKaron.Month;

                            // original base date
                            baseDate = balanceForwardedRec[0].Date;

                            /***** LEAVE CREDITS! LEAVE CREDITS! LEAVE CREDITS! LEAVE CREDITS! *****/
                            /*
                             * check if DTR is the first DTR or MONTH of the service
                             */
                            if (DTR.Year == baseDate.Year && DTR.Month == baseDate.Month)
                            {
                                var dateStarted = balanceForwardedRec[0].Date;

                                // get the number of days he/she works
                                var totalDays = 0;

                                if (DTR.Period == 0)
                                {   // Zero - is FULL MONTH
                                    var lastDayOfMonth = dateStarted.AddMonths(1).AddDays(-1).Day;
                                    var dateEnd = new DateTime(year, month, lastDayOfMonth);

                                    totalDays = (int)(dateEnd - dateStarted).TotalDays;
                                }
                                else if (DTR.Period == 1)
                                {   // 1ST HALF MONTH
                                    var dateEnd = new DateTime(year, month, 15);

                                    totalDays = (int)(dateEnd - dateStarted).TotalDays;
                                }
                                else if (DTR.Period == 2)
                                {   // 2ND HALF MONTH
                                    var dateEnd = new DateTime(year, month, 30);

                                    totalDays = (int)(dateEnd - dateStarted).TotalDays;
                                }

                                // get equivalent days from matrix
                                var matrixRecord =
                                    db.trefLeaveCreditsEarneds.Where(r => r.Type.Equals("DAILY"))
                                        .SingleOrDefault(r => r.Num == totalDays);

                                VLCreditEarned = matrixRecord != null ? matrixRecord.Vacation : 0;
                                SLCreditEarned = matrixRecord != null ? matrixRecord.Sick : 0;

                            }
                            else // it is the first MONTH of the service
                            {
                                // compute leave credits
                                LeaveCreditEarned = DTR.Period == 0 ? 2.5 : 1.25;
                                VLCreditEarned = LeaveCreditEarned / 2.0;
                                SLCreditEarned = LeaveCreditEarned / 2.0;
                            }

                            // post VL to ledger
                            db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                            {
                                EIC = DTR.EIC,
                                DTRId = DTR.DtrID,
                                LedgerCode = "103",
                                Value = Convert.ToDouble(VLCreditEarned),
                                Timestamp = PetsaKaron
                            });
                            
                            // post SL to ledger
                            db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                            {
                                EIC = DTR.EIC,
                                DTRId = DTR.DtrID,
                                LedgerCode = "104",
                                Value = Convert.ToDouble(SLCreditEarned),
                                Timestamp = PetsaKaron
                            });

                            // update VL/SL Balance
                            VLBalance += VLCreditEarned;
                            SLBalance += SLCreditEarned;


                            /***** TARDINESS! UNDERTIME! TARDINESS! UNDERTIME! TARDINESS! UNDERTIME! *****/
                            /*
                             * Need to convert the minutes into its equivalent
                             * based on the matrix given.
                             */
                            var totalMinutesTU = DTR.Tardy + DTR.Undertime;

                            if (totalMinutesTU > 0)
                            {
                                var equivalentDaysTU = getCSCEquivalentDays(totalMinutesTU);

                                // determine if there is available VL credit for 
                                // **** TU WITH or WITHOUT PAY
                                if ((VLBalance + VLCreditEarned - equivalentDaysTU) < 0)
                                {
                                    // surely TU WITHOUT PAY...hurot na lagi
                                    db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                                    {
                                        EIC = DTR.EIC,
                                        DTRId = DTR.DtrID,
                                        LedgerCode = "106B1",
                                        Value = Convert.ToDouble(equivalentDaysTU),
                                        Timestamp = PetsaKaron
                                    });
                                }
                                else
                                {
                                    // surely TU WITH PAY...daghan pa lagi
                                    db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                                    {
                                        EIC = DTR.EIC,
                                        DTRId = DTR.DtrID,
                                        LedgerCode = "106A1",
                                        Value = Convert.ToDouble(equivalentDaysTU),
                                        Timestamp = PetsaKaron
                                    });
                                }

                                // update balances by deducting the tardy and undertime equivalent days
                                //VLBalance += (double)(VLCreditEarned - equivalentDaysTU);
                                //SLBalance += SLCreditEarned;   
                                VLBalance -= equivalentDaysTU;
                            }


                            /***** LEAVES! LEAVES! LEAVES! LEAVES! LEAVES! LEAVES! *****/
                            // 1. Determine DTR Period
                            DateTime? dtrDateBegin = null, dtrDateEnd = null;

                            switch (DTR.Period)
                            {
                                case 0:
                                    // FULL MONTH
                                    dtrDateBegin = new DateTime(year, month, 1);
                                    dtrDateEnd = new DateTime(year, month, dtrDateBegin.Value.AddMonths(1).AddDays(-1).Day);
                                    break;
                                case 1:
                                    // 1ST MONTH
                                    dtrDateBegin = new DateTime(year, month, 1);
                                    dtrDateEnd = new DateTime(year, month, 15);
                                    break;
                                case 2:
                                    // 2nd MONTH
                                    dtrDateBegin = new DateTime(year, month, 1);

                                    var tempDate = new DateTime(year, month, 1);
                                    dtrDateEnd = new DateTime(year, month, tempDate.AddMonths(1).AddDays(-1).Day);
                                    break;
                            }

                            // 2. Fetch all posted and approved leave based on the DTR Period
                            var ApprovedLeaves =
                                db.vLeaveApps.Where(r=>r.IsApproved==true).Where(
                                    r => r.EIC == EIC && (r.periodFrom >= dtrDateBegin && r.periodTo <= dtrDateEnd))
                                    .OrderBy(r => r.periodFrom).ToList();

                            foreach (var leave in ApprovedLeaves)
                            {
                                var daysAbsent = leave.applyDay ?? 0;
                                if (leave.leaveID.Equals("40301"))   // VL
                                {
                                    // Update VL balance
                                    VLBalance -= daysAbsent;

                                    if (VLBalance < 0)
                                    {
                                        // surely VACATION LEAVE WITHOUT PAY...hurot na lagi
                                        db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                                        {
                                            EIC = DTR.EIC,
                                            DTRId = DTR.DtrID,
                                            LedgerCode = "105B1",
                                            Value = Convert.ToDouble(daysAbsent),
                                            Referrence = Convert.ToString(leave.recNo),
                                            Timestamp = PetsaKaron
                                        });
                                    }
                                    else
                                    {
                                        // surely VACATION LEAVE WITH PAY...daghan pa lagi
                                        db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                                        {
                                            EIC = DTR.EIC,
                                            DTRId = DTR.DtrID,
                                            LedgerCode = "105A1",
                                            Value = Convert.ToDouble(daysAbsent),
                                            Referrence = Convert.ToString(leave.recNo),
                                            Timestamp = PetsaKaron
                                        });
                                    }
                                }
                                else if (leave.leaveID.Equals("40302")) // SL
                                {
                                    // Update SL balance
                                    SLBalance -= daysAbsent;

                                    if (SLBalance < 0)
                                    {
                                        // surely SICK LEAVE WITHOUT PAY...hurot na lagi
                                        db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                                        {
                                            EIC = DTR.EIC,
                                            DTRId = DTR.DtrID,
                                            LedgerCode = "105B2",
                                            Value = Convert.ToDouble(daysAbsent),
                                            Referrence = Convert.ToString(leave.recNo),
                                            Timestamp = PetsaKaron
                                        });
                                    }
                                    else
                                    {
                                        // surely SICK LEAVE WITH PAY...daghan pa lagi
                                        db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                                        {
                                            EIC = DTR.EIC,
                                            DTRId = DTR.DtrID,
                                            LedgerCode = "105A2",
                                            Value = Convert.ToDouble(daysAbsent),
                                            Referrence = Convert.ToString(leave.recNo),
                                            Timestamp = PetsaKaron
                                        });
                                    }
                                }
                                else    // Other Type of Leave
                                {
                                    db.tLeaveAppLedgers.Add(new tLeaveAppLedger
                                    {
                                        EIC = DTR.EIC,
                                        DTRId = DTR.DtrID,
                                        LedgerCode = "105C",
                                        Value = Convert.ToDouble(daysAbsent),
                                        Referrence = Convert.ToString(leave.recNo),
                                        Timestamp = PetsaKaron
                                    });
                                }

                                
                            }
                            
                            // update Master Ledger and post it to the master ledger
                            db.tLeaveAppLedgerMasters.Add(new tLeaveAppLedgerMaster
                            {
                                EIC = DTR.EIC,
                                DTRId = DTR.DtrID,
                                SLCreditBalance = SLBalance,
                                VLCreditBalance = VLBalance,
                                Timestamp = PetsaKaron
                            });
                            db.SaveChanges();
                        } // end - foreach (var DTR in DTRListForPost)
                    }
                }
            }
            catch (Exception e)
            {
                var errMsg = "<p>Ooops, something went wrong kaibigan.</p>" +
                                "<p>Source: " + e.Source + "<br/>" +
                                "Message: " + e.Message + "<br/>" +
                                "Inner Exception: " + e.InnerException.Message + "</p>";

                return Content(errMsg);
            }



            return Content("0");
        }

        public JsonResult LedgerData()
        {
            var EIC = Session["EIC"].ToString();

            var data = db.vLeaveMasterLedgers.OrderByDescending(r => r.Year).ThenByDescending(r => r.Month).Where(r => r.EIC == EIC);
            
            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult History()
        {
            // 14jan2017 2300hrs
            // if out of session, re-login
            if (Session["EIC"] == null) return Json(null, JsonRequestBehavior.AllowGet);

            var EIC = Session["EIC"].ToString();
            var data = db.vLeaveApps.Where(r => r.EIC == EIC).OrderByDescending(r => r.periodFrom);
            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmployeeLeaveBalances()
        {
            // 14jan2017 2200hrs
            var dateBegin = new DateTime(DateTime.Now.Year, 1, 1);
            var dateEnd = DateTime.Now;

            // if out of session
            if (Session["EIC"] == null) return Json(null, JsonRequestBehavior.AllowGet);

            var EIC = Session["EIC"].ToString();
            // uses the store procedure that computes leave balances for the on-the-fly checking
            var data = db.spEmployeeLeaveBalance(EIC, dateBegin, dateEnd, "40303", "40304", "40306", "40307", "40308",
                "40309", "40310", "40311", "40312", "40313", "40314", "40315");
            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        public JsonResult EmployeeLeaveBalancesInDateRange(string dateBegin, string dateEnd)
        {
            // if out of session, re-login
            if (Session["EIC"] == null) return Json(null, JsonRequestBehavior.AllowGet);

            var EIC = Session["EIC"].ToString();
            var data = db.spEmployeeLeaveBalance(EIC, Convert.ToDateTime(dateBegin), Convert.ToDateTime(dateEnd), "40303", "40304", "40306", "40307", "40308",
                "40309", "40310", "40311", "40312", "40313", "40314", "40315");
            return Json(data.ToList(), JsonRequestBehavior.AllowGet);
        }

        // Function that will return the equivalent days
        public double getCSCEquivalentDays(int? minutesTardyUndertime)
        {
            if (minutesTardyUndertime == null) return 0.0;

            const int workHoursPerDay = 8;
            const int minutesPerHour = 60;

            int daysTU = 0, days_rem = 0, hoursTU = 0, hours_rem = 0, minutesTU = 0;

            daysTU      = (int) (minutesTardyUndertime / (workHoursPerDay * minutesPerHour));
            hoursTU     = (int) ((minutesTardyUndertime % (workHoursPerDay * minutesPerHour)) / minutesPerHour);
            minutesTU   = (int) (((minutesTardyUndertime % (workHoursPerDay * minutesPerHour)) % minutesPerHour) % minutesPerHour);

            // fetch days equivalent from the matrix
            var hour = db.trefLeaveWorkHoursConversionMatrices.Where(r => r.Type.Equals("HOURS")).SingleOrDefault(r => r.Num == hoursTU);
            var minute = db.trefLeaveWorkHoursConversionMatrices.Where(r => r.Type.Equals("MINUTES")).SingleOrDefault(r => r.Num == minutesTU);

            var hoursEquivalent = hour != null ? hour.DayEquivalent : 0;
            var minutesEquivalent = minute != null ? minute.DayEquivalent : 0;

            return (daysTU + hoursEquivalent + minutesEquivalent);
        }
        
    }

    public class LeaveRequestModel
    {
        public int commutation { get; set; }
        public DateTime dateBegin { get; set; }
        public DateTime dateEnd { get; set; }
        public int daysAbsent { get; set; }
        public bool isWithPay { get; set; }
        public string leaveDescription { get; set; }
        public string leaveTypeID { get; set; }
        public string location { get; set; }
        public string place { get; set; }
        public string recommendingOfficerEIC { get; set; }
        public string remarks { get; set; }
        public bool isVLUsedAsSL { get; set; }
    }
}