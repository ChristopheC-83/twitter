import { useRef } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useModalsStore } from "../stores/useModalsStore";

export default function ModalSignUp({ closeModal }) {

const { modalSignUp, setModalSignUp } = useModalsStore();
  const login = useRef("");
  const email = useRef("");
  const password = useRef("");

  return (
    <div
      className="fixed inset-0 bg-neutral-800/50 midFlex text-neutral-50"
      onClick={closeModal}
    >
      <div
        className="relative w-4/5 max-w-[600px] px-10 py-8 mx-auto border-2 rounded-md  bg-neutral-900 border-neutral-500 "
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => closeModal()}
          className="absolute text-xl text-neutral-50 top-1 left-2"
        >
          X
        </button>
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
            type="email"
            placeholder="Votre email"
            name="email"
            ref={email}
            id="email"
            className="w-full p-4 my-2 border-2 rounded-lg bg-neutral-900 border-neutral-500"
          />
          <input
            type="password"
            placeholder="Votre mot de passe (6 caractères minimum)"
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
          <button
            // onClick={onBeforeSubmitHandler}
            className="px-4 py-2 mx-auto text-xl font-bold bg-green-500 rounded-full w-fit flexMid hover:bg-green-600 "
          >
            Je n'ai pas de compte, je m'inscris !
          </button>
        </form>
      </div>
    </div>
  );
}