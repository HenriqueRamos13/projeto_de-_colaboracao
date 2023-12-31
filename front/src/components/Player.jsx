import React from "react";

const Player = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`w-full relative flex items-center space-x-3 rounded-lg border border-gray-300 px-6 py-5 shadow-sm focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:border-gray-400 
      ${
        props.selected
          ? "bg-blue-400"
          : props.jogando
          ? "bg-white"
          : "bg-gray-400"
      }
      `}
    >
      <div className="flex-shrink-0">
        <img
          className="h-10 w-10 rounded-full"
          src={
            "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <a href="#" className="focus:outline-none">
          <span className="absolute inset-0" aria-hidden="true" />
          <p className="text-sm font-medium text-gray-900">{props.name}</p>
          <p className="truncate text-sm text-gray-500">{props.number}</p>
        </a>
      </div>
    </div>
  );
};

export default Player;
