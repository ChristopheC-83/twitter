//  Qd on clique sur le nom d'un user
// on arrive sur sa page perso
// son profil puis ses twits

import HeaderUser from "../components/HeaderUser";
import TweetsListOfUser from "../components/TweetsListOfUser";


import { useParams } from "react-router-dom";

export default function AllTwitsOfOneUser() {

  const { user_id } = useParams();
  console.log("user_id", user_id);

  return (
    <div>
      {/* <HeaderUser author={user_id} />
      <TweetsListOfUser author={user_id} /> */}
    </div>
  );
}
