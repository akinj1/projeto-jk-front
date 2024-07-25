
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/hooks"
import { login } from "@/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import Cookies from "js-cookie";
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { Navigate, useNavigate } from "react-router-dom"
import { z } from "zod"


const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function LoginScreen() {
  const { user, userLoading, setToken } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    values: {
      email: '',
      password: '',
    }
  });


  const { mutate: handleLogin, isSuccess, } = useMutation({
    mutationFn: login,
    onSuccess: (res) => {
      if(res.data && res.data.token) {
        setToken(res.data.token)
        Cookies.set("token", res.data.token);
      }
    }
  })
  
  useEffect(() => {
    if (isSuccess) {
      navigate("/home");
    }
  }, [isSuccess, navigate])

  if (!userLoading && user)
    return <Navigate to="/home" />;

  return (
    <div className="flex justify-center h-[100vh] items-center">
      <Card className="w-[350px] mb-24">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Use seu email e senha para entrar.</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="login" onSubmit={handleSubmit((e) => handleLogin(e))}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Email</Label>
                <Input placeholder="Email" {...register("email")}/>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Password</Label>
                <Input type="password" placeholder="Password" {...register("password")} />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button form="login"  type="submit" >Login</Button>
        </CardFooter>
      </Card>
    </div>
  )
}
