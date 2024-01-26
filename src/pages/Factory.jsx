import { useRef } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
import FormFactory from "../components/FormFactory";

export default function Factory() {
  const navigate = useNavigate();

  // les refs

  const name = useRef("");
  const hp = useRef("");
  const attack = useRef("");
  const defense = useRef("");
  const specialAttack = useRef("");
  const specialDefense = useRef("");
  const speed = useRef("");
  const image = useRef("");

  return (
    <div className="flex-grow text-center text-4xl p-8 pt-0">
      <Toaster position="bottom-center" richColors expand={true} />
      <h2 className="text-2xl md:text-4xl lg:text-6xl font-semibold text-center">
        La fabrique
      </h2>
    </div>
  );
}
