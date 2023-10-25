import Image from "next/image";
import ParticlesComponent from "./ParticlesComponent";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

export default function FotoCard() {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      await console.log(container);
    },
    []
  );
  return (
    <div className="w-[100%] lg:w-[50%] bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-900  dark:bg-gradient-to-tl black:from-blue-900 dark:via-gray-900 dark:to-blue-950 rounded-r-3xl rounded-t-3xl  h-80">
      <Particles
        className="h-[100%]"
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: {
            enable: false,
            zIndex: 0,
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
              resize: true,
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 200,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 6,
              straight: false,
            },
            number: {
              density: {
                enable: true,
                area: 800,
              },
              value: 200,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
      />

      {/*     <div className=" w-[100%] lg:w-[50%] bg-gradient-to-tl from-gray-700 via-gray-700 to-gray-900  dark:bg-gradient-to-tl black:from-blue-900 dark:via-gray-900 dark:to-blue-950 rounded-r-3xl rounded-t-3xl  h-80"> */}

      {/*  </div> */}

      <Image
        src="/profile.png"
        alt="Manuel Foto"
        className="profile-img  mt-[-350px]"
        width={200}
        height={200}
        priority
      />
    </div>
  );
}
