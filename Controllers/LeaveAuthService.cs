using System.Linq;
using LeaveModule.Models;

namespace LeaveModule.Controllers
{
	
	public class LeaveAuthService
	{
		private HRISEntities db = new HRISEntities();

		public bool CheckLeaveBalance(string eic)
		{
			var item = db.tLeaveBalanceForwardeds.SingleOrDefault(r => r.EIC == eic);
			return item != null;
		}
	}
}