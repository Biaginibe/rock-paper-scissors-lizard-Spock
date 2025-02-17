import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import pedraImg from "../../assets/pedra.png";
import papelImg from "../../assets/papel.png";
import tesouraImg from "../../assets/tesoura.png";
import lagartoImg from "../../assets/lagarto.png";
import spockImg from "../../assets/spock.png";
import "./rock-paper-scissors.modules.css";

const choices: string[] = ["Pedra", "Papel", "Tesoura", "Lagarto", "Spock"];
const images: { [key: string]: string } = {
  Pedra: pedraImg,
  Papel: papelImg,
  Tesoura: tesouraImg,
  Lagarto: lagartoImg,
  Spock: spockImg,
};

type RulesType = {
  [key: string]: string[];
};

const rules: RulesType = {
  Tesoura: ["Papel", "Lagarto"],
  Papel: ["Pedra", "Spock"],
  Pedra: ["Lagarto", "Tesoura"],
  Lagarto: ["Spock", "Papel"],
  Spock: ["Tesoura", "Pedra"],
};

const getComputerChoice = (): string => {
  return choices[Math.floor(Math.random() * choices.length)];
};

const determineWinner = (player: string, computer: string): string => {
  if (player === computer) return "Empate!";
  if (rules[player].includes(computer)) return "Você venceu!";
  return "Você perdeu!";
};

const Game: React.FC = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");
  const [rolling, setRolling] = useState<boolean>(false);
  const [displayedChoice, setDisplayedChoice] = useState<string>(choices[0]);

  useEffect(() => {
    if (rolling) {
      const interval = setInterval(() => {
        setDisplayedChoice(choices[Math.floor(Math.random() * choices.length)]);
      }, 100);
      setTimeout(() => clearInterval(interval), 3000);
      return () => clearInterval(interval);
    }
  }, [rolling]);

  const handleChoice = (choice: string): void => {
    setRolling(true);
    setTimeout(() => {
      const computer = getComputerChoice();
      setPlayerChoice(choice);
      setComputerChoice(computer);
      setResult(determineWinner(choice, computer));
      setRolling(false);
    }, 3000);
  };

  return (
    <div className="arcade-container">
      <div className="arcade-machine">
        <div className="arcade-screen">
          {rolling ? (
            <motion.img
              src={images[displayedChoice]}
              alt={displayedChoice}
              className="rolling-image"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.1 }}
            />
          ) : (
            playerChoice && (
              <div className="result-display">
                <p>Você escolheu:</p>
                <img
                  src={images[playerChoice]}
                  alt={playerChoice}
                  className="choice-image"
                />
                <p>O computador escolheu:</p>
                <img
                  src={images[computerChoice || "Pedra"]}
                  alt={computerChoice || "Pedra"}
                  className="choice-image"
                />
                <p className="result-text">{result}</p>
              </div>
            )
          )}
        </div>
        <div className="arcade-controls">
          <div className="arcade-buttons">
            {choices.map((choice) => (
              <div key={choice} className="choice">
                <button
                  key={choice}
                  onClick={() => handleChoice(choice)}
                  className="arcade-button"
                  disabled={rolling}
                >
                  {choice}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
