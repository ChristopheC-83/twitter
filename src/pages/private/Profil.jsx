
//  profil d'un utilisateur 
//  avec la page timeline de l'utilisateur connecté, ce composant ne me semble plus utile.
// A effacer ?

import { auth } from "../../firebase-config";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { Navigate } from "react-router-dom";

export default function Profil() {
  // const navigate=useNavigate();
  const { currentUser, loading } = useContext(UserContext);

  if(!currentUser){
    return <Navigate to="/"/>
  }

  return(
    <>
     {!auth.currentUser ? <div>connectez-vous</div> : 
         
     
     <div>Page de profil
      
      
      
      
      
      
      
      
      
      
      
      
      
      </div>}
    </>
    )
}
