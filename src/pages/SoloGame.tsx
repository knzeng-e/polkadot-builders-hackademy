import { useState, useEffect } from "react";
import type { Move, Round, RoundResult } from "../types.ts";
import {
    determineWinner, pointsForResult, randomMove,
    appendGame,
} from "../utils.ts";

const MOVE_EMOJI: Record<Move, string> = { rock: "✊", paper: "✋", scissors: "✌️" };
const RESULT_TEXT: Record<RoundResult, string> = { win: "You win!", loss: "You lose!", draw: "Draw!" };
const BEST_OF = 3;

function forcedLossMove(opponent: Move): Move {
    if (opponent === "rock") return "scissors";
    if (opponent === "paper") return "rock";
    return "paper";
}

export default function SoloGame({ account, onDone }: {
    account: { address: string };
    onDone: () => void;
}) {
    const [rounds, setRounds] = useState<Round[]>([]);
    const [pendingOpponentMove, setPendingOpponentMove] = useState<Move>(randomMove());
    const [selectedMove, setSelectedMove] = useState<Move | null>(null);
    const [currentRound, setCurrentRound] = useState<Round | null>(null);
    const [countdown, setCountdown] = useState(10);
    const [timedOutRound, setTimedOutRound] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [saved, setSaved] = useState(false);

    const playerWins = rounds.filter(r => r.result === "win").length;
    const computerWins = rounds.filter(r => r.result === "loss").length;
    const roundNumber = rounds.length + 1;
    const overallResult: RoundResult = playerWins > computerWins ? "win" : computerWins > playerWins ? "loss" : "draw";
    const pts = pointsForResult(overallResult);
    const needed = Math.ceil(BEST_OF / 2);

    const startNewRound = () => {
        setPendingOpponentMove(randomMove());
        setSelectedMove(null);
        setCurrentRound(null);
        setTimedOutRound(false);
        setCountdown(10);
    };

    useEffect(() => {
        if (gameOver || currentRound || selectedMove) return;
        const interval = setInterval(() => {
            setCountdown(prev => Math.max(prev - 1, 0));
        }, 1000);
        return () => clearInterval(interval);
    }, [gameOver, currentRound, selectedMove]);

    useEffect(() => {
        if (countdown !== 0) return;
        if (gameOver || currentRound || selectedMove) return;
        const playerMove = forcedLossMove(pendingOpponentMove);
        const round: Round = {
            playerMove,
            opponentMove: pendingOpponentMove,
            result: "loss",
        };
        revealRound(round, true);
    }, [countdown, currentRound, selectedMove, gameOver, pendingOpponentMove]);

    const revealRound = (round: Round, timedOut = false) => {
        setTimedOutRound(timedOut);
        setSelectedMove(round.playerMove);
        setCurrentRound(round);
        setCountdown(0);

        setTimeout(async () => {
            const newRounds = [...rounds, round];
            setRounds(newRounds);
            setCurrentRound(null);

            const w = newRounds.filter(r => r.result === "win").length;
            const l = newRounds.filter(r => r.result === "loss").length;
            const finished = w >= needed || l >= needed || newRounds.length >= BEST_OF;

            if (finished) {
                setGameOver(true);
                const finalResult: RoundResult = w > l ? "win" : l > w ? "loss" : "draw";
                const finalPts = pointsForResult(finalResult);
                await appendGame(account.address, {
                    rounds: newRounds,
                    result: finalResult,
                    pointsChange: finalPts,
                    timestamp: Math.floor(Date.now() / 1000),
                });
                setSaved(true);
            } else {
                startNewRound();
            }
        }, 1400);
    };

    const pickMove = (move: Move) => {
        if (currentRound || gameOver) return;
        const result = determineWinner(move, pendingOpponentMove);
        const round: Round = { playerMove: move, opponentMove: pendingOpponentMove, result };
        revealRound(round);
    };

    return (
        <div className="game-page">
            <h2>Solo - Best of {BEST_OF}</h2>

            <div className="score-display">
                <div>You: <span>{playerWins}</span></div>
                <div>Round <span>{Math.min(roundNumber, BEST_OF)}</span>/{BEST_OF}</div>
                <div>CPU: <span>{computerWins}</span></div>
            </div>

            <div className="round-status">
                <div className="choice-card">
                    <div className="choice-title">You</div>
                    <div className="choice-display">
                        {selectedMove ? MOVE_EMOJI[selectedMove] : "?"}
                    </div>
                    <div className="choice-label">
                        {selectedMove ? selectedMove : "Select your move"}
                    </div>
                </div>

                <div className={`choice-card opponent ${selectedMove ? "" : "blurred-choice"}`}>
                    <div className="choice-title">Computer</div>
                    <div className="choice-display">{MOVE_EMOJI[pendingOpponentMove]}</div>
                    <div className="choice-label">
                        {selectedMove ? "Revealed" : "Choice committed"}
                    </div>
                </div>
            </div>

            {!gameOver && !currentRound && (
                <>
                    <div className={`timer ${countdown <= 3 ? "fast" : ""}`}>Time left: {countdown}s</div>
                    <div className="status-note">Pick a move within 10 seconds or the round is automatically lost.</div>
                    <div className="move-picker">
                        {(["rock", "paper", "scissors"] as Move[]).map(m => (
                            <div key={m}>
                                <button className="move-btn" onClick={() => pickMove(m)}>
                                    {MOVE_EMOJI[m]}
                                </button>
                                <div className="move-label">{m}</div>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {currentRound && (
                <div className="round-result">
                    <div className="round-result-moves">
                        <span>{MOVE_EMOJI[currentRound.playerMove]}</span>
                        <span className="round-result-vs">VS</span>
                        <span>{MOVE_EMOJI[currentRound.opponentMove]}</span>
                    </div>
                    <div className={`round-result-text ${currentRound.result}`}>
                        {timedOutRound
                            ? "Time’s up — round lost"
                            : RESULT_TEXT[currentRound.result]}
                    </div>
                </div>
            )}

            {gameOver && (
                <div className="round-result">
                    <div className={`round-result-text ${overallResult}`} style={{ fontSize: 24, marginBottom: 8 }}>
                        {overallResult === "win" ? "You won the match!" :
                         overallResult === "loss" ? "You lost the match!" : "Match drawn!"}
                    </div>
                    <div style={{ fontSize: 14, color: "var(--text2)", marginBottom: 16 }}>
                        {playerWins} - {computerWins} ({pts > 0 ? `+${pts}` : pts} pts)
                    </div>

                    <div className="history-card-rounds" style={{ justifyContent: "center", marginBottom: 16 }}>
                        {rounds.map((r, i) => (
                            <span key={i} className="round-badge">
                                {MOVE_EMOJI[r.playerMove]} vs {MOVE_EMOJI[r.opponentMove]}
                            </span>
                        ))}
                    </div>

                    {saved && <div className="status" style={{ color: "var(--success)" }}>Saved to network</div>}

                    <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                        <button className="btn btn-primary" onClick={onDone}>
                            Home
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
