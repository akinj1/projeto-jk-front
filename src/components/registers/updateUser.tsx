import { Spinner, UpdateUserForm } from "@/components";
import { getUserById, updateUser } from "@/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useState } from "react";
import { User } from "@/models/user";

interface IUpdateUser { 
  id: string
}

export function UpdateUser({ id }: IUpdateUser) {
  const [user, setUser] = useState<User>({} as User)
  const navigate = useNavigate();
  const formId = "updateUserForm";
  const { data: res, isLoading, isSuccess } = useQuery({
    queryFn: () => getUserById(id || ""),
    queryKey: ["getUserById"],
  });
  
  const { mutate } = useMutation({
    mutationFn: updateUser,
    onSuccess: () => {
      navigate("/users");
    },
  });

  useEffect(() => {
    if (!isLoading && isSuccess && res.data && res.data.user) {
      setUser(res.data.user)
    }
  }, [res, isLoading, isSuccess]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <Card className="w-11/12">
          <CardHeader>
            <CardTitle>Crie um novo usuário.</CardTitle>
            <CardDescription>
              Para salvar os dados click no botão salvar.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UpdateUserForm user={user} formName={formId} onSubmit={mutate} />
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button form={formId} type="submit">
              Salvar
            </Button>
          </CardFooter>
        </Card>
      )}
    </>
  );
}
