import { NavLink } from "react-router-dom";
import { LuHome } from "react-icons/lu";

export default function NavlinkHeader({ to = "/", icon, text }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex text-6xl items-center justify-end xl:justify-start xl:text-4xl gap-x-8 font-semibold ${
          isActive ? "text-blue-500 font-bold" : "text-neutral-50"
        }`
      }
    >
      {icon}
      <span className="hidden xl:block">{text}</span>
    </NavLink>
  );
}
