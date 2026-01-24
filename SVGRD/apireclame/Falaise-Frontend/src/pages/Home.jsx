import Hero        from "../components/Hero";
// import Specialites from "../components/Specialites";  ← SUPPRIMÉ
import Reservation from "../components/ReservationForm";
import Menu        from "../components/MenuSection";
import Blog        from "../components/BlogSection";
import About       from "../components/AboutSection";
import Reclamation from "../components/ReclamationSection";
// ...

export default function Home() {
  return (
    <>
      <section id="accueil"><Hero /></section>
      <section id="menu"><Menu /></section>
      <section id="reservation"><Reservation /></section>
      <section id="blog"><Blog /></section>
      <section id="a-propos"><About /></section>
      <section id="reclamation"><Reclamation /></section>
    </>
  );
}