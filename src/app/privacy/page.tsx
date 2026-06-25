import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy - SkyForge" };
export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 max-w-3xl py-24">
      <h1 className="text-3xl font-black text-white mb-6">Privacy Policy</h1>
      <div className="prose prose-invert text-white/70 space-y-4 text-sm leading-relaxed">
        <p>SkyForge menghargai privasi pemain. Kami hanya mengumpulkan data yang diperlukan untuk operasional server.</p>
        <h2 className="text-white font-bold text-lg">Data yang Dikumpulkan</h2>
        <p>Username Minecraft, UUID, dan data gameplay untuk keperluan leaderboard dan fitur server.</p>
        <h2 className="text-white font-bold text-lg">Keamanan Data</h2>
        <p>Data kamu aman dan tidak dibagikan ke pihak ketiga tanpa izin.</p>
        <h2 className="text-white font-bold text-lg">Kontak</h2>
        <p>Pertanyaan terkait privasi dapat diajukan melalui Discord server SkyForge.</p>
      </div>
    </div>
  );
}
