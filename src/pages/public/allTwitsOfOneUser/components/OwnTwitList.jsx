// La liste des twits de l'utilisateur


export default function OwnTwitList({user_id}) {

  // function fetchUserTweets(username="") {
  //   setLoading(true);
  //   fetch(
  //     "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/posts.json"
  //   )
  //     .then((response) => {
  //       console.log(response);
  //       if (!response.ok) {
  //         toast.error("Une erreur est survenue !");
  //       }
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //       setLoading(false);

  //       // Filtrer les tweets pour récupérer seulement ceux de l'utilisateur spécifié
        
  //       const userTweets = Object.values(data).filter(
  //         (tweet) => tweet.author === username
  //       );

  //       setTweets(userTweets);
  //     })
  //     .catch((error) => {
  //       setError(error);
  //       setLoading(false);
  //       toast.error(error);
  //     });
  // }

  // useEffect(() => {
  //   fetchUserTweets(idUser);
  // }, []);
console.log("ownTwitList : ", user_id);
  return (
    <div>
        {/* tweets de {user_id} */}
      
      
    </div>
  );
}
