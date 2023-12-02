"use client";
import CardTeam from "@/components/cardTeam";
import Collapse from "@/components/collapse";
import NavBar from "@/components/navbar";
import TeamForm from "@/components/teamForm";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useState } from "react";
import { MdAdd } from "react-icons/md";

const TeamsPage = () => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500 to-slate-800">
      <NavBar url_logo="" page="/teams" />
      <div className="w-2/5 m-auto py-4 flex flex-col gap-4">
        <div>
          <Button
            color="default"
            endContent={<MdAdd />}
            size="sm"
            onClick={toggleOpen}
          >
            Ajouter une équipe
          </Button>
        </div>
        <Collapse open={open}>
          <Card>
            <CardBody>
              <TeamForm toggleOpen={toggleOpen} />
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div className="w-4/5 m-auto py-8 flex gap-8 justify-center flex-wrap">
        <CardTeam
          primaryColor="#2faee0"
          secondaryColor="#ffffff"
          logo="om.svg"
          name="L'Olympique de Marseille"
          nickname="OM"
          slogan="Aller L'OM"
          isNotDeletable
        />
        <CardTeam
          primaryColor="#a50044"
          secondaryColor="#004d98"
          logo="barca.svg"
          name="FC Barcelone"
          nickname="Barca"
          slogan="MESSIIIIIIIIIIII"
          isNotDeletable
        />
        <CardTeam
          primaryColor="#FEBE10"
          secondaryColor="#00529F"
          logo="real.svg"
          name="Real de Madrid"
          nickname="Read"
          slogan="CR7"
        />
      </div>
    </div>
  );
};

export default TeamsPage;
