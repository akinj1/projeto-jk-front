import { useAuth } from "@/hooks";
import clsx from "clsx";
import { BsArrowBarRight } from "react-icons/bs";
import { itens } from "./sideBarItens";
import { Link, useNavigate } from "react-router-dom";

type IsideBarMenu = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SideBarMenu({ open, setOpen }: IsideBarMenu) {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const logOut = () => {
    logout();
    navigate("/");
  };
  return (
    <>
      <div
        id={`dialog-left`}
        className="relative z-10"
        aria-labelledby="slide-over"
        role="dialog"
        aria-modal="true"
        onClick={() => setOpen(false)}
      >
        <div
          className={clsx(
            "fixed inset-0 bg-gray-500 bg-opacity-75 transition-all",
            {
              "opacity-100 duration-500 ease-in-out visible": open,
            },
            { "opacity-0 duration-500 ease-in-out invisible": !open }
          )}
        ></div>
        <div className={clsx({ "fixed inset-0 overflow-hidden": open })}>
          <div className="absolute inset-0 overflow-hidden">
            <div
              className={
                "pointer-events-none fixed max-w-full inset-y-0 left-0"
              }
            >
              <div
                className={clsx(
                  "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                  { "-translate-x-full": !open },
                  { "translate-x-0": open }
                )}
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                }}
              >
                <div className="py-4 overflow-y-auto p-2 shadow-xl h-full bg-background text-foreground">
                  <ul className="space-y-2 font-medium h-full w-48">
                    {itens.map((e) => {
                      return (
                        <li key={e.name}>
                          <Link
                            to={e.to}
                            className="flex items-center justify-stretch p-2 rounded-lg group w-full"
                            onClick={() => setOpen(false)}
                          >
                            <>
                              {e.icon}
                              <span className="ms-3">{e.name}</span>
                            </>
                          </Link>
                        </li>
                      );
                    })}
                    <li>
                      <a
                        href="#"
                        className="flex items-center justify-stretch p-2 rounded-lg group w-full"
                        onClick={() => logOut()}
                      >
                        <BsArrowBarRight />
                        <span className="ms-3">logout</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ); 
}
