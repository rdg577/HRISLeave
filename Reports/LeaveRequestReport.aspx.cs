using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Telerik.Reporting;

namespace LeaveModule.Reports
{
    public partial class LeaveRequestReport1 : System.Web.UI.Page
    {
        InstanceReportSource irs = new InstanceReportSource();

        protected void Page_Load(object sender, EventArgs e)
        {
            var recNo = Session["TargetLeaveRequest"].ToString();

            irs.ReportDocument = new LeaveRequestReport();
            irs.Parameters.Add("recNo", recNo);

            MainReportViewer.ReportSource = irs;
            
        }
    }
}