import NavbarComponent from "../components/Navbar";
import HeroSection from "../components/Hero-section";
import Benefits from "../components/Benefits";
import PopularSection from "../components/popularSection";
const Home = () =>{
  
    return(
    <div>
         <NavbarComponent/>
      <HeroSection/>
    <Benefits/>
    <PopularSection/>
    </div>
     
    )
}

export default Home;