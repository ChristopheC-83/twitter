import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <div className="sticky top-0 text-xl lg:text-3xl text-center p-4  w-full	 backdrop-blur-3xl ">
      <div className="w-fit mx-auto  flex justify-between gap-x-8">
        <NavLink to="/" className=" hover:underline hover:underline-offset-8">
          Home
        </NavLink>
        <NavLink to="factory" className=" hover:underline hover:underline-offset-8">
          Factory
        </NavLink>
      </div>
    </div>
  );
}
