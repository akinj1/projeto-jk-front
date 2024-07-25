import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { User } from "@/models/user";
import { Role } from "@/models/role";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useAuth } from "@/hooks";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const userSchema = z.object({
  id: z.string(),
  userName: z.string(),
  email: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  roleId: z.string(),
});

type UserSchema = z.infer<typeof userSchema>;

interface IupdateUser {
  onSubmit: (data: UserSchema) => void;
  formName: string;
  user: User;
}

export const UpdateUserForm = ({ onSubmit, formName, user }: IupdateUser) => {
  const { roles } = useAuth();
  const form = useForm<UserSchema>({
    resolver: zodResolver(userSchema),
    values: {
      id: user.id || "",
      email: user.email,
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      userName: user.userName || "",
      roleId: user?.role?.id || "",
    },
  });

  const HandlerOnSubmit = async (data: UserSchema) => {
    if (data.email && data.userName) {
      console.log(data)
      onSubmit({
        id: data.id,
        email: data.email,
        userName: data.userName,
        firstName: data.firstName,
        lastName: data.lastName,
        roleId: data.roleId,
      });
    }
  };

  return (
    <div className="grid w-full items-center gap-4">
      <Form {...form}>
        <form
          id={formName}
          onSubmit={form.handleSubmit(HandlerOnSubmit)}
        >
          <FormField
            control={form.control}
            name="userName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input placeholder="nome de usuário" {...field} />
                </FormControl>
                <FormDescription>digite o nome do usuário</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>
                <FormDescription>digite o email</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>nome</FormLabel>
                <FormControl>
                  <Input placeholder="nome" {...field} />
                </FormControl>
                <FormDescription>digite o seu primeiro nome</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>sobrenome</FormLabel>
                <FormControl>
                  <Input placeholder="sobrenome" {...field} />
                </FormControl>
                <FormDescription>digite o seu sobrenome</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="roleId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Perfil</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o perfil do usuário" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles?.map((e: Role) => (
                      <>
                        <SelectItem value={e.id}>{e.name}</SelectItem>
                      </>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Cada perfil define quais permições o usuário irá ter.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );
};
