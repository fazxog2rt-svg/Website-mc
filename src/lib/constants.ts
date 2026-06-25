export const SITE_CONFIG = {
  name: "SkyForge",
  tagline: "Forge Your Island, Build Your Legacy.",
  description: "Server Minecraft Skyblock Premium terbaik di Indonesia. Bergabung sekarang dan mulai petualanganmu!",
  serverIp: process.env.NEXT_PUBLIC_SERVER_IP ?? "basic-1.hexnityhost.my.id",
  serverPort: process.env.NEXT_PUBLIC_SERVER_PORT ?? "19986",
  bedrockPort: process.env.NEXT_PUBLIC_BEDROCK_PORT ?? "19132",
  discordUrl: process.env.NEXT_PUBLIC_DISCORD_INVITE ?? "https://discord.gg/3NAKrYaBgh",
  instagramUrl: "https://instagram.com/skyforge.id",
  tiktokUrl: "https://tiktok.com/@skyforge.id",
  youtubeUrl: "https://youtube.com/@skyforge",
  storeWhatsApp: process.env.NEXT_PUBLIC_WHATSAPP_STORE ?? "https://wa.me/message/BPHTIEBSHUBIF1?src=qr",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
} as const;

export const RANKS = [
  { id: "VIP", name: "VIP", color: "#55ff55", price: 50000, perks: ["Custom prefix [VIP]", "2x Island slots", "Fly in own island", "Access to /ec", "5 Crate Keys bonus"] },
  { id: "VIP_PLUS", name: "VIP+", color: "#ffff55", price: 100000, perks: ["Custom prefix [VIP+]", "3x Island slots", "Fly everywhere", "Access to /ec /pv", "10 Crate Keys bonus", "Pet slot +1"] },
  { id: "MVP", name: "MVP", color: "#55ffff", price: 200000, perks: ["Custom prefix [MVP]", "4x Island slots", "Fly everywhere", "Access to /ec /pv /back", "20 Crate Keys bonus", "Pet slot +2", "Exclusive MVP cosmetics"] },
  { id: "MVP_PLUS", name: "MVP+", color: "#ffaa00", price: 350000, perks: ["Custom prefix [MVP+]", "5x Island slots", "Fly everywhere", "All utility commands", "30 Crate Keys bonus", "Pet slot +3", "Exclusive MVP+ cosmetics", "Custom nickname colors"] },
] as const;

export const GAME_FEATURES = [
  { icon: "Island", title: "Custom Islands", description: "Buat dan kembangkan pulau unikmu dari nol" },
  { icon: "Sword", title: "Epic Dungeons", description: "Jelajahi dungeon custom dengan boss yang menantang" },
  { icon: "Coins", title: "Economy System", description: "Auction House, Bazaar, dan Player Shop yang lengkap" },
  { icon: "Star", title: "Skill System", description: "Level up 8 skill berbeda dengan progression yang dalam" },
  { icon: "Gem", title: "Custom Enchants", description: "Ratusan enchantment eksklusif yang tidak ada di server lain" },
  { icon: "Zap", title: "Pets & Minions", description: "Koleksi pet dan minion untuk membantu progressmu" },
] as const;

export const NAVIGATION_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Store", href: "/store" },
  { label: "Vote", href: "/vote" },
  { label: "Wiki", href: "/wiki" },
  { label: "News", href: "/news" },
  { label: "Leaderboard", href: "/leaderboard" },
  { label: "Community", href: "/community" },
] as const;
