"use client";
import NavBar from "@/components/navbar";
import SliderMotion from "@/components/slider";
import { Card, CardFooter, CardBody } from "@nextui-org/react";

const Home = () => {
  const images_stade = [
    "/images/stades/orange_velodrome_1.jpg",
    "/images/stades/orange_velodrome_2.jpg",
    "/images/stades/orange_velodrome_3.jpg",
    "/images/stades/orange_velodrome_4.jpg",
  ];

  const images_players = [
    "/images/players/om_joueur_1.jpg",
    "/images/players/om_joueur_2.jpg",
    "/images/players/om_joueur_3.jpg",
    "/images/players/om_joueur_4.jpg",
  ];

  return (
    <div className="bg-gradient-to-r from-[#2faee0] to-white to-90%">
      <NavBar />
      <div className="flex flex-col items-center justify-around gap-12 py-4">
        <Card isFooterBlurred className="w-4/5 m-auto">
          <div className="flex relative h-[70vh] justify-center items-center overflow-hidden slider-container rounded-md">
            <SliderMotion images={images_stade} />
          </div>
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <h2 className="text-center text-2xl font-bold">
              {"OM - Orange Vélodrome"}
            </h2>
          </CardFooter>
        </Card>
        <Card isFooterBlurred className="w-4/5 m-auto">
          <div className="flex relative h-[70vh] justify-center items-center overflow-hidden slider-container rounded-md">
            <SliderMotion images={images_players} />
          </div>
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <h2 className="text-center text-2xl font-bold">
              {"OM - Les joueurs"}
            </h2>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
