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
    
    public partial class tLeaveAppLedger
    {
        public int Id { get; set; }
        public string EIC { get; set; }
        public string DTRId { get; set; }
        public string LedgerCode { get; set; }
        public double Value { get; set; }
        public string Referrence { get; set; }
        public System.DateTime Timestamp { get; set; }
    }
}
