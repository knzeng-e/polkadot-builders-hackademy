import { useState, useEffect, useSyncExternalStore } from "react";
import {
    SignerManager,
    HostProvider,
    DevProvider,
    type SignerState,
} from "@parity/product-sdk-signer";
import { CloudStorageClient, createLazySigner } from "@parity/product-sdk-cloud-storage";
import type { Move, RoundResult, PlayerData, GameData } from "./types.ts";

// ---------------------------------------------------------------------------
// Signer Manager (Host API)
// ---------------------------------------------------------------------------

const PRODUCT_ID = "playground-tutorial.dot";

export const signerManager = new SignerManager({
    dappName: "playground-tutorial",
    createProvider: (type) => type === "host"
            ? new HostProvider({
                  productAccount: { dotNsIdentifier: PRODUCT_ID, derivationIndex: 0 },
              })
            : new DevProvider()
    
});

export function useSignerState(): SignerState {
   return useSyncExternalStore(
    (cb) => signerManager.subscribe(cb),
    () => signerManager.getState(),
  );
}

// ---------------------------------------------------------------------------
// Game helpers
// ---------------------------------------------------------------------------

export const short = (addr: string) => addr.slice(0, 6) + "..." + addr.slice(-4);

export function determineWinner(player: Move, opponent: Move): RoundResult {
    if (player === opponent) return "draw";
    if (
        (player === "rock" && opponent === "scissors") ||
        (player === "paper" && opponent === "rock") ||
        (player === "scissors" && opponent === "paper")
    ) {
        return "win";
    }
    return "loss";
}

export function pointsForResult(result: RoundResult): number {
    if (result === "win") return 2;
    if (result === "loss") return -1;
    return 0;
}

const MOVES: Move[] = ["rock", "paper", "scissors"];

export function randomMove(): Move {
    return MOVES[Math.floor(Math.random() * 3)];
}

// ---------------------------------------------------------------------------
// Bulletin Chain persistence
// ---------------------------------------------------------------------------

const CID_KEY = (addr: string) => `rps-game-cid:${addr}`;

let _storageClient: CloudStorageClient | null = null;

export async function getStorageClient(): Promise<CloudStorageClient> {
    if (!_storageClient) {
        _storageClient = await CloudStorageClient.create({
            environment: "summit",
            signer: createLazySigner(() => signerManager.getSigner()),
        });
    }
    return _storageClient;
}

export async function loadPlayerData(address: string): Promise<PlayerData> {
    try {
        const cid = localStorage.getItem(CID_KEY(address));
        if (cid) {
            const client = await getStorageClient();
            const bytes = await client.fetchBytes(cid);
            return JSON.parse(new TextDecoder().decode(bytes));
        }
    } catch { /* fall through */ }
    return {
        player: address,
        totalGames: 0, wins: 0, losses: 0, draws: 0, points: 0,
        games: [],
    };
}

export async function savePlayerData(data: PlayerData): Promise<void> {
    const bytes = new TextEncoder().encode(JSON.stringify(data));
    const client = await getStorageClient();
    const result = await client.store(bytes).send();
    if (!result.cid) throw new Error("upload returned no CID");
    localStorage.setItem(CID_KEY(data.player), result.cid.toString());
}

export async function appendGame(address: string, game: Omit<GameData, "id">): Promise<PlayerData> {
    const data = await loadPlayerData(address);
    const fullGame: GameData = { ...game, id: data.games.length + 1 };
    data.games.push(fullGame);
    data.totalGames++;
    if (game.result === "win") data.wins++;
    else if (game.result === "loss") data.losses++;
    else data.draws++;
    data.points += game.pointsChange;
    await savePlayerData(data);
    return data;
}
