import { useEffect, useState } from "react";
import he from "he";
import LoadingComponent from "../../pages/commonsComponents/toolsComponents/LoadingComponent";

export default function BlogPart() {
  const [blogState, setBlogState] = useState({
    loading: false,
    error: false,
    data: "",
  });

  useEffect(() => {
    setBlogState({ ...blogState, loading: true });
    fetch("https://myapis.barpat.fun/api_blog_articles")
      .then((response) => {
        // console.log(response);
        if (!response.ok) {
          throw new Error("Erreur : mauvaise ressource.");
        }
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        const randomArticles = getRandomArticles(data, 4); // Sélectionner 4 articles aléatoires
        setBlogState({ ...blogState, loading: false, data: randomArticles });
      })
      .catch((error) => {
        setBlogState({ ...blogState, loading: false, error: true });
      });
  }, []);

  // Fonction pour sélectionner n éléments aléatoires dans un tableau
  const getRandomArticles = (articles, n) => {
    const shuffled = articles.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, n);
  };

  let content;
  if (blogState.loading) {
    content = (
      <LoadingComponent/>
    );
  } else if (blogState.error) {
    content = (
      <div className="mt-12 text-xl font-semibold text-center text-red-500">
        <p>Une erreur est survenue.</p>
      </div>
    );
  } else if (blogState.data?.length > 0) {
    // ? = optional chaining => non null et no undefined
    content = (
      <>
        <h2 className="my-4 text-2xl font-semibold text-center underline">
          Les articles de Barpat
        </h2>
        <ul className="flex flex-col justify-center mx-auto w-fit">
          {blogState.data.map((item) => (
            <li key={item.id_article} className="inline-block m-4 shrink-0">
              <a
                href={`https://blog.barpat.fun/article/${item.id_article}/${item.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col w-full px-2 py-4 bg-neutral-800 rounded-xl"
              >
                <p className="block mb-3 border-b-2 text-md border-neutral-500 ">
                  {he.decode(item.title)}
                </p>
                {item.img1 ? (
                  <div className="w-full h-32 overflow-hidden rounded-xl">
                    <img
                      src={`https://blog.barpat.fun/public/assets/articles_media/article_${item.id_article}/${item.img1}`}
                      // alt={item.title}
                      className="block object-cover w-full h-auto rounded-xl"
                    />
                  </div>
                ) : (
                  ""
                )}
                <p className="block my-3 text-md">{he.decode(item.pitch)}</p>
              </a>
            </li>
          ))}
        </ul>
      </>
    );
  } else if (blogState.data === 0) {
    content = (
      <div className="text-xl font-semibold text-green-500">
        <p>La requête ne correspond à aucune donnée.</p>
      </div>
    );
  } else {
    content = "un probleme ?";
  }

  return <div>{content}</div>;
}
