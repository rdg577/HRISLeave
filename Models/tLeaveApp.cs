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
    
    public partial class tleaveApp
    {
        public int recNo { get; set; }
        public string controlNo { get; set; }
        public Nullable<System.DateTime> datePosted { get; set; }
        public Nullable<System.DateTime> dateFiled { get; set; }
        public string EIC { get; set; }
        public string leaveID { get; set; }
        public Nullable<int> commutation { get; set; }
        public Nullable<System.DateTime> periodFrom { get; set; }
        public Nullable<System.DateTime> periodTo { get; set; }
        public Nullable<double> applyDay { get; set; }
        public string place { get; set; }
        public string location { get; set; }
        public string recommendEIC { get; set; }
        public string approveEIC { get; set; }
        public Nullable<int> isPosted { get; set; }
        public string remarks { get; set; }
        public Nullable<bool> isWithPay { get; set; }
        public string OfficeRecommendedByEIC { get; set; }
        public Nullable<System.DateTime> DateAtOfficeRecommended { get; set; }
        public Nullable<bool> IsRecommendedAtOffice { get; set; }
        public string HRRecommendedByEIC { get; set; }
        public Nullable<System.DateTime> HRDateRecommended { get; set; }
        public Nullable<bool> IsRecommendedAtHR { get; set; }
        public string ApprovalEIC { get; set; }
        public Nullable<System.DateTime> DateApprovedDisapproved { get; set; }
        public Nullable<bool> IsApproved { get; set; }
        public string DisapprovalRemark { get; set; }
        public Nullable<bool> IsVLUsedAsSL { get; set; }
    }
}
