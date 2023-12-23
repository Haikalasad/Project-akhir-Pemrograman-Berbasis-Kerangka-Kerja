import NavbarComponent from "../components/Navbar";
import HeroSection from "../components/Hero-section";
import Benefits from "../components/Benefits";
import PopularSection from "../components/popularSection";
import Footer from "../components/footer";

const Home = () =>{
  
    return(
    <div>
         <NavbarComponent/>
      <HeroSection/>
    <Benefits/>
    <PopularSection/>
    <Footer/>
    </div>
     
    )
}

export default Home;