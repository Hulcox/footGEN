"use client";
import NavBar from "@/components/navbar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";

import { MdEdit } from "react-icons/md";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import Collapse from "@/components/collapse";

const TeamsPage = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500 to-slate-800">
      <NavBar url_logo="" page="/teams" />
      <div className="w-3/5 m-auto mt-4 flex gap-8 justify-center flex-wrap">
        <motion.div
          whileHover={{
            scale: 1.1,
          }}
          style={{ originX: 0.5 }}
          className="cursor-default"
        >
          <Card
            className={`w-[400px] hover:shadow-2xl hover:shadow-[#2faee0]`}
            shadow="none"
          >
            <CardHeader className="flex gap-3 justify-between">
              <div className="flex gap-3">
                <Image
                  alt="logo"
                  height={40}
                  radius="none"
                  src="/images/logos/om.svg"
                  width={40}
                />
                <div className="flex flex-col items-start">
                  <p className="text-md">{"L'Olympique de Marseille"}</p>
                  <p className="text-small text-default-500">OM</p>
                </div>
              </div>
              <Button
                color="primary"
                variant="faded"
                size="sm"
                className="text-xl"
                isIconOnly
                onClick={toggleOpen}
              >
                <MdEdit />
              </Button>
            </CardHeader>
            <Divider />
            <CardBody>
              <Collapse open={!isOpen}>
                <p>BLABLALBALBALBLABLABLALBALBLABLALBLABLABLALBALBL</p>
              </Collapse>
              <Collapse open={isOpen}>
                <p>ZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZOZO</p>
              </Collapse>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex flex-col items-start">
                <p>Dernier resultat :</p>
                <p>...</p>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          className="cursor-default"
        >
          <Card
            className={`max-w-[400px] hover:shadow-2xl hover:shadow-[#a50044]`}
            shadow="none"
          >
            <CardHeader className="flex gap-3">
              <Image
                alt="logo"
                height={40}
                radius="none"
                src="/images/logos/barca.svg"
                width={40}
              />
              <div className="flex flex-col items-start">
                <p className="text-md">{"FC Barcelone"}</p>
                <p className="text-small text-default-500">Barça</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>BLABLALBALBALBLABLABLALBALBLABLALBLABLABLALBALBL</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex flex-col items-start">
                <p>Dernier resultat :</p>
                <p>...</p>
              </div>
            </CardFooter>
          </Card>
        </motion.button>
        <motion.button
          whileHover={{
            scale: 1.1,
          }}
          className="cursor-default"
        >
          <Card
            className={`max-w-[400px] hover:shadow-2xl hover:shadow-[#FEBE10]`}
            shadow="none"
          >
            <CardHeader className="flex gap-3">
              <Image
                alt="logo"
                height={40}
                radius="none"
                src="/images/logos/real.svg"
                width={40}
              />
              <div className="flex flex-col items-start">
                <p className="text-md">{"Real de Madrid"}</p>
                <p className="text-small text-default-500">Real</p>
              </div>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>BLABLALBALBALBLABLABLALBALBLABLALBLABLABLALBALBL</p>
            </CardBody>
            <Divider />
            <CardFooter>
              <div className="flex flex-col items-start">
                <p>Dernier resultat :</p>
                <p>...</p>
              </div>
            </CardFooter>
          </Card>
        </motion.button>
      </div>
    </div>
  );
};

export default TeamsPage;
