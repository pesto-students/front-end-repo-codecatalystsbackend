import { useContext } from "react";
import { AppContext } from "../context/AppContext";

function useAuth() {
  const { user } = useContext(AppContext);

  return {user};
}

export default useAuth;
