import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("username")) {
      navigate("/register");
    } else {
      navigate("/" + localStorage.getItem("username"));
    }
  });

  return <></>;
}
