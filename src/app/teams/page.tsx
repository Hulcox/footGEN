"use client";
import CardTeam from "@/components/cardTeam";
import Collapse from "@/components/collapse";
import NavBar from "@/components/navbar";
import TeamForm from "@/components/teamForm";
import { Button, Card, CardBody } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";

async function getAllTeams() {
  const res = await fetch("http://localhost:8080/teams/all");

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TeamsPage = () => {
  const [open, setOpen] = useState(false);
  const [teams, setTeams] = useState([]);

  const toggleOpen = () => {
    setOpen(!open);
  };

  useEffect(() => {
    getAllTeams().then((res) => {
      setTeams(res);
    });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500 to-slate-800 to-90%">
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
              <TeamForm toggleOpen={toggleOpen} setTeams={setTeams} />
            </CardBody>
          </Card>
        </Collapse>
      </div>
      <div className="w-4/5 m-auto py-8 flex gap-8 justify-center flex-wrap">
        {teams?.map((team: any, key) => (
          <CardTeam
            teamId={team.id}
            primaryColor={team.primaryColor}
            secondaryColor={team.secondaryColor}
            logo={team.logo}
            name={team.name}
            nickname={team.nickname}
            slogan={team.slogan}
            isDeletable={team.deletable}
            setTeams={setTeams}
            key={key}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamsPage;
