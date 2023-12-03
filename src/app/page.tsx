"use client";
import NavBar from "@/components/navbar";
import SliderMotion from "@/components/slider";
import { Card, CardFooter, CardBody } from "@nextui-org/react";
import { wrap } from "framer-motion";
import { useEffect, useState } from "react";

const Home = () => {
  const images_stades = [
    "/images/stades/orange_velodrome_1.jpg",
    "/images/stades/orange_velodrome_2.jpg",
    "/images/stades/orange_velodrome_3.jpg",
    "/images/stades/orange_velodrome_4.jpg",
    "/images/stades/camp_nou_1.webp",
    "/images/stades/camp_nou_2.jpg",
    "/images/stades/camp_nou_3.jpg",
    "/images/stades/camp_nou_4.png",
    "/images/stades/santiago_bernabeu_1.jpg",
    "/images/stades/santiago_bernabeu_2.jpg",
    "/images/stades/santiago_bernabeu_3.jpg",
    "/images/stades/santiago_bernabeu_4.jpg",
    "/images/stades/alianz_arena_1.jpg",
    "/images/stades/alianz_arena_2.jpg",
    "/images/stades/alianz_arena_3.jpg",
    "/images/stades/alianz_arena_4.webp",
    "/images/stades/emirates_stadium_1.jpg",
    "/images/stades/emirates_stadium_2.webp",
    "/images/stades/emirates_stadium_3.jpg",
    "/images/stades/emirates_stadium_4.jpg",
    "/images/stades/etihad_stadium_1.jpg",
    "/images/stades/etihad_stadium_2.jpg",
    "/images/stades/etihad_stadium_3.jpg",
    "/images/stades/etihad_stadium_4.jpg",
    "/images/stades/old_trafford_1.jpg",
    "/images/stades/old_trafford_2.jpg",
    "/images/stades/old_trafford_3.jpg",
    "/images/stades/old_trafford_4.jpg",
    "/images/stades/bollaert_1.jpg",
    "/images/stades/bollaert_2.jpg",
    "/images/stades/bollaert_3.jpg",
    "/images/stades/bollaert_4.jpg",
    "/images/stades/groupama_stadium_1.jpg",
    "/images/stades/groupama_stadium_2.jpg",
    "/images/stades/groupama_stadium_3.jpg",
    "/images/stades/groupama_stadium_4.jpg",
    "/images/stades/parc_des_princes_1.jpg",
    "/images/stades/parc_des_princes_2.jpg",
    "/images/stades/parc_des_princes_3.jpg",
    "/images/stades/parc_des_princes_4.jpg",
  ];

  const images_players = [
    "/images/players/om_joueur_1.jpg",
    "/images/players/om_joueur_2.jpg",
    "/images/players/om_joueur_3.jpg",
    "/images/players/om_joueur_4.jpg",
    "/images/players/barca_joueur_1.webp",
    "/images/players/barca_joueur_2.webp",
    "/images/players/barca_joueur_3.jpg",
    "/images/players/barca_joueur_4.jpg",
    "/images/players/real_joueur_1.jpg",
    "/images/players/real_joueur_2.jpg",
    "/images/players/real_joueur_3.jpg",
    "/images/players/real_joueur_4.jpg",
    "/images/players/bayern_joueur_1.webp",
    "/images/players/bayern_joueur_2.jpg",
    "/images/players/bayern_joueur_3.jpg",
    "/images/players/bayern_joueur_4.webp",
    "/images/players/arsenal_joueur_1.jpg",
    "/images/players/arsenal_joueur_2.jpg",
    "/images/players/arsenal_joueur_3.jpg",
    "/images/players/arsenal_joueur_4.jpg",
    "/images/players/city_joueur_1.webp",
    "/images/players/city_joueur_2.jpg",
    "/images/players/city_joueur_3.jpg",
    "/images/players/city_joueur_4.jpg",
    "/images/players/united_joueur_1.jpg",
    "/images/players/united_joueur_2.jpg",
    "/images/players/united_joueur_3.jpg",
    "/images/players/united_joueur_4.png",
    "/images/players/lens_joueur_1.jpg",
    "/images/players/lens_joueur_2.jpg",
    "/images/players/lens_joueur_3.jpg",
    "/images/players/lens_joueur_4.jpg",
    "/images/players/ol_joueur_1.jpeg",
    "/images/players/ol_joueur_2.jpeg",
    "/images/players/ol_joueur_3.jpeg",
    "/images/players/ol_joueur_4.jpeg",
    "/images/players/psg_joueur_1.webp",
    "/images/players/psg_joueur_2.jpg",
    "/images/players/psg_joueur_3.jpg",
    "/images/players/psg_joueur_4.jpg",
  ];

  const accueil_slider = [
    {
      logo: "/images/logos/om.svg",
      title_stade: "OM - Orange Vélodrome",
      title_player: "OM - Les joueurs",
      background: "bg-gradient-to-tr from-[#2faee0] to-white to-90%",
    },
    {
      logo: "/images/logos/barca.svg",

      title_stade: "Barça - Camp Nou",

      title_player: "Barça - Les joueurs",
      background: "bg-gradient-to-tr from-[#a50044] to-[#004d98] to-90%",
    },
    {
      logo: "/images/logos/real.svg",

      title_stade: "Real - Santiago Bernabeu",

      title_player: "Real - Les joueurs",
      background: "bg-gradient-to-tr  from-[#FEBE10] to-[#00529F] to-90%",
    },

    {
      logo: "/images/logos/bayern.svg",

      title_stade: "Bayern - Alianz Arena",

      title_player: "Bayern - Les joueurs",
      background: "bg-gradient-to-tr from-[#0066b2] to-[#dc052d] to-90%",
    },
    {
      logo: "/images/logos/arsenal.svg",

      title_stade: "Arsenal - Emirates Stadium",

      title_player: "Arsenal - Les joueurs",
      background: "bg-gradient-to-tr from-[#DB0007] to-[#9C824A] to-90%",
    },
    {
      logo: "/images/logos/manchester_city.svg",

      title_stade: "Manchester City - Etihad Stadium",
      title_player: "Manchester City - Les joueurs",
      background: "bg-gradient-to-tr from-[#6CABDD] to-[#1C2C5B] to-90%",
    },
    {
      logo: "/images/logos/manchester_united.svg",

      title_stade: "Mancherster United - Old Trafford",

      title_player: "Mancherster United - Les joueurs",
      background: "bg-gradient-to-tr from-[#DA291C] to-[#FBE122] to-90%",
    },
    {
      logo: "/images/logos/rc_lens.svg",

      title_stade: "RC Lens - Stade Bollaert",

      title_player: "RC Lens - Les joueurs",
      background: "bg-gradient-to-tr from-[#EC1C24] to-[#FFF200] to-90%",
    },
    {
      logo: "/images/logos/ol.svg",

      title_stade: "OL - Groupama Staduim",

      title_player: "OL - Les joueurs",
      background: "bg-gradient-to-tr from-[#da0812] to-[#14387f] to-90%",
    },
    {
      logo: "/images/logos/psg.svg",

      title_stade: "PSG - Parc des princes",

      title_player: "PSG - Les joueurs",
      background: "bg-gradient-to-tr from-[#004170] to-[#DA291C] to-90%",
    },
  ];

  const [acceuilTeamNumber, setAccueilTeamNumber] = useState(0);

  const switchTeam = (newNumber: number) => {
    setAccueilTeamNumber(acceuilTeamNumber + newNumber);
  };

  const teamIndex = wrap(0, accueil_slider.length, acceuilTeamNumber);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("switch team");
      switchTeam(1);
    }, 40000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [acceuilTeamNumber]);

  return (
    <div
      className={`delay-300 duration-300 ease-in-out ${accueil_slider[teamIndex].background}`}
    >
      <NavBar url_logo={accueil_slider[teamIndex].logo} page="/" />
      <div className="flex flex-col items-center justify-around gap-12 py-4">
        <Card isFooterBlurred className="w-4/5 m-auto">
          <div className="flex relative h-[70vh] justify-center items-center overflow-hidden slider-container rounded-md">
            <SliderMotion images={images_stades} />
          </div>
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <h2 className="text-center text-2xl font-bold">
              {accueil_slider[teamIndex].title_stade}
            </h2>
          </CardFooter>
        </Card>
        <Card isFooterBlurred className="w-4/5 m-auto">
          <div className="flex relative h-[70vh] justify-center items-center overflow-hidden slider-container rounded-md">
            <SliderMotion images={images_players} />
          </div>
          <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
            <h2 className="text-center text-2xl font-bold">
              {accueil_slider[teamIndex].title_player}
            </h2>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Home;
