//------------------------------------------------------------------------------
// <auto-generated>
//    This code was generated from a template.
//
//    Manual changes to this file may cause unexpected behavior in your application.
//    Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace LeaveModule.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class tAttDTR2
    {
        public int RecNo { get; set; }
        public string DtrID { get; set; }
        public string EIC { get; set; }
        public Nullable<System.DateTime> periodFrom { get; set; }
        public Nullable<System.DateTime> periodTo { get; set; }
        public Nullable<int> Tag { get; set; }
        public string approveEIC { get; set; }
        public Nullable<int> statusID { get; set; }
        public string Remarks { get; set; }
        public Nullable<System.DateTime> dtStamp { get; set; }
        public string userEIC { get; set; }
        public Nullable<int> timesTardy { get; set; }
        public Nullable<int> timesUnder { get; set; }
        public string wTotTardy { get; set; }
        public string wTotUnder { get; set; }
        public Nullable<int> timesAWOL { get; set; }
        public Nullable<int> timesPassSlip { get; set; }
        public Nullable<int> Tardy { get; set; }
        public Nullable<int> Undertime { get; set; }
        public string statusName { get; set; }
        public Nullable<int> returnTag { get; set; }
        public Nullable<int> timesOfficialPS { get; set; }
    }
}
