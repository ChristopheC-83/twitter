import { useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useModalsStore } from "../stores/useModalsStore";
import { createPortal } from "react-dom";
import ModalRegister from "./ModalRegister";

export default function ModalConnection({ closeModal }) {
  const {
    modalRegister,
    setModalRegister,
    modalConnection,
    setModalConnection,
  } = useModalsStore();

  const [modalConnectionHidden, setModalConnectionHidden] = useState(false);

  const login = useRef("");
  const email = useRef("");
  const password = useRef("");

  function switchModals() {
    setModalConnection(true);
    setModalRegister(true);
    setModalConnectionHidden(true);
  }

  return (
    <div
      className={`fixed inset-0 pt-12 z-20 bg-neutral-800/70 midFlex text-neutral-50
      ${
        modalConnectionHidden && "hidden"
      }
      `}
      onClick={closeModal}
    >
      <div
        className="relative w-11/12  max-w-[600px] px-4 md:px-10 py-8 mx-auto border-2 rounded-md  bg-neutral-900 border-neutral-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => closeModal()}
          className="absolute text-xl text-neutral-50 top-1 left-2"
        >
          X
        </button>
        <h2 className="mb-6 text-3xl font-semibold text-center">
          Connectez-vous !
        </h2>
        <form>
          <input
            type="text"
            placeholder="Votre pseudo"
            id="login"
            ref={login}
            name="login"
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />

          <input
            type="password"
            placeholder="Votre mot de passe"
            name="password"
            ref={password}
            id="password"
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />
          <button
            // onClick={onBeforeSubmitHandler}
            className="px-4 py-2 mx-auto my-10 text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600 "
          >
            Je me connecte
          </button>
        </form>
        <button
          onClick={() => switchModals()}
          className="px-4 py-2 mx-auto text-xl font-bold bg-green-500 rounded-full w-fit flexMid hover:bg-green-600 "
        >
          Je n'ai pas de compte, je m'inscris !
        </button>
      </div>
      {modalRegister &&
        createPortal(
          <ModalRegister closeModal={() => setModalRegister(false)} />,
          document.body
        )}
    </div>
  );
}
