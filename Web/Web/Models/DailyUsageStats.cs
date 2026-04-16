using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Web.Data;

namespace Web.Models
{
    [Table("DailyUsageStats")]
    public class DailyUsageStats
    {
        [Key]
        public int Id { set; get; }

        [Display(Name = "Ngày")]
        public DateOnly Date { set; get; }

        [Display(Name = "Anonymous ID")]
        [Required]
        [StringLength(255)]
        public string AnonymousId { set; get; } = "";

        [Display(Name = "Số lần dùng miễn phí")]
        public int FreeUsageCount { set; get; }

        [Display(Name = "Lần cuối dùng")]
        public DateTime LastUsedAt { set; get; }
    }
}