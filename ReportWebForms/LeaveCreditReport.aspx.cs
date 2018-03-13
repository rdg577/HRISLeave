using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using LeaveModule.Reports;
using Telerik.Reporting;

namespace LeaveModule.ReportWebForms
{
    public partial class LeaveCreditReport : System.Web.UI.Page
    {
        InstanceReportSource irs = new InstanceReportSource();

        protected void Page_Load(object sender, EventArgs e)
        {
            var EIC = Session["TargetLeaveRequestOwnerEIC"].ToString();
            var recNo = Session["TargetLeaveRequest"].ToString();

            irs.ReportDocument = new Reports.LeaveCreditReport();
            irs.Parameters.Add("recNo", recNo);
            irs.Parameters.Add("EIC", EIC);

            MainReportViewer.ReportSource = irs;

        }
    }
}