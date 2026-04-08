using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Web.Models
{
    public enum OrderStatus
    {
        PendingPayment,
        Paid,
        PaymentFailed,
        Expired
    }

    [Table("Order")]
    public class Order
    {
        [Key]
        public int OrderId { set; get; }

        [Required(ErrorMessage = "Phải có mã giao dịch")]
        [Display(Name = "Mã giao dịch")]
        [StringLength(255)]
        public string TxnRef { set; get; } = string.Empty;

        [Required]
        public int ProductId { set; get; }

        [Display(Name = "Số lượng")]
        [Range(1, int.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public int Quantity { get; set; } = 1;

        [Display(Name = "Đơn giá")]
        [Range(0, double.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal UnitPrice { get; set; }

        [Display(Name = "Tổng tiền")]
        [Range(0, double.MaxValue, ErrorMessage = "Giá trị từ {1} đến {2}")]
        public decimal TotalAmount { get; set; }

        [Display(Name = "Trạng thái")]
        public OrderStatus Status { get; set; } = OrderStatus.PendingPayment;

        [Display(Name = "Ngày tạo")]
        public DateTime DateCreated { set; get; }

        [Display(Name = "Ngày cập nhật")]
        public DateTime DateUpdated { set; get; }

        [Display(Name = "Mã giao dịch VNPay")]
        [StringLength(255)]
        public string? VnpayTransactionNo { set; get; }

        [Display(Name = "Mã phản hồi VNPay")]
        [StringLength(50)]
        public string? VnpayResponseCode { set; get; }

        [Display(Name = "Trạng thái VNPay")]
        [StringLength(50)]
        public string? VnpayTransactionStatus { set; get; }

        public int? TicketId { set; get; }

        [ForeignKey(nameof(ProductId))]
        public Product? Product { set; get; }

        [ForeignKey(nameof(TicketId))]
        public Ticket? Ticket { set; get; }
    }
}