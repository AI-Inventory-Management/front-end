import { RiRoadMapFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";
import { GiSodaCan } from "react-icons/gi";
import { BsFillBellFill } from "react-icons/bs";

export const SidebarData = [
  {
    title: "Dashboard",
    icon: <MdSpaceDashboard />,
    link: "/",
  },
  {
    title: "Mapa",
    icon: <RiRoadMapFill />,
    link: "/mapa",
  },
  {
    title: "Tiendas",
    icon: <IoStorefront />,
    link: "/filter",
  },
  {
    title: "Productos",
    icon: <GiSodaCan />,
    link: "/Products",
  },
  {
    title: "Notificaciones",
    icon: <BsFillBellFill />,
    link: "/notifications",
  },
];
