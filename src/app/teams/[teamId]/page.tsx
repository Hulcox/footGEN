"use client";
import NavBar from "@/components/navbar";
import TeamDetail from "@/components/teamDetail";
import { useEffect, useState } from "react";

async function getData(id: string) {
  const res = await fetch(`http://localhost:8080/teams/${id}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const TeamDetailPage = ({ params }: { params: { teamId: string } }) => {
  const [team, setTeam] = useState<any>([]);

  useEffect(() => {
    getData(params.teamId).then((res) => {
      setTeam(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="min-h-screen"
      style={{
        background: `linear-gradient(to right top, ${team?.primaryColor}, ${team.secondaryColor} 90%)`,
      }}
    >
      <NavBar url_logo={`/images/logos/${team.logo}`} page="/teams" />
      <div className="w-2/5 m-auto py-4">
        <TeamDetail team={team} setTeam={setTeam} />
      </div>
    </div>
  );
};

export default TeamDetailPage;
