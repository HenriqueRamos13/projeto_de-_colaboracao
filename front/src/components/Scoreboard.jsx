import React, { useState } from "react";

const Scoreboard = ({ game, teams, createGame }) => {
  const {
    adversario: adversarioNome,
    pontuacao_rival,
    pontuacao,
    tempo,
  } = game || {};
  const [adversario, setAdversario] = useState("");
  const [tipo_de_jogo, setTipo_de_jogo] = useState("basket");

  return (
    <div className="w-full h-[92px] flex flex-row items-center justify-between p-2 px-8 bg-white shadow-lg">
      <div className="w-[40%] flex flex-row items-center justify-around">
        <img
          className="h-10 w-10 rounded-full"
          src={
            "https://images.trustinnews.pt/uploads/sites/5/2023/04/23472567.jpg"
          }
          alt=""
        />
        <h2 className="text-sm lg:text-xl">{teams[0].name}</h2>
      </div>
      <div className="w-[20%] flex flex-col items-center justify-between">
        <div className="w-[20%] flex flex-row items-center justify-center h-[50%]">
          <h2 className="text-md lg:text-2xl">{pontuacao || 0}</h2>
          <h2 className="text-md lg:text-2xl">-</h2>
          <h2 className="text-md lg:text-2xl">{pontuacao_rival || 0}</h2>
        </div>
        <div className="h-[50%] flex flex-row items-center justify-center">
          {tempo && <h2 className="text-md lg:text-xl">{tempo}nd Quarter</h2>}
        </div>
      </div>
      <div className="w-[40%] flex flex-row items-center justify-around">
        {adversarioNome ? (
          <>
            <h2 className="text-sm lg:text-xl">{adversarioNome}</h2>
            <img
              className="h-10 w-10 rounded-full"
              src={
                "https://play-lh.googleusercontent.com/ue88El81ZXdm4YPNcsn3No7VYnh9ZEWwJYNbCTxM6_K1cLfpezsLS6fOxwQR1Z9kEms"
              }
              alt=""
            />
          </>
        ) : (
          <div className="flex flex-row items-center gap-2">
            <label
              for="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Nome do time adversário
            </label>
            <div className="mt-2">
              <input
                type="adversario"
                name="adversario"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Time adversario"
                onChange={(e) => setAdversario(e.target.value)}
                value={adversario}
              />
            </div>
            <button
              type="button"
              className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() =>
                createGame({
                  adversario,
                  tipo_de_jogo,
                  data_de_inicio: Date.now(),
                  tempo: 1,
                })
              }
            >
              Iniciar Jogo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scoreboard;
