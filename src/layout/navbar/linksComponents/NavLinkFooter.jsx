import { NavLink } from "react-router-dom";


 export default function NavLinkFooter({ to = "/", icon, text }) {



return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex text-4xl items-center justify-center xl:justify-start xl:text-3xl gap-x-8 font-semibold ${
          isActive ? "text-blue-500 font-bold" : "text-neutral-50"
        }`
      }
    >
      <div className="h-9 w-9">{icon}</div>
      <span className="hidden xl:block">{text}</span>
    </NavLink>

  );

}