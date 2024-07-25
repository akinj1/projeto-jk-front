import { BsHouseDoor, BsFillPersonLinesFill, BsFillPersonCheckFill } from "react-icons/bs";

export const itens = [
  {
    name: "Dashboard",
    icon: <BsHouseDoor />,
    to: "home"
  },
  {
    name: "Users",
    icon: <BsFillPersonLinesFill />,
    to: "users"
  },
  {
    name: "Permission",
    icon: <BsFillPersonCheckFill />,
    to: "permission"
  },
]