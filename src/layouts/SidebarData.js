import { RiRoadMapFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";

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
];
