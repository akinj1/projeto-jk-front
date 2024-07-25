import { BsJustify, BsMoonStarsFill, BsSunFill } from "react-icons/bs";
import { Button } from "./ui/button";
import { useTheme, useAuth } from "@/hooks";
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type INavBarMenu = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NavBarMenu({ setOpen }: INavBarMenu) {
  const { theme, setTheme } = useTheme();
  const { user } = useAuth();
  return (
    <>
      <nav className="rounded-b-md border">
        <div className="flex flex-wrap justify-between items-center mx-auto p-4 ">
            <Button onClick={() => setOpen(true)} variant={"ghost"} size={"icon"}>
              <BsJustify />
            </Button>
          <div className="flex items-center space-x-6 rtl:space-x-reverse">
            <Button onClick={() => setTheme( theme == "dark" ? "light" : "dark")} variant={"ghost"} size={"icon"}>
              {theme == "dark" ? <BsMoonStarsFill /> : <BsSunFill />}
            </Button>

            <Avatar>
              {/* <AvatarImage src="https://github.com/assshadcn.png" alt="@shadcn" /> */}
              <AvatarFallback>
                {
                  (user?.firstName && user?.lastName ? user?.firstName[0] + user?.lastName[0] : "A")
                }
                </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>
    </>
  )
}
