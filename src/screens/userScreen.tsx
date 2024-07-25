import { CreateUser, UpdateUser } from "@/components";
import { useParams } from "react-router-dom";

export function UserScreen() {
  const { id } = useParams();

  return (
    <>
      <div className="pt-8 flex justify-center w-screen">
        {id ? <UpdateUser id={id} /> : <CreateUser />}
      </div>
    </>
  );
}
