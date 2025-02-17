import { useState } from "react";
import "./arcadePixelArt.scss";
import pedraImg from "../../assets/pedra.png";
import papelImg from "../../assets/papel.png";
import tesouraImg from "../../assets/tesoura.png";
import lagartoImg from "../../assets/lagarto.png";
import spockImg from "../../assets/spock.png";

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

const ArcadePixelArt: React.FC = () => {
  const [zoom, setZoom] = useState(false);
  const [started, setStarted] = useState(false);
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string>("");

  const [, setRolling] = useState<boolean>(false);

  const handleChoice = (choice: string): void => {
    setRolling(true);
    setTimeout(() => {
      const computer = getComputerChoice();
      setPlayerChoice(choice);
      setComputerChoice(computer);
      setResult(determineWinner(choice, computer));
      setRolling(false);
    }, 1000);
  };

  const handleZoom = () => {
    setZoom(true);
    setStarted(true);
  };

  const handleZoomOut = () => {
    setZoom(false);
    setStarted(false);
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  const handleResetGame = () => {
    setPlayerChoice(null);
    setComputerChoice(null);
    setResult("");
  };

  return (
    <div className={`arcade-container ${zoom ? "zoomed" : ""}`}>
      <ul className="icons">
        <li className="icons--arcade">
          <div className="screen">
            {!started ? (
              <button onClick={handleZoom} className="start-button">
                START
              </button>
            ) : (
              <>
                <div className="game">
                  {!playerChoice ? (
                    <>
                      <span className="text">FAÇA SUA ESCOLHA:</span>
                      <br />
                      <div className="images">
                        {choices.map((choice) => (
                          <div key={choice} className="choice">
                            <img
                              src={images[choice]}
                              alt={choice}
                              className="img"
                            />
                            <button
                              key={choice}
                              onClick={() => handleChoice(choice)}
                              className="choice-button"
                            >
                              {choice}
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="result-display">
                        <div className="player-side">
                          <span className="label">Você</span>
                          <img
                            src={images[playerChoice]}
                            alt={playerChoice}
                            className="chosen-img"
                          />
                          <span className="option-name">{playerChoice}</span>
                        </div>
                        <span className="vs">vs.</span>
                        <div className="computer-side">
                          <span className="label">PC</span>
                          <img
                            src={images[computerChoice!]}
                            alt={computerChoice!}
                            className="chosen-img"
                          />
                          <span className="option-name">{computerChoice}</span>
                        </div>
                      </div>
                      <div className="result">{result}</div>
                    </>
                  )}
                </div>
                {result ? (
                  <button onClick={handleResetGame} className="info-button">
                    TRY AGAIN
                  </button>
                ) : (
                  <button className="info-button">HOW TO PLAY</button>
                )}

                <button onClick={handleZoomOut} className="stop-button">
                  STOP
                </button>
              </>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ArcadePixelArt;
