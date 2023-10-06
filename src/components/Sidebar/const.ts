import { MenuProps } from "./MenuItem/types";

export const SidebarMenu: MenuProps[] = [
  {
    id: 1,
    setter: () => {},
    title: "Agenda",
    icon: "IoCalendarSharp",
    path: "/agenda",
    roles: ["user"],
  },
  {
    id: 2,
    setter: () => {},
    title: "Salas",
    icon: "HiOutlineHomeModern",
    path: "/sala",
    roles: ["user"],
  },
  {
    id: 3,
    setter: () => {},
    title: "Solicitantes",
    icon: "IoPerson",
    path: "/solicitante",
    roles: ["user"],
  },
  {
    id: 4,
    setter: () => {},
    title: "Usuários",
    icon: "BsPerson",
    path: "/usuario",
    roles: ["admin"],
  },
  {
    id: 5,
    setter: () => {},
    title: "Relatório",
    icon: "MdReport",
    path: "/relatorio",
    roles: ["user"],
  },
];
