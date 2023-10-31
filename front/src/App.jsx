import { useEffect, useRef, useState } from "react";
import Court from "./components/Court";
// import Menus from "./components/Menus";
import Player from "./components/Player";
import Scoreboard from "./components/Scoreboard";
import Modal from "./components/Modal";

const TEAMS = [
  {
    name: "Team Blue 1",
    score: 0,
    color: "red",
  },
  {
    name: "Team Red 2",
    score: 0,
    color: "blue",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function App() {
  const [playersList1, setPlayersList1] = useState(false);
  const [players, setPlayers] = useState([]);
  const [game, setGame] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [selectedArea, setSelectedArea] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventos, setEventos] = useState([]);

  async function fetchEventos(tipo_de_jogo) {
    const response = await fetch(
      "http://localhost:3001/getEventos/" + tipo_de_jogo
    );
    const data = await response.json();
    setEventos(data.eventos);
  }

  async function fetchPlayers() {
    const response = await fetch("http://localhost:3001/getPlayers");
    const data = await response.json();
    setPlayers(data.jogadores);
  }

  async function getGame(id) {
    if (!id) {
      id = localStorage.getItem("gameId");
    }
    const response = await fetch(`http://localhost:3001/getGame/${id}`);
    const data = await response.json();
    setGame(data.game[0]);
    fetchPlayers();
    fetchEventos(data.game[0].tipo_de_jogo);
  }

  async function fetchCreateGame(body) {
    const response = await fetch("http://localhost:3001/createGame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    getGame(data.game.insertId);
    localStorage.setItem("gameId", data.game.insertId);
  }

  useEffect(() => {
    if (localStorage.getItem("gameId")) {
      getGame();
    }
  }, []);

  useEffect(() => {
    if (selectedEvent) {
      createGameEvent();
    }
  }, [selectedEvent]);

  async function proxTurn() {
    const response = await fetch("http://localhost:3001/updateGameTime", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: game.id, tempo: game.tempo + 1 }),
    });
    const data = await response.json();
    getGame(game.id);
  }

  async function finishGame() {
    const response = await fetch("http://localhost:3001/finishGame", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: game.id }),
    });
    const data = await response.json();
    getGame(localStorage.getItem("gameId"));
    localStorage.removeItem("gameId");

    window.location.reload();
  }

  async function createGameEvent() {
    const response = await fetch("http://localhost:3001/createGameEvent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        partida_id: game.id,
        jogador_id: selectedPlayer,
        evento_id: selectedEvent,
        area_campo: selectedArea,
      }),
    });
    const data = await response.json();
    getGame(game.id);
    setSelectedPlayer(null);
    setSelectedEvent(null);
    setSelectedArea(null);
  }

  return (
    <main>
      {selectedPlayer && selectedArea && (
        <Modal
          eventos={eventos}
          sendEventId={(id) => setSelectedEvent(id)}
          close={() => {
            setSelectedPlayer(null);
            setSelectedEvent(null);
            setSelectedArea(null);
          }}
        />
      )}
      <Scoreboard teams={TEAMS} createGame={fetchCreateGame} game={game} />
      <div className="w-full flex justify-between py-2 lg:hidden">
        <button
          className="bg-white hover:bg-gray-100 text-white font-bold py-2 px-4 rounded"
          onClick={() => setPlayersList1((p) => !p)}
        >
          <img
            src="https://cdn-icons-png.flaticon.com/512/2976/2976215.png"
            alt="menu toggle"
            className="w-6 h-6"
          />
        </button>
      </div>
      <div className="w-full flex flex-row justify-between items-start h-full">
        {/* overflow-y-scroll */}
        <div
          className={classNames(
            "bg-white border-1 shadow-md min-w-[230px] w-[20%] h-[100%] overflow-y-scroll z-50 no-scrollbar lg:pt-[0px] flex flex-col gap-2 items-center justify-around p-2 absolute transition-all",
            playersList1
              ? "left-0 lg:left-0"
              : "left-[-230px] lg:left-0 hidden lg:flex"
          )}
        >
          {players.map((player) => (
            <Player
              name={player.nome}
              number={player.numero_da_camisa}
              onClick={() =>
                selectedPlayer === player.id
                  ? setSelectedPlayer(null)
                  : setSelectedPlayer(player.id)
              }
              jogando={player.jogando}
              selected={selectedPlayer === player.id}
            />
          ))}
        </div>
        <div className="hidden lg:block lg:w-[20%]"></div>
        <div className="w-[100%] lg:w-[60%] h-[100%] lg:py-0 px-4">
          <Court
            setArea={(area) => (selectedPlayer ? setSelectedArea(area) : null)}
          />

          <span className="isolate inline-flex rounded-md shadow-sm w-full">
            <button
              type="button"
              className="relative w-[33%] h-16 -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
            >
              Jogadas
            </button>
            <button
              type="button"
              className="relative w-[33%] h-16 -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={proxTurn}
            >
              Próximo tempo
            </button>

            <button
              type="button"
              className="relative w-[33%] h-16 -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
              onClick={finishGame}
            >
              Fim de jogo
            </button>
          </span>
        </div>
        {/* <div
          className={classNames(
            "bg-white border-1 shadow-md min-w-[230px] w-[20%] h-[100%] overflow-y-scroll z-50 no-scrollbar lg:pt-[0px] flex flex-col gap-2 items-center justify-around p-2 absolute transition-all",
            playersList2
              ? "right-0 lg:right-0"
              : "right-[-230px] lg:right-0 hidden lg:flex"
          )}
        >
          <Player name="Player" number={1} />
          <Player name="Player" number={2} />
          <Player name="Player" number={3} />
          <Player name="Player" number={4} />
          <Player name="Player" number={5} />
          <Player name="Player" number={6} />
          <Player name="Player" number={7} />
          <Player name="Player" number={8} />
        </div> */}
        <div className="hidden lg:block lg:w-[20%]"></div>
      </div>
      {/* <Menus /> */}
    </main>
  );
}

export default App;
