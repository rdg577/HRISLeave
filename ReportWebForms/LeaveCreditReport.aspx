<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="LeaveCreditReport.aspx.cs" Inherits="LeaveModule.ReportWebForms.LeaveCreditReport" %>
<%@ Register TagPrefix="telerik" Namespace="Telerik.ReportViewer.WebForms" Assembly="Telerik.ReportViewer.WebForms, Version=7.2.13.1016, Culture=neutral, PublicKeyToken=a9d7983dfcc261be" %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"> 

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title>Leave Credit Certification - Print Preview</title> 
     <style type="text/css">           
        html#html, body#body, form#form1, div#content
        {  
            height: 100%;
        }
    </style>
</head>
<body>
    <form id="form1" runat="server"> 
        <div>
            <telerik:ReportViewer ID="MainReportViewer" runat="server"
                ShowExportGroup="False" 
                ShowHistoryButtons="False" 
                ViewMode="PrintPreview"
                Width="100%" Height="100%">
            </telerik:ReportViewer>
        </div>
    </form>
</body>
</html>
