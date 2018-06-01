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
			System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(ForwardedBalancesReport));
			Telerik.Reporting.Drawing.StyleRule styleRule1 = new Telerik.Reporting.Drawing.StyleRule();
			this.pageHeaderSection1 = new Telerik.Reporting.PageHeaderSection();
			this.detail = new Telerik.Reporting.DetailSection();
			this.textBox1 = new Telerik.Reporting.TextBox();
			this.pageFooterSection1 = new Telerik.Reporting.PageFooterSection();
			this.sqlDataSourceLeaveCreditBalances = new Telerik.Reporting.SqlDataSource();
			((System.ComponentModel.ISupportInitialize)(this)).BeginInit();
			// 
			// pageHeaderSection1
			// 
			this.pageHeaderSection1.Height = Telerik.Reporting.Drawing.Unit.Inch(2D);
			this.pageHeaderSection1.Name = "pageHeaderSection1";
			// 
			// detail
			// 
			this.detail.Height = Telerik.Reporting.Drawing.Unit.Inch(2D);
			this.detail.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.textBox1});
			this.detail.Name = "detail";
			// 
			// textBox1
			// 
			this.textBox1.Location = new Telerik.Reporting.Drawing.PointU(Telerik.Reporting.Drawing.Unit.Inch(0.19999997317790985D), Telerik.Reporting.Drawing.Unit.Inch(0.1000000610947609D));
			this.textBox1.Name = "textBox1";
			this.textBox1.Size = new Telerik.Reporting.Drawing.SizeU(Telerik.Reporting.Drawing.Unit.Inch(1.1999999284744263D), Telerik.Reporting.Drawing.Unit.Inch(0.20000012218952179D));
			this.textBox1.Value = "=fullnameLast";
			// 
			// pageFooterSection1
			// 
			this.pageFooterSection1.Height = Telerik.Reporting.Drawing.Unit.Inch(2D);
			this.pageFooterSection1.Name = "pageFooterSection1";
			// 
			// sqlDataSourceLeaveCreditBalances
			// 
			this.sqlDataSourceLeaveCreditBalances.ConnectionString = "HRISEntities";
			this.sqlDataSourceLeaveCreditBalances.Name = "sqlDataSourceLeaveCreditBalances";
			this.sqlDataSourceLeaveCreditBalances.SelectCommand = resources.GetString("sqlDataSourceLeaveCreditBalances.SelectCommand");
			// 
			// ForwardedBalancesReport
			// 
			this.DataSource = this.sqlDataSourceLeaveCreditBalances;
			this.Items.AddRange(new Telerik.Reporting.ReportItemBase[] {
            this.pageHeaderSection1,
            this.detail,
            this.pageFooterSection1});
			this.Name = "ForwardedBalancesReport";
			this.PageSettings.Margins = new Telerik.Reporting.Drawing.MarginsU(Telerik.Reporting.Drawing.Unit.Inch(1D), Telerik.Reporting.Drawing.Unit.Inch(1D), Telerik.Reporting.Drawing.Unit.Inch(1D), Telerik.Reporting.Drawing.Unit.Inch(1D));
			this.PageSettings.PaperKind = System.Drawing.Printing.PaperKind.Letter;
			this.Style.BackgroundColor = System.Drawing.Color.White;
			styleRule1.Selectors.AddRange(new Telerik.Reporting.Drawing.ISelector[] {
            new Telerik.Reporting.Drawing.TypeSelector(typeof(Telerik.Reporting.TextItemBase)),
            new Telerik.Reporting.Drawing.TypeSelector(typeof(Telerik.Reporting.HtmlTextBox))});
			styleRule1.Style.Padding.Left = Telerik.Reporting.Drawing.Unit.Point(2D);
			styleRule1.Style.Padding.Right = Telerik.Reporting.Drawing.Unit.Point(2D);
			this.StyleSheet.AddRange(new Telerik.Reporting.Drawing.StyleRule[] {
            styleRule1});
			this.Width = Telerik.Reporting.Drawing.Unit.Inch(6D);
			((System.ComponentModel.ISupportInitialize)(this)).EndInit();

		}
		#endregion

		private Telerik.Reporting.PageHeaderSection pageHeaderSection1;
		private Telerik.Reporting.DetailSection detail;
		private Telerik.Reporting.PageFooterSection pageFooterSection1;
		private Telerik.Reporting.SqlDataSource sqlDataSourceLeaveCreditBalances;
		private Telerik.Reporting.TextBox textBox1;
	}
}