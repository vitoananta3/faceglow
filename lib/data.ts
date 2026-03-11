// ─── SKIN PARAMS ───────────────────────────────────────
export const PARAMS = [
  { k: 'acne',        l: 'Jerawat',      ico: '🔴', inv: false, min: 10, max: 85 },
  { k: 'oil',         l: 'Minyak',       ico: '💧', inv: false, min: 20, max: 90 },
  { k: 'pore',        l: 'Pori-pori',    ico: '🔍', inv: false, min: 15, max: 80 },
  { k: 'hydration',   l: 'Hidrasi',      ico: '💦', inv: true,  min: 25, max: 90 },
  { k: 'elasticity',  l: 'Elastisitas',  ico: '⚡', inv: true,  min: 30, max: 88 },
  { k: 'dark',        l: 'Flek Gelap',   ico: '🌑', inv: false, min: 10, max: 75 },
  { k: 'redness',     l: 'Kemerahan',    ico: '❤️', inv: false, min: 8,  max: 70 },
  { k: 'wrinkle',     l: 'Kerutan',      ico: '〰️', inv: false, min: 5,  max: 60 },
  { k: 'dullness',    l: 'Kusam',        ico: '🌫️', inv: false, min: 15, max: 80 },
  { k: 'sensitivity', l: 'Sensitivitas', ico: '🌡️', inv: false, min: 10, max: 72 },
  { k: 'texture',     l: 'Tekstur',      ico: '🪨', inv: false, min: 12, max: 78 },
  { k: 'brightness',  l: 'Kecerahan',    ico: '✨', inv: true,  min: 22, max: 88 },
]

// ─── ZODIAC ────────────────────────────────────────────
export const ZODIACS = [
  { s: 'Aries',       e: '♈', t: 'Kulit Aries cenderung berenergi tinggi & rentan kemerahan di area pipi' },
  { s: 'Taurus',      e: '♉', t: 'Kulit Taurus cenderung kering namun kenyal — butuh extra hidrasi' },
  { s: 'Gemini',      e: '♊', t: 'Kulit Gemini kombinasi aktif — zona T lebih berminyak, pipi cenderung kering' },
  { s: 'Cancer',      e: '♋', t: 'Kulit Cancer sensitif & reaktif — perlu produk fragrance-free' },
  { s: 'Leo',         e: '♌', t: 'Kulit Leo berminyak & cerah alami — butuh kontrol sebum rutin' },
  { s: 'Virgo',       e: '♍', t: 'Kulit Virgo bersih & detail — cocok dengan rutinitas sistematis' },
  { s: 'Libra',       e: '♎', t: 'Kulit Libra seimbang namun mudah terpengaruh cuaca & stres' },
  { s: 'Scorpio',     e: '♏', t: 'Kulit Scorpio intense & berminyak — BHA adalah sahabat terbaikmu' },
  { s: 'Sagittarius', e: '♐', t: 'Kulit Sagittarius aktif & kering akibat paparan luar — sunscreen wajib' },
  { s: 'Capricorn',   e: '♑', t: 'Kulit Capricorn tahan lama namun kusam — perlu brightening rutin' },
  { s: 'Aquarius',    e: '♒', t: 'Kulit Aquarius sensitif terhadap perubahan lingkungan — barrier care prioritas' },
  { s: 'Pisces',      e: '♓', t: 'Kulit Pisces lembut & dehidrasi — HA & ceramide adalah kunci' },
]

export function getZodiac(day: string, month: string) {
  const d = parseInt(day), m = parseInt(month)
  const r: [number, number, string][] = [
    [3,21,'Aries'],[4,20,'Taurus'],[5,21,'Gemini'],[6,21,'Cancer'],
    [7,23,'Leo'],[8,23,'Virgo'],[9,23,'Libra'],[10,23,'Scorpio'],
    [11,22,'Sagittarius'],[12,22,'Capricorn'],[1,20,'Aquarius'],[2,19,'Pisces'],
  ]
  const mo = r.find(x => x[0] === m)
  if (!mo) return ZODIACS[m - 1] || ZODIACS[0]
  const idx = r.indexOf(mo)
  const name = d >= mo[1] ? mo[2] : r[(idx - 1 + 12) % 12][2]
  return ZODIACS.find(z => z.s === name) || ZODIACS[0]
}

