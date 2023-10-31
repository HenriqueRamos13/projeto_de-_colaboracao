const Modal = ({ close, eventos, sendEventId }) => {
  return (
    <div
      className="relative z-[100]"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all w-[90%] h-[80vh]">
            <div className="h-[85%]">
              <div className="mt-3 text-center sm:mt-5 ">
                <div className="mt-2 w-full flex flex-row flex-wrap gap-4">
                  {eventos.map((e) => {
                    return (
                      <div
                        onClick={() => sendEventId(e.id)}
                        className="p-4 h-[150px] border border-gray-300 rounded-md hover:bg-gray-400 cursor-pointer flex flex-col items-center justify-around"
                      >
                        <img
                          src={e.imagem || "https://svgsilh.com/svg/309539.svg"}
                          alt={e.nome}
                          className="w-16 h-16"
                        />
                        <p>{e.nome}</p>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6 flex flex-row gap-4 justify-center">
              <button
                type="button"
                className="inline-flex w-[40%] justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                onClick={close}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
