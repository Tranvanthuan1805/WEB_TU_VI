using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public enum ContactType
    {
        GopY,
        BaoLoi
    }

    public enum ContactStatus
    {
        Moi,
        DaDoc,
        DaXuLy,
        BoQua
    }

    [Table("Contact")]
    public class Contact
    {
        [Key]
        public int ContactId { set; get; }

        [Display(Name = "Loại")]
        public ContactType Type { get; set; } = ContactType.GopY;

        [Required(ErrorMessage = "Nội dung là bắt buộc")]
        [Display(Name = "Nội dung")]
        public string Content { set; get; } = string.Empty;

        [EmailAddress(ErrorMessage = "Email không hợp lệ")]
        [Display(Name = "Email")]
        [StringLength(255)]
        public string? Email { set; get; } = string.Empty;

        [Display(Name = "Trạng thái")]
        public ContactStatus Status { get; set; } = ContactStatus.Moi;

        [Display(Name = "Ngày tạo")]
        public DateTime DateCreated { set; get; } = DateTime.Now;

        [Display(Name = "Ngày cập nhật")]
        public DateTime DateUpdated { set; get; } = DateTime.Now;
    }
}