// ─── UNDERTONE ─────────────────────────────────────────
export const UNDERTONE_D: Record<string, { desc: string; mk: Record<string, string> }> = {
  Warm:    { desc: 'Nuansa keemasan/kuning/peach. Urat nadi kehijauan. Earth tone & coral sangat flattering.', mk: { Foundation: 'Warm Beige / Honey Buff', Lipstik: 'Coral / Peach / Terracotta', Blush: 'Peach / Apricot', Eyeshadow: 'Bronze / Copper / Gold' } },
  Cool:    { desc: 'Nuansa kemerahan/pink/kebiruan. Urat nadi biru/ungu. Jewel tone — safir & emerald flattering.', mk: { Foundation: 'Porcelain / Rose Ivory', Lipstik: 'Mauve / Berry / Blue-Red', Blush: 'Baby Pink / Rosy', Eyeshadow: 'Taupe / Mauve / Lilac' } },
  Neutral: { desc: 'Mix warm & cool — paling fleksibel! Hampir semua warna cocok dari earth tone hingga jewel tone.', mk: { Foundation: 'Natural Beige / Sand', Lipstik: 'MLBB / Nude Pink', Blush: 'Dusty Rose / Mauve', Eyeshadow: 'Versatile — semua warna' } },
}

// ─── ROUTINES ──────────────────────────────────────────
export const ROUTINE_T: Record<string, string> = {
  Berminyak: '• Cleanser berbusa 2x/hari — pagi & malam\n• Non-comedogenic & oil-free wajib\n• Moisturizer gel ringan tetap harus pakai!\n• Clay mask 1–2x/minggu di zona T\n• Jangan over-cleanse — justru tambah minyak',
  Kering:    '• Double moisturize saat kulit masih lembab\n• Hindari cleanser berbusa kuat (SLS)\n• Face oil sebagai step terakhir malam\n• Minum 2L air/hari sangat berpengaruh\n• Humidifier di kamar membantu signifikan',
  Kombinasi: '• Produk berbeda untuk zona T vs pipi\n• Toner bebas alkohol, moisturizer gel-cream\n• Clay mask khusus zona T 1x/minggu\n• Lightweight serum cocok untuk semua area',
  Sensitif:  '• Less is more: 3–4 produk dasar saja\n• Patch test setiap produk baru 24 jam\n• Hindari wewangian, alkohol, exfoliant kuat\n• Centella asiatica & ceramide adalah fondasi\n• Perkenalkan produk baru satu per satu',
  Normal:    '• Pertahankan yang sudah bekerja!\n• Fokus SPF & hidrasi sebagai fondasi\n• Vitamin C pagi + retinol malam dosis rendah\n• Konsistensi >> eksperimen produk baru',
}

export const MORNING_ROUTINE: Record<string, string[]> = {
  Berminyak: ['Gentle foaming cleanser', 'Niacinamide toner', 'Water-based serum', 'Oil-free moisturizer', 'SPF 50 sunscreen'],
  Kering:    ['Creamy gentle cleanser', 'Hydrating toner', 'HA serum', 'Rich moisturizer', 'SPF 30+ sunscreen'],
  Kombinasi: ['Balanced pH cleanser', 'Alcohol-free toner', 'Vitamin C serum', 'Gel-cream moisturizer', 'SPF 45 sunscreen'],
  Sensitif:  ['Ultra-mild cleanser', 'Centella toner', 'Calming serum', 'Ceramide moisturizer', 'Mineral SPF 30'],
  Normal:    ['Gentle cleanser', 'Antioxidant toner', 'Vitamin C serum', 'Lightweight moisturizer', 'SPF 50 sunscreen'],
}

