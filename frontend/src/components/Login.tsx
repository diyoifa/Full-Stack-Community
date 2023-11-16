import * as z from "zod";
import { loginSchema } from "@/schemas/loginShema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import useUser from '../hooks/useUser.jsx'
import {useNavigate} from 'react-router-dom'


  
  const Login = () => {

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const { login } = useUser();
  
  const navigate = useNavigate()

  const handleLogin = (credentials: z.infer<typeof loginSchema>) => {
    login(credentials, () => navigate('/'))
  }

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <h1 className="bg-gradient text-4xl mb-4 p-2">LOGIN</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-8">
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input  placeholder="username" {...field} />
                </FormControl>
                <FormDescription>
                    your username here 😊
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input  type={"password"} placeholder="password" {...field} />
                </FormControl>
                <FormDescription>
                  your password here 🙈
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <Link className="hover:text-primary" to={'/register'}>Create account ?</Link>
          </div>
          <Button id="form-login-btn" type="submit">Login</Button>
        </form>
      </Form>
    </div>
  );
};

export default Login;
