using Telerik.Reporting;

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
			Telerik.Reporting.ReportParameter reportParameter2 = new Telerik.Reporting.ReportParameter();
			Telerik.Reporting.Drawing.StyleRule styleRule1 = new Telerik.Reporting.Drawing.StyleRule();
			this.detail = new Telerik.Reporting.DetailSection();
			this.textBox1 = new Telerik.Reporting.TextBox();
			this.textBox2 = new Telerik.Reporting.TextBox();
			this.textBox3 = new Telerik.Reporting.TextBox();
			this.textBox4 = new Telerik.Reporting.TextBox();
			this.textBox5 = new Telerik.Reporting.TextBox();
			this.textBox6 = new Telerik.Reporting.TextBox();
			this.textBox7 = new Telerik.Reporting.TextBox();
			this.textBox8 = new Telerik.Reporting.TextBox();
			this.textBox9 = new Telerik.Reporting.TextBox();
			this.textBox11 = new Telerik.Reporting.TextBox();
			this.textBox12 = new Telerik.Reporting.TextBox();
			this.textBox10 = new Telerik.Reporting.TextBox();
			this.textBox13 = new Telerik.Reporting.TextBox();
			this.textBox14 = new Telerik.Reporting.TextBox();
			this.textBox15 = new Telerik.Reporting.TextBox();
			this.textBox16 = new Telerik.Reporting.TextBox();
			this.sqlDSLeaveCredits = new Telerik.Reporting.SqlDataSource();
			((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
			// 
			// detail
			// 
			this.detail.Height = Telerik.Reporting.Drawing.Unit.Inch(12D);
			this.detail.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.textBox1,
            this.textBox2,
            this.textBox3,
            this.textBox4,
            this.textBox5,
            this.textBox6,
            this.textBox7,
            this.textBox8,
            this.textBox9,
            this.textBox11,
            this.textBox12,
            this.textBox10,
            this.textBox13,
            this.textBox14,
            this.textBox15,
            this.textBox16});
			this.detail.Name = "detail";
			// 
			// textBox1
			// 
			this.textBox1.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.099999986588954926D), Telerik.Reporting.Drawing.Unit.Inch(5.3000006675720215D));
			this.textBox1.Name = "textBox1";
			this.textBox1.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.90000003576278687D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox1.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox1.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox1.Style.Font.Bold = true;
			this.textBox1.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox1.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox1.Value = "As Of";
			// 
			// textBox2
			// 
			this.textBox2.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(5.3000006675720215D));
			this.textBox2.Name = "textBox2";
			this.textBox2.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox2.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox2.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox2.Style.Font.Bold = true;
			this.textBox2.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox2.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox2.Value = "VL";
			// 
			// textBox3
			// 
			this.textBox3.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.9000000953674316D), Telerik.Reporting.Drawing.Unit.Inch(5.3000006675720215D));
			this.textBox3.Name = "textBox3";
			this.textBox3.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox3.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox3.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox3.Style.Font.Bold = true;
			this.textBox3.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox3.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox3.Value = "SL";
			// 
			// textBox4
			// 
			this.textBox4.Format = "{0:N4}";
			this.textBox4.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.9000004529953003D), Telerik.Reporting.Drawing.Unit.Inch(5.6000003814697266D));
			this.textBox4.Name = "textBox4";
			this.textBox4.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox4.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox4.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox4.Style.Font.Bold = false;
			this.textBox4.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox4.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox4.Value = "= Fields.SLCredit";
			// 
			// textBox5
			// 
			this.textBox5.Format = "{0:N4}";
			this.textBox5.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1062501668930054D), Telerik.Reporting.Drawing.Unit.Inch(5.6000003814697266D));
			this.textBox5.Name = "textBox5";
			this.textBox5.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox5.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox5.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox5.Style.Font.Bold = false;
			this.textBox5.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox5.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox5.Value = "= Fields.VLCredit";
			// 
			// textBox6
			// 
			this.textBox6.Format = "{0:d}";
			this.textBox6.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.10208352655172348D), Telerik.Reporting.Drawing.Unit.Inch(5.6000003814697266D));
			this.textBox6.Name = "textBox6";
			this.textBox6.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.90000003576278687D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox6.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox6.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox6.Style.Font.Bold = false;
			this.textBox6.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox6.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox6.Value = "= Fields.Period.Date";
			// 
			// textBox7
			// 
			this.textBox7.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.099999986588954926D), Telerik.Reporting.Drawing.Unit.Inch(5.820833683013916D));
			this.textBox7.Name = "textBox7";
			this.textBox7.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.90000003576278687D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox7.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox7.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox7.Style.BorderWidth.Default = Telerik.Reporting.Drawing.Unit.Point(0D);
			this.textBox7.Style.Font.Bold = false;
			this.textBox7.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox7.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox7.Value = "Less :";
			// 
			// textBox8
			// 
			this.textBox8.Format = "{0:N4}";
			this.textBox8.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1041666269302368D), Telerik.Reporting.Drawing.Unit.Inch(5.820833683013916D));
			this.textBox8.Name = "textBox8";
			this.textBox8.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox8.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox8.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox8.Style.Font.Bold = false;
			this.textBox8.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox8.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox8.Value = "= IIf(Fields.LeaveCode Like \'VL\', Fields.ApplyDay, \'\')";
			// 
			// textBox9
			// 
			this.textBox9.Format = "{0:N4}";
			this.textBox9.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.8979169130325317D), Telerik.Reporting.Drawing.Unit.Inch(5.820833683013916D));
			this.textBox9.Name = "textBox9";
			this.textBox9.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox9.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox9.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox9.Style.Font.Bold = false;
			this.textBox9.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox9.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox9.Value = "= IIf(Fields.LeaveCode Like \'SL\', Fields.ApplyDay, \'\')";
			// 
			// textBox11
			// 
			this.textBox11.Format = "{0:N4}";
			this.textBox11.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1041666269302368D), Telerik.Reporting.Drawing.Unit.Inch(6.0479168891906738D));
			this.textBox11.Name = "textBox11";
			this.textBox11.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox11.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox11.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox11.Style.Font.Bold = false;
			this.textBox11.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox11.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox11.Value = "= Fields.VLBal";
			// 
			// textBox12
			// 
			this.textBox12.Format = "{0:N4}";
			this.textBox12.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.8979169130325317D), Telerik.Reporting.Drawing.Unit.Inch(6.0479168891906738D));
			this.textBox12.Name = "textBox12";
			this.textBox12.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.699999988079071D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox12.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox12.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox12.Style.Font.Bold = false;
			this.textBox12.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox12.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox12.Value = "= Fields.SLBal";
			// 
			// textBox10
			// 
			this.textBox10.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.099999986588954926D), Telerik.Reporting.Drawing.Unit.Inch(6.0479168891906738D));
			this.textBox10.Name = "textBox10";
			this.textBox10.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.90000003576278687D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox10.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox10.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox10.Style.BorderWidth.Default = Telerik.Reporting.Drawing.Unit.Point(0D);
			this.textBox10.Style.Font.Bold = false;
			this.textBox10.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox10.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox10.Value = "Balance :";
			// 
			// textBox13
			// 
			this.textBox13.Format = "{0:N4}";
			this.textBox13.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(2.7000000476837158D), Telerik.Reporting.Drawing.Unit.Inch(6.0479168891906738D));
			this.textBox13.Name = "textBox13";
			this.textBox13.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox13.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox13.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox13.Style.Font.Bold = false;
			this.textBox13.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox13.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox13.Value = "=IIf(Fields.LeaveCode <> \"VL\" and Fields.LeaveCode <> \"SL\", Fields.OtherLeaveBala" +
    "nce, \"\")";
			// 
			// textBox14
			// 
			this.textBox14.Format = "{0:N4}";
			this.textBox14.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(2.7000000476837158D), Telerik.Reporting.Drawing.Unit.Inch(5.8333339691162109D));
			this.textBox14.Name = "textBox14";
			this.textBox14.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox14.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox14.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox14.Style.Font.Bold = false;
			this.textBox14.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox14.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox14.Value = "=IIf(Fields.LeaveCode <> \"VL\" and Fields.LeaveCode <> \"SL\", Fields.ApplyDay, \"\")";
			// 
			// textBox15
			// 
			this.textBox15.Format = "{0:N4}";
			this.textBox15.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(2.7000000476837158D), Telerik.Reporting.Drawing.Unit.Inch(5.6145839691162109D));
			this.textBox15.Name = "textBox15";
			this.textBox15.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox15.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox15.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox15.Style.Font.Bold = false;
			this.textBox15.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox15.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox15.Value = "=IIf(Fields.LeaveCode <> \"VL\" and Fields.LeaveCode <> \"SL\", Fields.OtherLeaveCred" +
    "it, \"\")";
			// 
			// textBox16
			// 
			this.textBox16.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(2.7000000476837158D), Telerik.Reporting.Drawing.Unit.Inch(5.2958335876464844D));
			this.textBox16.Name = "textBox16";
			this.textBox16.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.1000000238418579D), Telerik.Reporting.Drawing.Unit.Inch(0.19999998807907105D));
			this.textBox16.Style.BorderStyle.Bottom = Telerik.Reporting.Drawing.BorderType.Solid;
			this.textBox16.Style.BorderWidth.Bottom = Telerik.Reporting.Drawing.Unit.Pixel(1D);
			this.textBox16.Style.Font.Bold = true;
			this.textBox16.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox16.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox16.Value = "=IIf(Fields.LeaveCode <> \"VL\" and Fields.LeaveCode <> \"SL\", \"OTHER(\" + Fields.Lea" +
    "veCode + \")\", \"OTHER\")";
			// 
			// sqlDSLeaveCredits
			// 
			this.sqlDSLeaveCredits.ConnectionString = "Data Source=127.0.0.1;Initial Catalog=HRIS;Persist Security Info=True;User ID=sa;" +
    "Password=m@st3rk3y;MultipleActiveResultSets=True;Application Name=EntityFramewor" +
    "k";
			this.sqlDSLeaveCredits.Name = "sqlDSLeaveCredits";
			this.sqlDSLeaveCredits.Parameters.AddRange(new Telerik.Reporting.SqlDataSourceParameter[] {
            new Telerik.Reporting.SqlDataSourceParameter("@EIC", System.Data.DbType.String, "=Parameters.EIC.Value"),
            new Telerik.Reporting.SqlDataSourceParameter("@recNo", System.Data.DbType.Int32, "=Parameters.recNo.Value")});
			this.sqlDSLeaveCredits.ProviderName = "System.Data.SqlClient";
			this.sqlDSLeaveCredits.SelectCommand = "select * from fnLeaveCreditsDataForPrinting(@EIC, @recNo)";
			// 
			// LeaveCreditReport
			// 
			this.DataSource = this.sqlDSLeaveCredits;
			this.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.detail});
			this.Name = "LeaveRequestReport";
			this.PageSettings.Landscape = false;
			this.PageSettings.Margins = new Telerik.Reporting.Drawing.MarginsU(Telerik.Reporting.Drawing.Unit.Inch(0.40000000596046448D), Telerik.Reporting.Drawing.Unit.Inch(0.40000000596046448D), Telerik.Reporting.Drawing.Unit.Inch(0.25D), Telerik.Reporting.Drawing.Unit.Inch(1.25D));
			this.PageSettings.PaperKind = System.Drawing.Printing.PaperKind.Legal;
			reportParameter1.Name = "EIC";
			reportParameter1.Text = "EIC";
			reportParameter1.Value = "";
			reportParameter2.Name = "recNo";
			reportParameter2.Text = "recNo";
			reportParameter2.Type = Telerik.Reporting.ReportParameterType.Integer;
			reportParameter2.Value = "";
			this.ReportParameters.Add(reportParameter1);
			this.ReportParameters.Add(reportParameter2);
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

        private DetailSection detail;
        private TextBox textBox1;
        private TextBox textBox2;
        private TextBox textBox3;
        private TextBox textBox4;
        private TextBox textBox5;
        private TextBox textBox6;
        private TextBox textBox7;
        private TextBox textBox8;
        private TextBox textBox9;
        private TextBox textBox11;
        private TextBox textBox12;
        private TextBox textBox10;
        private SqlDataSource sqlDSLeaveCredits;
        private TextBox textBox13;
        private TextBox textBox14;
        private TextBox textBox15;
        private TextBox textBox16;
    }
}