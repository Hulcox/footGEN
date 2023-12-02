"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
} from "@nextui-org/react";

import { MdClose, MdDelete, MdEdit } from "react-icons/md";

import { useState } from "react";
import Collapse from "@/components/collapse";
import SwapIcon from "@/components/swapIcon";
import TeamForm from "./teamForm";

interface Props {
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  name: string;
  nickname: string;
  slogan: string;
  isNotDeletable?: boolean;
}

const CardTeam: React.FC<Props> = ({
  primaryColor,
  secondaryColor,
  logo,
  name,
  nickname,
  slogan,
  isNotDeletable = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setHovered] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  // Générez dynamiquement les styles de l'ombre portée au survol
  const hoverStyle: React.CSSProperties = {
    boxShadow: isHovered ? `0 25px 50px -12px ${primaryColor}` : "none",
  };

  return (
    <div>
      <Card
        className={`w-[400px]`}
        style={hoverStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardHeader className="flex gap-3 justify-between">
          <div className="flex gap-3">
            <Image
              alt="logo"
              height={40}
              radius="none"
              src={`/images/logos/${logo}`}
              width={40}
            />
            <div className="flex flex-col items-start">
              <p className="text-md">{name}</p>
              <p className="text-small text-default-500">{nickname}</p>
              {isNotDeletable && (
                <p className="text-xs text-red-500">
                  Cette équipe ne peux pas être supprimer
                </p>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              color="primary"
              variant="faded"
              size="sm"
              className="text-xl"
              isIconOnly
              onClick={toggleOpen}
            >
              <SwapIcon
                openIcon={<MdEdit />}
                closeIcon={<MdClose />}
                toggle={isOpen}
              />
            </Button>

            <Button
              color="danger"
              variant="faded"
              size="sm"
              className="text-xl"
              isIconOnly
              isDisabled={isNotDeletable}
            >
              <MdDelete />
            </Button>
          </div>
        </CardHeader>
        <Divider />
        <CardBody>
          <Collapse open={!isOpen}>
            <p>{slogan}</p>
          </Collapse>
          <Collapse open={isOpen}>
            <TeamForm
              team={{
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                logo: logo,
                name: name,
                nickname: nickname,
                slogan: slogan,
              }}
              toggleOpen={toggleOpen}
            />
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
    </div>
  );
};

export default CardTeam;
