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
    
    public partial class vLeaveForwardedLeaveBalance
    {
        public int Id { get; set; }
        public string fullnameLast { get; set; }
        public string EIC { get; set; }
        public string idNo { get; set; }
        public double VLBalanceForwarded { get; set; }
        public double SLBalanceForwarded { get; set; }
        public double TotalBalanceForwarded { get; set; }
        public System.DateTime AsOf { get; set; }
        public System.DateTime DateForwarded { get; set; }
        public string EICForwardedBy { get; set; }
        public string ForwardedBy { get; set; }
    }
}
