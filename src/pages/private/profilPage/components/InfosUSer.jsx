import { useContext } from "react";
import { UserContext } from "../../../../context/userContext";
import { LuCalendarDays, LuMail } from "react-icons/lu";
import { dateReadableShort } from "../../../../utils/readDate";

export default function InfosUSer() {
  const { currentUserDatas } = useContext(UserContext);

  return (
    <>
      <div className="flex items-center my-2 gap-x-3">
        <LuMail className="mr-1 " /> <p>Mail </p> :{" "}
        <p>{currentUserDatas.email}</p>
      </div>
      <div className="flex items-center my-2 gap-x-3">
        <LuCalendarDays className="mr-1 " /> <p>Inscription </p> :{" "}
        <p>{dateReadableShort(currentUserDatas.register_since)}</p>
      </div>
    </>
  );
}
