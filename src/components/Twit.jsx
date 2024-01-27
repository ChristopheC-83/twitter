import { useState } from "react";

export default function Twit({ twit }) {
  // Utilise useState directement pour initialiser la date
  const [dateModif, setDateModif] = useState(
    new Date(parseInt(twit.date, 10)).toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
  );

  return (
    <div className="flex flex-col w-full p-8 border rounded shadow-md border-neutral-500 bg-neutral-900">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          
          <div className="flex flex-col">
            <span className="font-bold">{twit.author}</span>
            <span className="text-sm text-gray-500">{dateModif}</span>
          </div>
        </div>
        {/* <div className="flex items-center">
          <span className="mr-4">{twit.likes}</span>
          <span>{twit.comments.length}</span>
        </div> */}
      </div>
      <div className="mb-8">{twit.text}</div>
        {twit.img && (
            <img
            className="mx-auto w-8/10"
            src={twit.img}
            alt={twit.author}
          />
        )}
      
      <div className="flex flex-wrap">
        {twit.hashtags.map((hashtag) => (
          <span key={twit.date} className="mr-2 text-blue-500 cursor-pointer">
            #{hashtag}
          </span>
        ))}
      </div>
      <div className="flex justify-end mt-4">
        <button className="px-4 py-2 text-sm font-bold text-white bg-blue-500 rounded hover:bg-blue-600">
          J'aime
        </button>
      </div>
    </div>
  );
}
