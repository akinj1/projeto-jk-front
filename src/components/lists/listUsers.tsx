import { User } from "@/models/user";
import { useAuth } from "@/hooks";
import { ScrollArea } from "@/components/ui/scroll-area"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "@/utils";
import { useQuery } from "@tanstack/react-query";


export const ListUsers = () => {
  const { setUsers, users } = useAuth(); 
  const navigate = useNavigate();
  const { data: res, isLoading } = useQuery({
    queryFn: getAllUsers,
    queryKey: ['getAllUsers'],
  });

  useEffect(() => {
    if (res && res.data && !isLoading) {
      setUsers(res.data.user);
    }
  }, [res, isLoading, setUsers]);
  
  return (
    <ScrollArea className="w-full">
      <div className="p-4">
        <h4 className="mb-4 font-semibold leading-none">Usuarios</h4>
        {users?.map((e: User) => (
          <>
            <li
              key={e.id}
              className="text-md rounded-md border p-6 my-2 cursor-pointer list-none"
              title="Editar"
              onClick={() => navigate("/user/" + e.id)}
            > 
              <div>{e.firstName + " " + e.lastName}</div>
            </li>
          </>
        ))}
      </div>
    </ScrollArea>
  );
};


