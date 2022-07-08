import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function AuthGuard({ children }) {
  const isLogin = useSelector((store) => store.isLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin) {
      navigate("/login");
    }
  }, [isLogin]);

  if (isLogin) return children;
  else <p>Loading..</p>;
}
