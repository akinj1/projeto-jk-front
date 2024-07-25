import { CreateUserForm } from "@/components";
import { createUser } from "@/utils";
import { useMutation } from "@tanstack/react-query";
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

export function CreateUser() {
  const navigate = useNavigate();
  const formId = "createUserForm";
  const { mutate } = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      navigate("/users");
    },
  });

  return (
    <>
      <Card className="w-11/12">
        <CardHeader>
          <CardTitle>Crie um novo usuário.</CardTitle>
          <CardDescription>
            Para salvar os dados click no botão salvar.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <CreateUserForm formName={formId} onSubmit={mutate} />
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button form={formId} type="submit">
            Salvar
          </Button>
        </CardFooter>
      </Card>
    </>
  );
}
