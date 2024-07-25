import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { Label } from "../ui/label";

const userSchema = z.object({
  userName: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  password: z.string(),
});

type UserSchema = z.infer<typeof userSchema>;

interface IcreateUser {
  onSubmit: (data: UserSchema) => void;
  formName: string;
}

export const CreateUserForm = ({ onSubmit, formName }: IcreateUser) => {
  const { register, handleSubmit } = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    values: {
      email: "",
      firstName: "",
      lastName: "",
      userName: "",
      password: "",
    },
  });

  const HandlerOnSubmit = async (data: UserSchema) => {
    if (data.email && data.userName && data.password) {
      onSubmit({
        email: data.email,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        password: data.password,
      });
    }
    console.log(data);
  };

  return (
    <div className="grid w-full items-center gap-4">
      <form id={formName} onSubmit={handleSubmit(HandlerOnSubmit)}>
        <div className="grid w-full items-center gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Usuário</Label>
            <Input {...register("userName")} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Email</Label>
            <Input {...register("email")} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Primeiro nome</Label>
            <Input {...register("firstName")} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Sobre Nome</Label>
            <Input {...register("lastName")} />
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="name">Senha</Label>
            <Input type="password" {...register("lastName")} />
          </div>
        </div>
      </form>
    </div>
  );
};
