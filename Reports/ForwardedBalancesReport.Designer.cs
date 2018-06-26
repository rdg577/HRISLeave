namespace LeaveModule.Reports
{
	partial class ForwardedBalancesReport
	{
		#region Component Designer generated code
		/// <summary>
		/// Required method for telerik Reporting designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			Telerik.Reporting.Drawing.FormattingRule formattingRule1 = new Telerik.Reporting.Drawing.FormattingRule();
			Telerik.Reporting.Drawing.StyleRule styleRule1 = new Telerik.Reporting.Drawing.StyleRule();
			this.pageHeaderSection1 = new Telerik.Reporting.PageHeaderSection();
			this.detail = new Telerik.Reporting.DetailSection();
			this.textBox1 = new Telerik.Reporting.TextBox();
			this.pageFooterSection1 = new Telerik.Reporting.PageFooterSection();
			this.sqlDataSourceLeaveCreditBalances = new Telerik.Reporting.SqlDataSource();
			this.textBox2 = new Telerik.Reporting.TextBox();
			this.textBox3 = new Telerik.Reporting.TextBox();
			this.textBox4 = new Telerik.Reporting.TextBox();
			this.textBox5 = new Telerik.Reporting.TextBox();
			this.textBox6 = new Telerik.Reporting.TextBox();
			this.textBox7 = new Telerik.Reporting.TextBox();
			this.textBox8 = new Telerik.Reporting.TextBox();
			this.textBox9 = new Telerik.Reporting.TextBox();
			this.textBox10 = new Telerik.Reporting.TextBox();
			this.textBox11 = new Telerik.Reporting.TextBox();
			this.textBox12 = new Telerik.Reporting.TextBox();
			this.textBox13 = new Telerik.Reporting.TextBox();
			this.textBox14 = new Telerik.Reporting.TextBox();
			this.textBox15 = new Telerik.Reporting.TextBox();
			this.textBox16 = new Telerik.Reporting.TextBox();
			this.textBox17 = new Telerik.Reporting.TextBox();
			this.textBox18 = new Telerik.Reporting.TextBox();
			this.textBox19 = new Telerik.Reporting.TextBox();
			this.textBox20 = new Telerik.Reporting.TextBox();
			this.textBox21 = new Telerik.Reporting.TextBox();
			this.textBox22 = new Telerik.Reporting.TextBox();
			((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
			// 
			// pageHeaderSection1
			// 
			this.pageHeaderSection1.Height = Telerik.Reporting.Drawing.Unit.Inch(0.80000019073486328D);
			this.pageHeaderSection1.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.textBox9,
            this.textBox10,
            this.textBox11,
            this.textBox12,
            this.textBox13,
            this.textBox14,
            this.textBox15,
            this.textBox16,
            this.textBox17,
            this.textBox18});
			this.pageHeaderSection1.Name = "pageHeaderSection1";
			// 
			// detail
			// 
			formattingRule1.Filters.Add(new Telerik.Reporting.Filter("=RowNumber() % 2", Telerik.Reporting.FilterOperator.Equal, "1"));
			formattingRule1.Style.BackgroundColor = System.Drawing.Color.FromArgb(((int)(((byte)(212)))), ((int)(((byte)(212)))), ((int)(((byte)(212)))));
			this.detail.ConditionalFormatting.AddRange(new Telerik.Reporting.Drawing.FormattingRule[] {
            formattingRule1});
			this.detail.Height = Telerik.Reporting.Drawing.Unit.Inch(0.299999862909317D);
			this.detail.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.textBox1,
            this.textBox2,
            this.textBox3,
            this.textBox4,
            this.textBox5,
            this.textBox6,
            this.textBox7,
            this.textBox8,
            this.textBox22});
			this.detail.Name = "detail";
			// 
			// textBox1
			// 
			this.textBox1.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1562503576278687D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox1.Name = "textBox1";
			this.textBox1.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.1999998092651367D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox1.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox1.Value = "=fullnameLast";
			// 
			// pageFooterSection1
			// 
			this.pageFooterSection1.Height = Telerik.Reporting.Drawing.Unit.Inch(0.79999971389770508D);
			this.pageFooterSection1.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.textBox19,
            this.textBox20,
            this.textBox21});
			this.pageFooterSection1.Name = "pageFooterSection1";
			// 
			// sqlDataSourceLeaveCreditBalances
			// 
			this.sqlDataSourceLeaveCreditBalances.ConnectionString = "Data Source=127.0.0.1;Initial Catalog=HRIS;Persist Security Info=True;User ID=sa;" +
    "Password=m@st3rk3y;MultipleActiveResultSets=True;Application Name=EntityFramewor" +
    "k";
			this.sqlDataSourceLeaveCreditBalances.Name = "sqlDataSourceLeaveCreditBalances";
			this.sqlDataSourceLeaveCreditBalances.ProviderName = "System.Data.SqlClient";
			this.sqlDataSourceLeaveCreditBalances.SelectCommand = "select * from vLeaveForwardedLeaveBalances;";
			// 
			// textBox2
			// 
			this.textBox2.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.65625017881393433D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox2.Name = "textBox2";
			this.textBox2.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.40007892251014709D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox2.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox2.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox2.Value = "=idNo";
			// 
			// textBox3
			// 
			this.textBox3.Format = "{0:dd-MMM-yyyy}";
			this.textBox3.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(3.5D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox3.Name = "textBox3";
			this.textBox3.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.0000001192092896D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox3.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox3.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox3.Value = "= Fields.AsOf";
			// 
			// textBox4
			// 
			this.textBox4.Format = "{0:N4}";
			this.textBox4.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(4.5999999046325684D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox4.Name = "textBox4";
			this.textBox4.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.69999980926513672D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox4.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox4.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox4.Value = "= Fields.VLBalanceForwarded";
			// 
			// textBox5
			// 
			this.textBox5.Format = "{0:N4}";
			this.textBox5.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(5.4000000953674316D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox5.Name = "textBox5";
			this.textBox5.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.7000001072883606D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox5.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox5.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox5.Value = "= Fields.SLBalanceForwarded";
			// 
			// textBox6
			// 
			this.textBox6.Format = "{0:N4}";
			this.textBox6.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(6.2000002861022949D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox6.Name = "textBox6";
			this.textBox6.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.7000001072883606D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox6.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox6.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox6.Value = "= Fields.TotalBalanceForwarded";
			// 
			// textBox7
			// 
			this.textBox7.Format = "{0:dd-MMM-yyyy}";
			this.textBox7.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(7D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox7.Name = "textBox7";
			this.textBox7.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.900000274181366D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox7.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox7.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox7.Value = "= Fields.DateForwarded";
			// 
			// textBox8
			// 
			this.textBox8.Format = "{0:dd-MMM-yyyy}";
			this.textBox8.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(8D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox8.Name = "textBox8";
			this.textBox8.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.9291757345199585D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox8.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox8.Value = "= Fields.ForwardedBy";
			// 
			// textBox9
			// 
			this.textBox9.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.65625017881393433D), Telerik.Reporting.Drawing.Unit.Inch(0.60000008344650269D));
			this.textBox9.Name = "textBox9";
			this.textBox9.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.40007892251014709D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox9.Style.Font.Bold = true;
			this.textBox9.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox9.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox9.Value = "ID #";
			// 
			// textBox10
			// 
			this.textBox10.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(1.1562503576278687D), Telerik.Reporting.Drawing.Unit.Inch(0.60000008344650269D));
			this.textBox10.Name = "textBox10";
			this.textBox10.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.1999998092651367D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox10.Style.Font.Bold = true;
			this.textBox10.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox10.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Left;
			this.textBox10.Value = "Employee Name";
			// 
			// textBox11
			// 
			this.textBox11.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(3.5D), Telerik.Reporting.Drawing.Unit.Inch(0.59996062517166138D));
			this.textBox11.Name = "textBox11";
			this.textBox11.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.99999982118606567D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox11.Style.Font.Bold = true;
			this.textBox11.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox11.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox11.Value = "As Of";
			// 
			// textBox12
			// 
			this.textBox12.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(4.5999999046325684D), Telerik.Reporting.Drawing.Unit.Inch(0.60000008344650269D));
			this.textBox12.Name = "textBox12";
			this.textBox12.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.69999992847442627D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox12.Style.Font.Bold = true;
			this.textBox12.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox12.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox12.Value = "VL Bal.";
			// 
			// textBox13
			// 
			this.textBox13.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(5.4000000953674316D), Telerik.Reporting.Drawing.Unit.Inch(0.60000008344650269D));
			this.textBox13.Name = "textBox13";
			this.textBox13.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.69999992847442627D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox13.Style.Font.Bold = true;
			this.textBox13.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox13.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox13.Value = "SL Bal.";
			// 
			// textBox14
			// 
			this.textBox14.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(6.2000002861022949D), Telerik.Reporting.Drawing.Unit.Inch(0.59996062517166138D));
			this.textBox14.Name = "textBox14";
			this.textBox14.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.69999992847442627D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox14.Style.Font.Bold = true;
			this.textBox14.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox14.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox14.Value = "Total";
			// 
			// textBox15
			// 
			this.textBox15.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(7D), Telerik.Reporting.Drawing.Unit.Inch(0.59996062517166138D));
			this.textBox15.Name = "textBox15";
			this.textBox15.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.900000274181366D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox15.Style.Font.Bold = true;
			this.textBox15.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox15.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Center;
			this.textBox15.Value = "Forwarded on";
			// 
			// textBox16
			// 
			this.textBox16.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(8D), Telerik.Reporting.Drawing.Unit.Inch(0.59996062517166138D));
			this.textBox16.Name = "textBox16";
			this.textBox16.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.9291754961013794D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox16.Style.Font.Bold = true;
			this.textBox16.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox16.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Left;
			this.textBox16.Value = "Forwarded by";
			// 
			// textBox17
			// 
			this.textBox17.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(0D));
			this.textBox17.Name = "textBox17";
			this.textBox17.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.8000001907348633D), Telerik.Reporting.Drawing.Unit.Inch(0.19999997317790985D));
			this.textBox17.Style.Font.Bold = true;
			this.textBox17.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(12D);
			this.textBox17.Value = "Forwarded Leave Credit Balances";
			// 
			// textBox18
			// 
			this.textBox18.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(3.9418537198798731E-05D), Telerik.Reporting.Drawing.Unit.Inch(0.20007865130901337D));
			this.textBox18.Name = "textBox18";
			this.textBox18.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.7999608516693115D), Telerik.Reporting.Drawing.Unit.Inch(0.19999997317790985D));
			this.textBox18.Value = "=\"As of \" + Now()";
			// 
			// textBox19
			// 
			this.textBox19.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(0.599999725818634D));
			this.textBox19.Name = "textBox19";
			this.textBox19.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.2000001668930054D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox19.Value = "=\"Page \" + PageNumber + \" of \" + PageCount";
			// 
			// textBox20
			// 
			this.textBox20.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(3.1000001430511475D), Telerik.Reporting.Drawing.Unit.Inch(0.599999725818634D));
			this.textBox20.Name = "textBox20";
			this.textBox20.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(5.2000007629394531D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox20.Value = "Certified True and Correct by __________________________________________";
			// 
			// textBox21
			// 
			this.textBox21.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(0.29999971389770508D));
			this.textBox21.Name = "textBox21";
			this.textBox21.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(2.8000001907348633D), Telerik.Reporting.Drawing.Unit.Inch(0.19999997317790985D));
			this.textBox21.Value = "=\"Total No. of Entries: \" + Count(Fields.idNo)";
			// 
			// textBox22
			// 
			this.textBox22.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0D), Telerik.Reporting.Drawing.Unit.Inch(0.0520833320915699D));
			this.textBox22.Name = "textBox22";
			this.textBox22.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(0.52500003576278687D), Telerik.Reporting.Drawing.Unit.Inch(0.19999997317790985D));
			this.textBox22.Style.Font.Size = Telerik.Reporting.Drawing.Unit.Point(9D);
			this.textBox22.Style.TextAlign = Telerik.Reporting.Drawing.HorizontalAlign.Right;
			this.textBox22.Value = "= RowNumber()";
			// 
			// ForwardedBalancesReport
			// 
			this.DataSource = this.sqlDataSourceLeaveCreditBalances;
			this.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.pageHeaderSection1,
            this.detail,
            this.pageFooterSection1});
			this.Name = "ForwardedBalancesReport";
			this.PageSettings.Landscape = true;
			this.PageSettings.Margins = new Telerik.Reporting.Drawing.MarginsU(Telerik.Reporting.Drawing.Unit.Inch(0.5D), Telerik.Reporting.Drawing.Unit.Inch(0.5D), Telerik.Reporting.Drawing.Unit.Inch(0.5D), Telerik.Reporting.Drawing.Unit.Inch(0.5D));
			this.PageSettings.PaperKind = System.Drawing.Printing.PaperKind.Letter;
			this.Style.BackgroundColor = System.Drawing.Color.White;
			styleRule1.Selectors.AddRange(new Telerik.Reporting.Drawing.ISelector[] {
            new Telerik.Reporting.Drawing.TypeSelector(typeof(Telerik.Reporting.TextItemBase)),
            new Telerik.Reporting.Drawing.TypeSelector(typeof(Telerik.Reporting.HtmlTextBox))});
			styleRule1.Style.Padding.Left = Telerik.Reporting.Drawing.Unit.Point(2D);
			styleRule1.Style.Padding.Right = Telerik.Reporting.Drawing.Unit.Point(2D);
			this.StyleSheet.AddRange(new Telerik.Reporting.Drawing.StyleRule[] {
            styleRule1});
			this.Width = Telerik.Reporting.Drawing.Unit.Inch(10.029175758361816D);
			((System.ComponentModel.ISupportInitialize)(this)).EndInit();

		}
		#endregion

		private Telerik.Reporting.PageHeaderSection pageHeaderSection1;
		private Telerik.Reporting.DetailSection detail;
		private Telerik.Reporting.PageFooterSection pageFooterSection1;
		private Telerik.Reporting.SqlDataSource sqlDataSourceLeaveCreditBalances;
		private Telerik.Reporting.TextBox textBox1;
		private Telerik.Reporting.TextBox textBox2;
		private Telerik.Reporting.TextBox textBox3;
		private Telerik.Reporting.TextBox textBox4;
		private Telerik.Reporting.TextBox textBox5;
		private Telerik.Reporting.TextBox textBox6;
		private Telerik.Reporting.TextBox textBox7;
		private Telerik.Reporting.TextBox textBox8;
		private Telerik.Reporting.TextBox textBox9;
		private Telerik.Reporting.TextBox textBox10;
		private Telerik.Reporting.TextBox textBox11;
		private Telerik.Reporting.TextBox textBox12;
		private Telerik.Reporting.TextBox textBox13;
		private Telerik.Reporting.TextBox textBox14;
		private Telerik.Reporting.TextBox textBox15;
		private Telerik.Reporting.TextBox textBox16;
		private Telerik.Reporting.TextBox textBox17;
		private Telerik.Reporting.TextBox textBox18;
		private Telerik.Reporting.TextBox textBox19;
		private Telerik.Reporting.TextBox textBox20;
		private Telerik.Reporting.TextBox textBox21;
		private Telerik.Reporting.TextBox textBox22;
	}
}