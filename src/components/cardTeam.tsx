"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Image,
  Button,
  Tooltip,
} from "@nextui-org/react";

import { MdClose, MdDelete, MdEdit } from "react-icons/md";

import { useState } from "react";
import Collapse from "@/components/collapse";
import SwapIcon from "@/components/swapIcon";
import TeamForm from "./teamForm";

interface Props {
  teamId: number;
  primaryColor: string;
  secondaryColor: string;
  logo: string;
  name: string;
  nickname: string;
  slogan: string;
  isDeletable?: boolean;
  setTeams: any;
}

const CardTeam: React.FC<Props> = ({
  teamId,
  primaryColor,
  secondaryColor,
  logo,
  name,
  nickname,
  slogan,
  isDeletable = true,
  setTeams,
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

  const fetchRemoveTeam = () => {
    fetch(`http://localhost:8080/teams/${teamId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTeamResponse) => {
        setTeams(updatedTeamResponse);
      })
      .catch((error) => {
        console.error("Error updating team:", error.message);
      });
  };

  return (
    <div>
      <Card
        className={`w-[400px] min-h-[280px]`}
        style={hoverStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <CardHeader className="flex gap-3 justify-between">
          <Tooltip
            placement="bottom"
            showArrow={true}
            content="Voir plus de détails"
            color="primary"
          >
            <a className="flex gap-3" href={`/teams/${teamId}`}>
              <Image
                alt="logo"
                height={40}
                radius="none"
                src={`/images/logos/${logo}`}
                width={40}
              />
              <div className="flex flex-col items-start">
                <p className="text-md cursor-pointer">{name}</p>

                <p className="text-small text-default-500">{nickname}</p>
                {!isDeletable && (
                  <p className="text-xs text-red-500">
                    Cette équipe ne peux pas être supprimer
                  </p>
                )}
              </div>
            </a>
          </Tooltip>
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
              isDisabled={!isDeletable}
              onClick={fetchRemoveTeam}
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
                id: teamId,
                primaryColor: primaryColor,
                secondaryColor: secondaryColor,
                logo: logo,
                name: name,
                nickname: nickname,
                slogan: slogan,
              }}
              toggleOpen={toggleOpen}
              setTeams={setTeams}
              editable
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
