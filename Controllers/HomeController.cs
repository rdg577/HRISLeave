using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using LeaveModule.Models;
using Security;


namespace LeaveModule.Controllers
{
    public class HomeController : Controller
    {
        GENERALEntities dbGeneral = new GENERALEntities();

        public ActionResult Logout()
        {
            try
            {
                // strore EIC to session
                Session["EIC"] = null;

                return RedirectToAction("Index");
            }
            catch (Exception e)
            {
                return Content(e.Message);
            }
        }

        [HttpPost]
        public ActionResult LoginEIC(string EIC)
        {
            try
            {
                // strore EIC to session
                Session["EIC"] = EIC;

                return Content("0");
            }
            catch (Exception e)
            {
                return Content(e.Message);
            }
        }

        [HttpPost]
        public ActionResult Login(string userName, string passWord)
        {
            try
            {
                var encryptedPassWord = Security.Security.Encrypt(passWord.ToUpper());
                /*return Content(encryptedPassWord);*/

                var user =
                    dbGeneral.tlogUsers.SingleOrDefault(r => r.userName == userName && r.passWord == encryptedPassWord);

                if (user != null)
                {
                    Session["EIC"] = user.EIC;
                    return Content("0");
                }
            }
            catch (Exception exception)
            {
                return Content(exception.Message);
            }
            return Content("1");
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }

        public ActionResult Countries()
        {
            var c = new string[] {"Albania",
                            "Andorra",
                            "Armenia",
                            "Austria",
                            "Azerbaijan",
                            "Belarus",
                            "Belgium",
                            "Bosnia & Herzegovina",
                            "Bulgaria",
                            "Croatia",
                            "Cyprus",
                            "Czech Republic",
                            "Denmark",
                            "Estonia",
                            "Finland",
                            "France",
                            "Georgia",
                            "Germany",
                            "Greece",
                            "Hungary",
                            "Iceland",
                            "Ireland",
                            "Italy",
                            "Kosovo",
                            "Latvia",
                            "Liechtenstein",
                            "Lithuania",
                            "Luxembourg",
                            "Macedonia",
                            "Malta",
                            "Moldova",
                            "Monaco",
                            "Montenegro",
                            "Netherlands",
                            "Norway",
                            "Poland",
                            "Portugal",
                            "Romania",
                            "Russia",
                            "San Marino",
                            "Serbia",
                            "Slovakia",
                            "Slovenia",
                            "Spain",
                            "Sweden",
                            "Switzerland",
                            "Turkey",
                            "Ukraine",
                            "United Kingdom",
                            "Vatican City"}
            ;
            return Json(c, JsonRequestBehavior.AllowGet);
        }
    }
}