import { Login, logout } from "../redux/reducers/user";
import {
  useDispatch,
  useSelector
} from "react-redux";


import { useToast } from "@/components/ui/use-toast";

const useUser = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)

  const login = async (data, onSuccess) => {
    const isSuccess =  await dispatch(Login(data));
    // console.log("🚀 ~ file: useUser.jsx:17 ~ login ~ isSuccess:", isSuccess)

    if (isSuccess) {
      toast({
        title: "Login success",
        description: "Friday, February 10, 2023 at 5:57 PM",
      })
      onSuccess()
    } else {
      toast(
        
        {
        title: "Wrong Credentials",
        description: "Friday, February 10, 2023 at 5:57 PM",
        variant:'destructive'
      })
    }
    }

  const signOut = () => dispatch(logout())
  
  return {
    login,
    signOut,
    user
  };
};

export default useUser;
