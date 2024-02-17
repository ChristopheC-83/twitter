import { useContext } from "react";
import { UserContext } from "../../../../context/userContext";

export default function AvatarNameUser() {
    const {
        currentUserDatas,
      } = useContext(UserContext);
  return (
    <>
      <img
        src={currentUserDatas.avatar_url}
        alt="avatar"
        className="object-cover mx-auto mb-6 rounded-full size-52"
      />
      <h2 className="mx-auto mb-4 text-2xl font-bold text-center sm:text-3xl">
        {currentUserDatas.login}
      </h2>
    </>
  );
}
