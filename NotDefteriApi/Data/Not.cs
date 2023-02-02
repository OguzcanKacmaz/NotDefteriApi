using System.ComponentModel.DataAnnotations;

namespace NotDefteriApi.Data
{
    public class Not
    {
        public int Id { get; set; }
        [MaxLength(200)]
        public string Baslik { get; set; } = null!;
        public string? Icerik { get; set; } = string.Empty;
        public DateTime OlusturulmaZamani { get; set; } = DateTime.Now;
        public DateTime DegistirmeZamani { get; set; } = DateTime.Now;
    }
}
