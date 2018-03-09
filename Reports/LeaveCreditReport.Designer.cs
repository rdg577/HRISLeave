namespace LeaveModule.Reports
{
    partial class LeaveCreditReport
    {
        #region Component Designer generated code
        /// <summary>
        /// Required method for telerik Reporting designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            Telerik.Reporting.ReportParameter reportParameter1 = new Telerik.Reporting.ReportParameter();
            Telerik.Reporting.Drawing.StyleRule styleRule1 = new Telerik.Reporting.Drawing.StyleRule();
            this.detail = new Telerik.Reporting.DetailSection();
            this.shape5 = new Telerik.Reporting.Shape();
            this.shape6 = new Telerik.Reporting.Shape();
            this.textBox41 = new Telerik.Reporting.TextBox();
            this.shape7 = new Telerik.Reporting.Shape();
            this.shape8 = new Telerik.Reporting.Shape();
            this.textBox42 = new Telerik.Reporting.TextBox();
            this.textBox44 = new Telerik.Reporting.TextBox();
            this.textBox46 = new Telerik.Reporting.TextBox();
            this.textBox49 = new Telerik.Reporting.TextBox();
            this.textBox50 = new Telerik.Reporting.TextBox();
            this.textBox51 = new Telerik.Reporting.TextBox();
            this.textBox54 = new Telerik.Reporting.TextBox();
            this.textBox55 = new Telerik.Reporting.TextBox();
            this.textBox58 = new Telerik.Reporting.TextBox();
            this.sqlDSLeaveRequest = new Telerik.Reporting.SqlDataSource();
            ((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
            // 
            // detail
            // 
            this.detail.Height = Telerik.Reporting.Drawing.Unit.Inch(12D);
            this.detail.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.shape5,
            this.shape6,
            this.textBox41,
            this.shape7,
            this.shape8,
            this.textBox42,
            this.textBox44,
            this.textBox46,
            this.textBox49,
            this.textBox50,
            this.textBox51,
            this.textBox54,
            this.textBox55,
            this.textBox58});
            this.detail.Name = "detail";
            // 
            // shape5
            // 
            this.shape5.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(4.6229166984558105D));
            this.shape5.Name = "shape5";
            this.shape5.ShapeType = new Telerik.Reporting.Drawing.Shapes.LineShape(Telerik.Reporting.Drawing.Shapes.LineDirection.EW);
            this.shape5.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(7.5D), Telerik.Reporting.Drawing.Unit.Inch(0.05000000074505806D));
            this.shape5.Style.LineWidth = Telerik.Reporting.Drawing.Unit.Pixel(0.5D);
            // 
            // shape6
            // 
            this.shape6.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(4.6708335876464844D));
            this.shape6.Name = "shape6";
            this.shape6.ShapeType = new Telerik.Reporting.Drawing.Shapes.LineShape(Telerik.Reporting.Drawing.Shapes.LineDirection.EW);
            this.shape6.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(7.5D), Telerik.Reporting.Drawing.Unit.Inch(0.05000000074505806D));
            this.shape6.Style.LineWidth = Telerik.Reporting.Drawing.Unit.Pixel(0.5D);
            // 
            // textBox41
            // 
            this.textBox41.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(4.7395834922790527D));
            this.textBox41.Name = "textBox41";
            this.textBox41.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(7.4986109733581543D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox41.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.None;
            this.textBox41.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
            this.textBox41.Style.Font.Bold = true;
            this.textBox41.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(12D);
            this.textBox41.Style.Font.Underline = false;
            this.textBox41.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
            this.textBox41.Value = "DETAILS OF ACTION ON APPLICATION";
            // 
            // shape7
            // 
            this.shape7.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(4.9229168891906738D));
            this.shape7.Name = "shape7";
            this.shape7.ShapeType = new Telerik.Reporting.Drawing.Shapes.LineShape(Telerik.Reporting.Drawing.Shapes.LineDirection.EW);
            this.shape7.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(7.5D), Telerik.Reporting.Drawing.Unit.Inch(0.05000000074505806D));
            this.shape7.Style.LineWidth = Telerik.Reporting.Drawing.Unit.Pixel(0.5D);
            // 
            // shape8
            // 
            this.shape8.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(4.9604167938232422D));
            this.shape8.Name = "shape8";
            this.shape8.ShapeType = new Telerik.Reporting.Drawing.Shapes.LineShape(Telerik.Reporting.Drawing.Shapes.LineDirection.EW);
            this.shape8.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(7.5D), Telerik.Reporting.Drawing.Unit.Inch(0.05000000074505806D));
            this.shape8.Style.LineWidth = Telerik.Reporting.Drawing.Unit.Pixel(0.5D);
            // 
            // textBox42
            // 
            this.textBox42.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(5.0208334922790527D));
            this.textBox42.Name = "textBox42";
            this.textBox42.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.519444465637207D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox42.Style.Font.Bold = true;
            this.textBox42.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
            this.textBox42.Value = "7a. CERTIFICATION OF LEAVE CREDITS";
            // 
            // textBox44
            // 
            this.textBox44.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(4.59375D), Telerik.Reporting.Drawing.Unit.Inch(5.0208334922790527D));
            this.textBox44.Name = "textBox44";
            this.textBox44.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.5935186147689819D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox44.Style.Font.Bold = true;
            this.textBox44.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
            this.textBox44.Value = "7b. RECOMMENDATION";
            // 
            // textBox46
            // 
            this.textBox46.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(4.7000002861022949D), Telerik.Reporting.Drawing.Unit.Inch(6.0437502861022949D));
            this.textBox46.Name = "textBox46";
            this.textBox46.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.7381942272186279D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox46.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.None;
            this.textBox46.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
            this.textBox46.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(8D);
            this.textBox46.Style.Font.Underline = false;
            this.textBox46.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
            this.textBox46.Value = "PG Dept. Head / Authorized Official";
            // 
            // textBox49
            // 
            this.textBox49.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(4.7000002861022949D), Telerik.Reporting.Drawing.Unit.Inch(6.7708334922790527D));
            this.textBox49.Name = "textBox49";
            this.textBox49.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.7381942272186279D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox49.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.None;
            this.textBox49.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
            this.textBox49.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(8D);
            this.textBox49.Style.Font.Underline = false;
            this.textBox49.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
            this.textBox49.Value = "PG Dept. Head / Authorized Official";
            // 
            // textBox50
            // 
            this.textBox50.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(4.5999999046325684D), Telerik.Reporting.Drawing.Unit.Inch(7.3583335876464844D));
            this.textBox50.Name = "textBox50";
            this.textBox50.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.9000003337860107D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox50.Style.Font.Bold = true;
            this.textBox50.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
            this.textBox50.Value = "7d. DISAPPROVED DUE TO:";
            // 
            // textBox51
            // 
            this.textBox51.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.0062500634230673313D), Telerik.Reporting.Drawing.Unit.Inch(7.3583335876464844D));
            this.textBox51.Name = "textBox51";
            this.textBox51.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.3937500715255737D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox51.Style.Font.Bold = true;
            this.textBox51.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
            this.textBox51.Value = "7c. APPROVED FOR :";
            // 
            // textBox54
            // 
            this.textBox54.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(7.5812506675720215D));
            this.textBox54.Name = "textBox54";
            this.textBox54.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.3999999761581421D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox54.Style.Font.Bold = false;
            this.textBox54.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(11D);
            this.textBox54.Value = "day(s) with pay";
            // 
            // textBox55
            // 
            this.textBox55.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(7.8083329200744629D));
            this.textBox55.Name = "textBox55";
            this.textBox55.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.3999999761581421D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox55.Style.Font.Bold = false;
            this.textBox55.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(11D);
            this.textBox55.Value = "day(s) without pay";
            // 
            // textBox58
            // 
            this.textBox58.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(8.0458335876464844D));
            this.textBox58.Name = "textBox58";
            this.textBox58.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.3999999761581421D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
            this.textBox58.Style.Font.Bold = false;
            this.textBox58.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(11D);
            this.textBox58.Value = "others (specify)";
            // 
            // sqlDSLeaveRequest
            // 
            this.sqlDSLeaveRequest.ConnectionString = "Data Source=YOHANNES;Initial Catalog=HRISLeave;User ID=sa;Password=m@st3rk3y;Mult" +
    "ipleActiveResultSets=True;Application Name=EntityFramework";
            this.sqlDSLeaveRequest.Name = "sqlDSLeaveRequest";
            this.sqlDSLeaveRequest.Parameters.AddRange(new Telerik.Reporting.SqlDataSourceParameter[] {
            new Telerik.Reporting.SqlDataSourceParameter("@recNo", System.Data.DbType.String, "=Parameters.recNo.Value")});
            this.sqlDSLeaveRequest.ProviderName = "System.Data.SqlClient";
            this.sqlDSLeaveRequest.SelectCommand = null;
            // 
            // LeaveCreditReport
            // 
            this.DataSource = this.sqlDSLeaveRequest;
            this.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.detail});
            this.Name = "LeaveRequestReport";
            this.PageSettings.Landscape = false;
            this.PageSettings.Margins = new Telerik.Reporting.Drawing.MarginsU(Telerik.Reporting.Drawing.Unit.Inch(0.40000000596046448D), Telerik.Reporting.Drawing.Unit.Inch(0.40000000596046448D), Telerik.Reporting.Drawing.Unit.Inch(0.25D), Telerik.Reporting.Drawing.Unit.Inch(1.25D));
            this.PageSettings.PaperKind = System.Drawing.Printing.PaperKind.Legal;
            reportParameter1.Name = "recNo";
            reportParameter1.Text = "recNo";
            reportParameter1.Value = "36696";
            this.ReportParameters.Add(reportParameter1);
            this.Style.BackgroundColor = System.Drawing.Color.White;
            styleRule1.Selectors.AddRange(new Telerik.Reporting.Drawing.ISelector[] {
            new Telerik.Reporting.Drawing.TypeSelector(typeof(Telerik.Reporting.TextItemBase)),
            new Telerik.Reporting.Drawing.TypeSelector(typeof(Telerik.Reporting.HtmlTextBox))});
            styleRule1.Style.Padding.Left = Telerik.Reporting.Drawing.Unit.Point(2D);
            styleRule1.Style.Padding.Right = Telerik.Reporting.Drawing.Unit.Point(2D);
            this.StyleSheet.AddRange(new Telerik.Reporting.Drawing.StyleRule[] {
            styleRule1});
            this.Width = Telerik.Reporting.Drawing.Unit.Inch(7.5625D);
            ((System.ComponentModel.ISupportInitialize)(this)).EndInit();

        }
        #endregion

        private Telerik.Reporting.DetailSection detail;
        private Telerik.Reporting.SqlDataSource sqlDSLeaveRequest;
        private Telerik.Reporting.Shape shape5;
        private Telerik.Reporting.Shape shape6;
        private Telerik.Reporting.TextBox textBox41;
        private Telerik.Reporting.Shape shape7;
        private Telerik.Reporting.Shape shape8;
        private Telerik.Reporting.TextBox textBox42;
        private Telerik.Reporting.TextBox textBox44;
        private Telerik.Reporting.TextBox textBox46;
        private Telerik.Reporting.TextBox textBox49;
        private Telerik.Reporting.TextBox textBox50;
        private Telerik.Reporting.TextBox textBox51;
        private Telerik.Reporting.TextBox textBox54;
        private Telerik.Reporting.TextBox textBox55;
        private Telerik.Reporting.TextBox textBox58;
    }
}