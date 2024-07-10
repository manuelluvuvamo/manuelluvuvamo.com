import FotoCard from "./FotoCard";
import SideInfoCard from "./SideInfoCard";

export default function HeroSection() {

    return (
        <section className="px-5 md:px-20 lg:px-56 xl:px-80 flex flex-col items-center justify-between pt-20 ">
        <div className="max-w-4xl w-full container">
          <section className="flex flex-wrap  justify-center items-start">
        
            <FotoCard/>
            <SideInfoCard/>

          </section>
        </div>
      </section>
    );
}