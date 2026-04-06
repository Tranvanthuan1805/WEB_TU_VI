using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{

    [Table("Product")]
    public class Product
    {
        [Key]
        public int ProductId { set; get; }

        [Required(ErrorMessage = "Phải có tên")]
        [Display(Name = "Tên")]
        [StringLength(255, MinimumLength = 5, ErrorMessage = "{0} dài {1} đến {2}")]
        public string Name { set; get; }

        [Display(Name = "Xuất bản")]
        public bool Published { set; get; }

        [Display(Name = "Ngày tạo")]
        public DateTime DateCreated { set; get; }

        [Display(Name = "Ngày cập nhật")]
        public DateTime DateUpdated { set; get; }

        [Display(Name = "Giá gốc")]
        [Range(0, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal OriginPrice { get; set; }

        [Display(Name = "Phần trăm giảm giá")]
        [Range(0, 100, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal Discount { get; set; }

        [Display(Name = "Giá")]
        [Range(0, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal Price { get; set; }

        [Display(Name = "số lượng")]
        [Range(-1, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal Quantity { get; set; } = -1;

        [Display(Name = "số lượng đã bán")]
        [Range(0, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal QuantitySold { get; set; }

        [Display(Name = "số lượng vé")]
        [Range(1, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal NumberofTickets { get; set; } = 1;

    }
}