export const NIGHT_ROUTINE: Record<string, string[]> = {
  Berminyak: ['Double cleanse', 'BHA toner (2–3x/week)', 'Niacinamide 10% serum', 'Lightweight gel moisturizer', 'Spot treatment'],
  Kering:    ['Double cleanse', 'Hydrating toner (pat in)', 'HA serum', 'Rich night cream', 'Face oil (terakhir)'],
  Kombinasi: ['Double cleanse', 'BHA toner zona T', 'Hydrating serum pipi', 'Balanced moisturizer', 'Eye cream'],
  Sensitif:  ['Micellar water + gentle cleanser', 'Calming toner', 'Ceramide serum', 'Barrier repair moisturizer', 'Sleep mask 1–2x/week'],
  Normal:    ['Double cleanse', 'Exfoliating toner (2x/week)', 'Retinol serum (2x/week)', 'Night cream', 'Eye cream'],
}

// ─── PRODUCTS ──────────────────────────────────────────
export const PRODUCTS = [
  { id: 'p1',  n: 'Azarine Hydrasoothe Sunscreen SPF 45',        br: 'Azarine',       price: 35000,  pcat: 'sunscreen',   ingr: ['SPF 45 PA+++', 'Hyaluronic Acid', 'Centella'],       e: '☀️', r: 'Sunscreen ringan, non-greasy. Cocok untuk semua jenis kulit termasuk sensitif. Daily staple terbaik.' },
  { id: 'p2',  n: 'Wardah UV Shield Sunscreen SPF 50',           br: 'Wardah',        price: 42000,  pcat: 'sunscreen',   ingr: ['SPF 50 PA++++', 'Zinc Oxide', 'Niacinamide'],         e: '🛡️', r: 'SPF 50 PA++++ dengan niacinamide. Formula matte perfect untuk kulit berminyak.' },
  { id: 'p3',  n: 'Emina Sun Protection SPF 30',                  br: 'Emina',         price: 23000,  pcat: 'sunscreen',   ingr: ['SPF 30 PA+++', 'Vitamin E', 'Aloe Vera'],              e: '🌟', r: 'Sunscreen terjangkau, ringan & aman untuk kulit sensitif remaja.' },
  { id: 'p4',  n: 'Skintific 5x Ceramide Barrier Repair',        br: 'Skintific',     price: 89000,  pcat: 'moisturizer', ingr: ['Ceramide NP', 'Ceramide EOP', 'Peptide'],              e: '🏺', r: '5 jenis ceramide untuk repair barrier kulit. Terbaik untuk kulit kering & sensitif rusak.' },
  { id: 'p5',  n: 'Cetaphil Moisturizing Lotion',                 br: 'Cetaphil',      price: 115000, pcat: 'moisturizer', ingr: ['Glycerin', 'Dimethicone', 'Niacinamide'],              e: '💧', r: 'Dermatologist-recommended. Bebas pewangi, cocok untuk kulit sensitif & kondisi kulit kronis.' },
  { id: 'p6',  n: 'Hada Labo Gokujyun Moisturizing Milk',        br: 'Hada Labo',     price: 105000, pcat: 'moisturizer', ingr: ['Hyaluronic Acid 4x', 'Collagen', 'Urea'],              e: '🥛', r: '4 level HA untuk hidrasi super deep. Icon moisturizer Jepang terpercaya.' },
  { id: 'p7',  n: 'Somethinc Niacinamide 10% + Zinc 1%',         br: 'Somethinc',     price: 78000,  pcat: 'serum',       ingr: ['Niacinamide 10%', 'Zinc 1%', 'Hyaluronic Acid'],      e: '⚗️', r: 'Serum niacinamide paling cost-effective. Kontrol minyak, pori, & brightening dalam satu step.' },
  { id: 'p8',  n: 'The Originote Ceramide Centella Serum',       br: 'The Originote', price: 45000,  pcat: 'serum',       ingr: ['Ceramide', 'Centella Asiatica', 'Panthenol'],          e: '🌿', r: 'Serum calming terjangkau. Ceramide + centella untuk repair barrier dan redakan iritasi.' },
  { id: 'p9',  n: 'Skintific Multi Peptide Serum',               br: 'Skintific',     price: 95000,  pcat: 'serum',       ingr: ['6 Peptides', 'Retinol', 'Vitamin C'],                  e: '🔬', r: '6 peptide aktif untuk kolagen & anti-aging komprehensif.' },
  { id: 'p10', n: 'Avoskin Retinol + Alpha Arbutin Serum',       br: 'Avoskin',       price: 158000, pcat: 'serum',       ingr: ['Retinol 0.05%', 'Alpha Arbutin', 'HA'],                e: '⭐', r: 'Gold standard anti-aging lokal. Retinol 0.05% + alpha arbutin untuk beginner.' },
  { id: 'p11', n: 'Wardah Renew You Anti Aging Serum',           br: 'Wardah',        price: 68000,  pcat: 'serum',       ingr: ['Retinol', 'Vitamin C', 'Peptide'],                     e: '🔄', r: 'Paket lengkap anti-aging terjangkau. Retinol + vitamin C dalam satu serum.' },
  { id: 'p12', n: 'Scarlett Brightly Ever After Serum',          br: 'Scarlett',      price: 75000,  pcat: 'serum',       ingr: ['Niacinamide 8%', 'Alpha Arbutin', 'Tranexamic Acid'],  e: '💡', r: 'Triple brightening agent: niacinamide + alpha arbutin + tranexamic acid.' },
  { id: 'p13', n: 'Sensatia Botanicals Moisturizer',             br: 'Sensatia',      price: 138000, pcat: 'moisturizer', ingr: ['Jojoba Oil', 'Shea Butter', 'Vitamin E'],              e: '🌊', r: 'Moisturizer natural berbasis botanikal. Bebas bahan berbahaya, cocok untuk kulit sensitif ekstrem.' },
  { id: 'p14', n: 'Wardah Hydra Rose Water Toner',               br: 'Wardah',        price: 32000,  pcat: 'toner',       ingr: ['Rose Water', 'Glycerin', 'Aloe Vera'],                 e: '🌹', r: 'Toner hydrating dari rose water. Menyegarkan & lembapkan sekaligus. Budget-friendly.' },
  { id: 'p15', n: 'Somethinc BHA Pore Solution Toner',           br: 'Somethinc',     price: 75000,  pcat: 'toner',       ingr: ['BHA 0.5%', 'Niacinamide', 'Tea Tree'],                 e: '🔬', r: 'BHA ringan 0.5% untuk daily exfoliating toner. Bersihkan pori dari dalam.' },
  { id: 'p16', n: 'Senka Perfect Whip Foam Cleanser',            br: 'Senka',         price: 65000,  pcat: 'cleanser',    ingr: ['Silk Protein', 'Hyaluronic Acid', 'Double Wash'],      e: '🫧', r: 'Cleanser berbusa lembut dengan silk protein. Bersih tanpa dry. Icon cleanser terjangkau.' },
  { id: 'p17', n: 'Emina Acne Solution Cleanser',                br: 'Emina',         price: 26000,  pcat: 'cleanser',    ingr: ['Salicylic Acid 0.5%', 'Zinc', 'Tea Tree'],             e: '🧼', r: 'BHA cleanser terjangkau untuk kulit jerawat. Bersih deep tanpa iritasi.' },
  { id: 'p18', n: 'Cetaphil Gentle Skin Cleanser',               br: 'Cetaphil',      price: 98000,  pcat: 'cleanser',    ingr: ['Glycerin', 'Niacinamide', 'Panthenol'],                e: '🤍', r: 'Cleanser legendaris dermatologi. Bebas sabun, cocok untuk kulit sensitif dan kondisi atopik.' },
  { id: 'p19', n: 'Garnier Micellar Water Rose',                  br: 'Garnier',       price: 45000,  pcat: 'cleanser',    ingr: ['Micellar Technology', 'Rose Water', 'Glycerin'],       e: '🌸', r: 'Micellar water double-duty: angkat makeup + cleanse lembut. No-rinse formula.' },
  { id: 'p20', n: 'Somethinc BHA 2% Treatment',                  br: 'Somethinc',     price: 55000,  pcat: 'treatment',   ingr: ['Salicylic Acid 2%', 'Green Tea', 'Zinc'],              e: '🧪', r: 'BHA 2% konsentrasi penuh untuk jerawat stubborn & pori tersumbat.' },
  { id: 'p21', n: 'Skintific AHA BHA PHA Toner',                 br: 'Skintific',     price: 82000,  pcat: 'treatment',   ingr: ['AHA 5%', 'BHA 0.5%', 'PHA 3%'],                       e: '✨', r: 'Tri-acid exfoliation komprehensif. AHA permukaan + BHA dalam pori.' },
  { id: 'p22', n: 'Hanasui Niacinamide Brightening Serum',       br: 'Hanasui',       price: 19000,  pcat: 'serum',       ingr: ['Niacinamide 12%', 'Vitamin C', 'Alpha Arbutin'],       e: '🌟', r: 'Value terbaik di kategori brightening serum. Niacinamide 12% untuk harga 19rb.' },
  { id: 'p23', n: 'COSRX Snail Mucin 96% Essence',              br: 'COSRX',         price: 195000, pcat: 'serum',       ingr: ['Snail Mucin 96%', 'Sodium Hyaluronate', 'Betaine'],    e: '🐌', r: 'Snail mucin esensial untuk repair, hidrasi, dan anti-aging komprehensif.' },
  { id: 'p24', n: 'Pixi Glow Tonic AHA 5%',                     br: 'Pixi',          price: 178000, pcat: 'toner',       ingr: ['Glycolic Acid 5%', 'Aloe Vera', 'Calendula'],          e: '💧', r: 'AHA toner viral. Glycolic acid 5% untuk glow effect yang terlihat dalam 1 minggu.' },
  { id: 'p25', n: 'Avoskin Miraculous Retinol Ampoule',         br: 'Avoskin',       price: 165000, pcat: 'serum',       ingr: ['Retinol 0.05%', 'Alpha Arbutin', 'Niacinamide'],       e: '🔮', r: 'Retinol + alpha arbutin premium untuk hasil brightening & anti-aging terlihat nyata.' },
]

