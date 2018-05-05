using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
	
	public class AuthenticationService
	{
		private HRISEntities db = new HRISEntities();

		public bool CheckLeaveBalance(string eic)
		{
			var item = db.tLeaveBalanceForwardeds.SingleOrDefault(r => r.EIC == eic);
			return item != null;
		}
	}
}