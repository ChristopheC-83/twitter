// L'encart de présentation de l'utilisateur

import { useNavigate, useParams } from "react-router-dom";

export default function HeaderUser() {
  const { idUser } = useParams();
  console.log(idUser);

  return (
    <div>
      <div>{idUser}</div>
    </div>
  );
}
