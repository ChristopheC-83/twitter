import { useRef } from "react";
import { Toaster, toast } from "sonner";
import { useNavigate } from "react-router-dom";
// import { useModalsStore } from "../stores/useModalsStore";

export default function ModalFormPost({ closeModal }) {
  const navigate = useNavigate();
  // const { modalPost, setModalPost } = useModalsStore();

  // refs
  const text = useRef("");
  const img = useRef("");
  const author = useRef("");
  const date = useRef("");
  const comments = useRef([]);
  const likes = useRef(0);
  const hashtags = useRef([]);

  // functions

  const onBeforeSubmitHandler = (e) => {
    e.preventDefault();
    // let isValid = true;
    if (!text.current.value) {
      toast.error("Le texte est obligatoire");
      // isValid = false;
    }

    createPost();
  };

  const createPost = async () => {
    const newPost = {
      id:null,
      text: text.current.value,
      img: img.current.value,
      author: author.current.value,
      date: date.current.value,
      comments: ["Sois le premier à commenter ce post !"],
      likes: 0,
      hashtags: [""],
    };

    const response = await fetch(
      "https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/posts.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      }
    );

    //if Error
    if (!response.ok) {
      toast.error("Un erreur est survenue !");
      return;
    }
    // get id
    const {name : idTwit} = await response.json();

    // const updatedPost = {
    //   ...newPost,
    //   id: idTwit, // Update the id field with the received ID
    // };
  
    // Perform a PATCH request to update the tweet with the new ID
    const updateResponse = await fetch(
      `https://twitest-9f90c-default-rtdb.europe-west1.firebasedatabase.app/posts/${idTwit}.json`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idTwit }), // You can update other fields if needed
      }
    );
  
    // If there is an error in the update
    if (!updateResponse.ok) {
      toast.error("Un erreur est survenue lors de la mise à jour !");
      return;
    }
  
    // Continue with your logic after successful creation and update
    // setModalPost(false);
    closeModal()
    navigate(`/`);
    window.location.reload()
  
  };

  return (
    <div
      className="fixed inset-0 bg-neutral-800/70 midFlex text-neutral-50"
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
          <p className="mb-4 text-2xl text-center">
            Salut <i>Utilisateur</i>
          </p>
          <textarea
            className="w-full p-2 text-base resize-none md:text-lg sm:text-md h-72 font-semi-bold bg-neutral-900"
            placeholder="Dis nous tout !"
            ref={text}
            name="text"
          ></textarea>
          <input
            type="text"
            placeholder="Lien vers une image"
            id="img"
            ref={img}
            name="img"
            className="w-full p-4 rounded-lg bg-neutral-900 "
          />
          <input
            type="hidden"
            name="author"
            ref={author}
            id="author"
            value={author === "" ? author : "kiki"}
          />
          <input
            type="hidden"
            name="date"
            ref={date}
            id="date"
            value={Date.now()}
          />
          <button
            onClick={onBeforeSubmitHandler}
            className="px-4 py-2 ml-auto text-xl font-bold bg-blue-500 rounded-full w-fit flexMid hover:bg-blue-600 "
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}
