﻿using System.Linq;
using System.Web.Mvc;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
    public class LeaveAdminController : Controller
    {
        // GET: Admin
        HRISEntities db = new HRISEntities();

        public ActionResult loadAdmin()
        {
            var ad = (from a in db.trefLeaveAdministrators
                        join b in db.vEmployeeCompleteFields on a.EIC equals b.EIC
                        where a.Role != "SystemAdmin"
                        select new
                        {
                            a.Id,
                            a.EIC,
                            a.Role,
                            a.IsActive,
                            b.firstName,
                            b.lastName,
                            b.middleName,
                            b.fullDescription,
                            b.fullnameLast,
                            b.officeName
                        }).OrderBy(a => a.lastName).ToList();
            return Json(ad, JsonRequestBehavior.AllowGet);
        }

        public ActionResult loadAllEmp()
        {
            var le = (from a in db.vEmployeeCompleteFields
                      select new { a.EIC, a.fullnameLast }
                        ).OrderBy(a => a.fullnameLast).ToList().Where(a => a.EIC != null)
                        .Select(s => new SelectListItem() { Value =s.fullnameLast.ToString(),Text=s.EIC.ToString() });

            // var employee = db1.tRSPappEmployees.ToList().OrderBy(o => o.fullnameFirst).Where(a => a.EIC != null)
            //  .Select(s => new SelectListItem() { Value = s.EIC + " - " + s.fullnameFirst.ToString(), Text = s.EIC.ToString() });


            return Json(le, JsonRequestBehavior.AllowGet);
        }

        public ActionResult getData(string full)
        {
            
            var le = (from a in db.vEmployeeCompleteFields
                      select new { a.EIC, a.fullnameLast, a.fullDescription, a.officeName })
                      .Where(a => a.EIC != null).SingleOrDefault(a => a.fullnameLast == full.ToUpper());

            if (le != null)
            {
                return Json(new
                {
                    eic = le.EIC,
                    fullName = le.fullnameLast,
                    position = le.fullDescription,
                    officeName = le.officeName
                }, JsonRequestBehavior.AllowGet);
            }else{
                 return Json("ok",JsonRequestBehavior.AllowGet);
            }
               
           
        }



        //Retreiving of Image
        public ActionResult RetrieveImage(string id)
        {
            byte[] cover = GetImageFromDataBase(id);
            if (cover != null)
            {
                return File(cover, "image/jpeg");
            }
            else
            {
                //return null;  
                return File("~/Content/leave/img/default-user.png", "image/png");
            }
        }

        public byte[] GetImageFromDataBase(string Id)
        {

            var q = from temp in db.tapp212Image where temp.EIC == Id select temp.imageData;
            byte[] cover = q.SingleOrDefault();
            return cover;
        }

        public ActionResult loadRole()
        {
            var role = (from a in db.trefLeaveAdministrators
                        where a.Role != "SystemAdmin"
                        select new {a.Role }).Select(a => a.Role).Distinct();
            return Json(role,JsonRequestBehavior.AllowGet);
        }


        public ActionResult validateAdmin(trefLeaveAdministrator a)
        {
            var q = db.trefLeaveAdministrators.Where(r => r.Id != a.Id && (r.EIC == a.EIC));

            if (q.Any())
            {
                return Json("error", JsonRequestBehavior.AllowGet);
            }
            else
            {
                return Json("ok", JsonRequestBehavior.AllowGet);
            }
        }

        public ActionResult saveNewAdmin(trefLeaveAdministrator a)
        {
            db.trefLeaveAdministrators.Add(a);
            db.SaveChanges();

            return Json(a, JsonRequestBehavior.AllowGet);
        }
        public ActionResult updateAdmin(trefLeaveAdministrator a)
        {
            //a.Role = a.Role.Replace(" ", "");
            db.Entry(a).State = System.Data.EntityState.Modified;
            db.SaveChanges();

            return Json(a, JsonRequestBehavior.AllowGet);
        }

    }
}