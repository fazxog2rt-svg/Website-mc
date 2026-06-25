import axios from "axios";

export interface ServerStatus {
  online: boolean;
  players: { online: number; max: number; list?: string[] };
  version?: string;
  motd?: string;
  ping?: number;
  favicon?: string;
}

export interface PlayerInfo {
  uuid: string;
  username: string;
  skinUrl: string;
  headUrl: string;
}

export async function getServerStatus(host: string, port = 25565): Promise<ServerStatus> {
  try {
    const res = await axios.get(`https://api.mcsrvstat.us/3/${host}:${port}`, { timeout: 10000 });
    const data = res.data;
    return {
      online: data.online ?? false,
      players: { online: data.players?.online ?? 0, max: data.players?.max ?? 0, list: data.players?.list },
      version: data.version,
      motd: data.motd?.clean?.[0],
      ping: data.debug?.ping,
    };
  } catch {
    return { online: false, players: { online: 0, max: 0 } };
  }
}

export async function getPlayerByUsername(username: string): Promise<PlayerInfo | null> {
  try {
    const uuidRes = await axios.get(`https://api.mojang.com/users/profiles/minecraft/${username}`, { timeout: 8000 });
    const { id: uuid, name } = uuidRes.data;
    return {
      uuid,
      username: name,
      skinUrl: `https://crafatar.com/renders/body/${uuid}?scale=4&overlay`,
      headUrl: `https://crafatar.com/avatars/${uuid}?size=128&overlay`,
    };
  } catch {
    return null;
  }
}

export async function getPlayerByUUID(uuid: string): Promise<PlayerInfo | null> {
  try {
    const res = await axios.get(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid}`, { timeout: 8000 });
    const name = res.data.name;
    return {
      uuid,
      username: name,
      skinUrl: `https://crafatar.com/renders/body/${uuid}?scale=4&overlay`,
      headUrl: `https://crafatar.com/avatars/${uuid}?size=128&overlay`,
    };
  } catch {
    return null;
  }
}
