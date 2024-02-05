// Page avec le profil d'un utilisateur et seulement ses twits
//  si connecté et que c'est sa page, logo de modification de profil disponible => modal


import HeaderUser from "../../components/timeLineComponents/HeaderUser";
import OwnTwitList from "../../components/timeLineComponents/OwnTwitList";
import { useNavigate, useParams } from "react-router-dom";

export default function TimeLine() {
    // const { idUser } = useParams();
    // console.log(idUser);
  return (
    <div className="flex flex-col">
      <HeaderUser />
      <OwnTwitList />
      {/* <p>{idUser}</p> */}
    </div>
  );
}
