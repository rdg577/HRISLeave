using System;
using System.Web.UI;
using LeaveModule.Reports;
using Telerik.Reporting;

namespace LeaveModule.ReportWebForms
{
    public partial class LeaveRequestReport1 : Page
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