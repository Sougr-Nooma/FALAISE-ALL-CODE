import { useNavigate } from "react-router-dom";

export default function useScrollTo() {
  const nav = useNavigate();

  return (anchor) => {
    // si on est déjà sur Home → scroll direct
    if (window.location.pathname === "/") {
      document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
    } else {
      // sinon on va d'abord à Home puis on scroll après le render
      nav("/");
      setTimeout(() => {
        document.querySelector(anchor)?.scrollIntoView({ behavior: "smooth" });
      }, 100); // petite latence pour laisser React peindre la page
    }
  };
}