// ─── CHAT KNOWLEDGE BASE ───────────────────────────────
export const CHAT_KB = [
  { k: ['jerawat', 'acne', 'breakout', 'komedo'],
    r: '**Jerawat & Acne Care 🔴**\n\nJerawat terbentuk dari kombinasi minyak berlebih + bakteri + pori tersumbat.\n\n**Rutinitas anti-acne:**\n• Pagi: Gentle cleanser → Niacinamide toner → Oil-free moisturizer → SPF\n• Malam: Double cleanse → BHA toner → Niacinamide serum → Lightweight moisturizer\n\n**Bahan aktif terbukti:** Salicylic acid (BHA), Niacinamide, Zinc, Benzoyl peroxide\n\n⚠️ Hindari: scrub fisik, alkohol tinggi, dan memencet jerawat!',
    ps: ['p20', 'p7', 'p17', 'p15'] },
  { k: ['kering', 'dehidrasi', 'dry', 'kusam'],
    r: '**Kulit Kering & Dehidrasi 💧**\n\nKulit kering vs dehidrasi itu beda ya:\n• Kering = kurang produksi minyak (skin type)\n• Dehidrasi = kurang air dalam kulit (kondisi, bisa terjadi pada semua jenis kulit)\n\n**Tips:** Apply moisturizer saat kulit masih lembab (damp). Layering: toner → essence → serum → moisturizer → face oil\n\n**Bahan wajib:** Hyaluronic Acid, Ceramide, Glycerin, Squalane',
    ps: ['p4', 'p6', 'p14', 'p8'] },
  { k: ['minyak', 'oily', 'berminyak', 'sebum'],
    r: '**Kulit Berminyak ✨**\n\nMinyak berlebih bukan berarti harus dihilangkan semua! Kulit tetap butuh sebum.\n\n**Strategi:**\n• Jangan over-cleanse — justru memicu lebih banyak minyak\n• Tetap pakai moisturizer (gel-based)\n• Clay mask zona T 1–2x/minggu\n\n**Bahan aktif:** Niacinamide 10%, Zinc, BHA, Clay',
    ps: ['p7', 'p15', 'p2', 'p16'] },
  { k: ['sunscreen', 'spf', 'uv', 'tabir surya'],
    r: '**Sunscreen — Step Paling Penting! ☀️**\n\nSPF adalah anti-aging terbaik yang ada — beneran.\n\n**Panduan pilih:**\n• SPF 30 minimum daily, SPF 50 untuk outdoor\n• PA+++ atau lebih untuk proteksi UVA\n• Chemical sunscreen: lebih ringan di kulit\n• Mineral sunscreen: lebih aman untuk kulit sensitif\n• Reapply tiap 2 jam di luar ruangan!\n\n**Mitos:** Kulit gelap tidak perlu SPF — SALAH total!',
    ps: ['p1', 'p2', 'p3'] },
  { k: ['vitamin c', 'brightening', 'cerah', 'glowing', 'flek'],
    r: '**Brightening & Vitamin C ✨**\n\nVitamin C = brightening agent paling powerful.\n\n**Tips pakai Vit C:**\n• Gunakan pagi hari sebelum SPF\n• Mulai dari konsentrasi rendah (5–10%)\n• Simpan di tempat gelap & sejuk — mudah teroksidasi\n• Kombinasi terbaik: Vit C + Niacinamide + SPF\n\n**Alternatif:** Alpha Arbutin, Tranexamic Acid, Niacinamide',
    ps: ['p12', 'p22', 'p21'] },
  { k: ['retinol', 'aging', 'kerutan', 'anti aging'],
    r: '**Retinol & Anti-Aging ⭐**\n\nRetinol = gold standard anti-aging yang sudah terbukti.\n\n**Cara mulai retinol:**\n• Mulai dari 0.025–0.05% dulu, naik perlahan\n• Pakai malam hari saja\n• Sandwich method: moisturizer → retinol → moisturizer\n• Butuh 8–12 minggu untuk lihat hasil nyata\n• Wajib SPF keesokan harinya!\n\n⚠️ Jangan mix dengan AHA/BHA di awal',
    ps: ['p10', 'p25', 'p9'] },
  { k: ['pori', 'pore', 'blackhead'],
    r: '**Pori-pori & Blackhead 🔍**\n\nPori tidak bisa "diperkecil" permanen, tapi tampilan bisa diminimalkan.\n\n**Cara efektif:**\n• BHA (salicylic acid) masuk ke dalam pori — wajib\n• Niacinamide mengencangkan tampilan pori\n• Clay mask menyerap sebum berlebih\n• Jangan pakai pore strip — merusak skin barrier!\n\n**Rutinitas:** BHA toner 2–3x/minggu + niacinamide daily',
    ps: ['p15', 'p7', 'p20', 'p21'] },
  { k: ['sensitif', 'iritasi', 'merah', 'redness'],
    r: '**Kulit Sensitif & Iritasi 🌡️**\n\nKulit sensitif butuh perlakuan extra gentle.\n\n**Prinsip utama:**\n• Less is more — 3-4 produk basic saja\n• Patch test setiap produk baru selama 24 jam\n• Hindari: fragrance, alkohol, exfoliant kuat\n• Centella asiatica & ceramide = fondasi utama\n• Perkenalkan produk baru SATU PER SATU\n\nKalau ada kemerahan terus-menerus, sebaiknya konsul ke dokter kulit ya.',
    ps: ['p4', 'p8', 'p18', 'p1'] },
]

