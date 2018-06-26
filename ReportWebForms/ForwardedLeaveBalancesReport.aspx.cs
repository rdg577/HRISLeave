using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LeaveModule.Reports;

namespace LeaveModule.ReportWebForms
{
	public partial class ForwardedLeaveBalancesReport : System.Web.UI.Page
	{
		protected void Page_Load(object sender, EventArgs e)
		{
		    var irs = new Telerik.Reporting.InstanceReportSource
		    {
		        ReportDocument = new ForwardedBalancesReport()
		    };
		    ReportViewer.ReportSource = irs;
		}
	}
}