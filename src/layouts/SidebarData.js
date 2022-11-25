import { RiRoadMapFill } from "react-icons/ri";
import { MdSpaceDashboard } from "react-icons/md";
import { IoStorefront } from "react-icons/io5";
import { GiSodaCan } from "react-icons/gi";

export const AdminSidebarData = [
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
];

export const SupervisorSidebarData = [
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
];