// ─── LEADERBOARD ───────────────────────────────────────
export const LEADERBOARD = [
  { rank: 1, name: 'Sari W.',  city: 'Jakarta',    days: 28, improvement: '+31', badge: '👑' },
  { rank: 2, name: 'Maya P.', city: 'Surabaya',   days: 26, improvement: '+28', badge: '🌟' },
  { rank: 3, name: 'Rini A.', city: 'Bandung',    days: 25, improvement: '+24', badge: '💫' },
  { rank: 4, name: 'Nita S.', city: 'Yogyakarta', days: 23, improvement: '+21', badge: '✨' },
  { rank: 5, name: 'Lina D.', city: 'Bali',       days: 20, improvement: '+19', badge: '🌸' },
]

// ─── REVIEWS ───────────────────────────────────────────
export const LAND_REVIEWS = [
  { name: 'Anisa R.',  city: 'Jakarta',   stars: 5, text: '"Akurasi analisisnya lebih detail dari konsultasi klinik! Rekomendasinya semua produk lokal yang terjangkau."' },
  { name: 'Putri M.', city: 'Surabaya',  stars: 5, text: '"Sudah 28 hari challenge, jerawat berkurang drastis! Face map-nya bantu banget paham area mana yang perlu perhatian."' },
  { name: 'Dewi K.',  city: 'Bandung',   stars: 5, text: '"AI Beauty Coach-nya beneran ngerti kulitku. Skor naik dari 58 ke 76 dalam 3 minggu pakai rutinitas yang direkomendasikan."' },
]

