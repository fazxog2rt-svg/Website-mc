import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Service - SkyForge" };
export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-24">
      <h1 className="text-3xl font-black text-white mb-6">Terms of Service</h1>
      <div className="prose prose-invert text-white/70 space-y-4 text-sm leading-relaxed">
        <p>Dengan bermain di SkyForge, kamu menyetujui syarat dan ketentuan berikut.</p>
        <h2 className="text-white font-bold text-lg">Aturan Umum</h2>
        <p>Dilarang menggunakan cheat, exploit, atau melakukan tindakan yang merugikan pemain lain.</p>
        <h2 className="text-white font-bold text-lg">Pembelian</h2>
        <p>Semua pembelian rank dan item bersifat final. Refund hanya dilakukan jika terjadi kesalahan teknis di pihak server.</p>
        <h2 className="text-white font-bold text-lg">Sanksi</h2>
        <p>Pelanggaran aturan dapat mengakibatkan mute, kick, atau ban permanen tanpa pemberitahuan sebelumnya.</p>
      </div>
    </div>
  );
}
