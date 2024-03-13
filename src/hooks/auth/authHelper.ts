import { jwtDecode } from "jwt-decode";
import { useSelector } from "react-redux";
import { RootState } from "../../lib/store";
// import { useNavigate } from "react-router-dom";

export interface UserData {
    user_id: number;
    username: string;
    role: string;
    iat: number;
    exp: number;
  }


const useAuthHelper = () => {
    // const router = useNavigate()
    const getToken = useSelector((state: RootState) => state.auth.access_token)
    
      const getUserDetails = (): UserData | null => {
        if (getToken) {
          const decodeToken: UserData = jwtDecode(getToken);
          return decodeToken
        }
    
        return null
      }
    
      const isAuthenticated =() =>{
        return !!getToken
      }


    return {
        isAuthenticated,
        getUserDetails,
        getToken,
    }
}
 
export default useAuthHelper;



