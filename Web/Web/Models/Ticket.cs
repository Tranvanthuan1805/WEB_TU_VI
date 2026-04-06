using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Web.Data;

namespace Web.Models
{
    [Table("Ticket")]
    public class Ticket
    {
        [Key]
        public int TicketId { set; get; }

        [Required(ErrorMessage = "Phải có mã")]
        [Display(Name = "Mã")]
        [StringLength(255, MinimumLength = 8, ErrorMessage = "{0} dài {1} đến {2}")]
        public string Code { set; get; }

        [Display(Name = "Ngày tạo")]
        public DateTime DateCreated { set; get; }

        [Display(Name = "Ngày cập nhật")]
        public DateTime DateUpdated { set; get; }

        [Display(Name = "số lượng")]
        [Range(1, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal Quantity { get; set; } = 1;

        [Display(Name = "số lượng đã dùng")]
        [Range(0, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal QuantityUsed { get; set; }

        private bool _published = true;

        [Display(Name = "Xuất bản")]
        public bool Published
        {
            get => _published && IsAvailable;
            set => _published = value;
        }

        [NotMapped]
        public bool IsAvailable => QuantityUsed < Quantity;
    }
}