// ─── HELPER FUNCTIONS ──────────────────────────────────
export function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function barColor(v: number, inv: boolean): string {
  if (inv) return v >= 65 ? '#5bb891' : v >= 40 ? '#e8b84b' : '#d42e52'
  return v <= 30 ? '#5bb891' : v <= 55 ? '#e8b84b' : '#d42e52'
}

export function barLabel(v: number, inv: boolean): string {
  if (inv) return v >= 65 ? 'Sangat Baik' : v >= 40 ? 'Cukup Baik' : 'Perlu Ditingkatkan'
  return v <= 30 ? 'Rendah (Baik)' : v <= 55 ? 'Sedang' : 'Tinggi (Perhatian)'
}

export function scoreGrade(s: number): { label: string; color: string } {
  if (s >= 88) return { label: 'Sangat Sehat ✨', color: '#5bb891' }
  if (s >= 72) return { label: 'Kulit Sehat 🌟',  color: '#5bb891' }
  if (s >= 56) return { label: 'Butuh Perhatian 💛', color: '#e8b84b' }
  if (s >= 40) return { label: 'Perlu Intensif 🧡', color: '#e09020' }
  return { label: 'Perlu Penanganan ❤️', color: '#d42e52' }
}

export function skinAgeMsg(realAge: number, skinAge: number): string {
  const d = skinAge - realAge
  if (d <= -3) return `Kulitmu terlihat ${Math.abs(d)} tahun LEBIH MUDA dari usia aslimu — luar biasa!`
  if (d <= 1)  return `Usia kulitmu sesuai usiamu. Kondisi baik — dengan konsistensi bisa lebih muda!`
  if (d <= 4)  return `Kulitmu terlihat ${d} tahun lebih tua. Fokus: vitamin C pagi, retinol malam, SPF konsisten!`
  return `Kulitmu terlihat ${d} tahun lebih tua. Sunscreen + tidur cukup + air = kombinasi anti-aging terbaik!`
}
