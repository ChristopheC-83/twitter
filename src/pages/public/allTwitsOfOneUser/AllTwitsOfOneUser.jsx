//  Qd on clique sur le nom d'un user
// on arrive sur sa page perso
// son profil puis ses twits

import HeaderUser from "./components/HeaderUser";
import TweetsListOfUser from "./components/OwnTwitList";

import { useParams } from "react-router-dom";

export default function AllTwitsOfOneUser() {
  const { user_id } = useParams();
  console.log("user_id", user_id);

  return (
    <div>
      <HeaderUser user_id={user_id} />
      <TweetsListOfUser user_id={user_id} />
    </div>
  );
}
