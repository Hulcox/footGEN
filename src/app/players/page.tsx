"use client";
import NavBar from "@/components/navbar";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Image,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Avatar,
  Chip,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import SwapIcon from "@/components/swapIcon";
import { MdAdd, MdClose, MdDelete, MdDone, MdEdit } from "react-icons/md";
import Collapse from "@/components/collapse";
import AddPlayer from "@/components/addPlayer";

async function getData(url: string) {
  const res = await fetch(`http://localhost:8080${url}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PlayersPage = () => {
  const [teams, setTeams] = useState([]);
  const [players, setPlayers] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [openAddPlayer, setOpenAddPlayer] = useState(false);

  const [inputPlayerName, setInputPlayerName] = useState("");
  const [inputPlayerNumber, setInputPlayerNumber] = useState("");
  const [inputPlayerPoste, setInputPlayerPoste] = useState("");
  const [inputPlayerTeam, setInputPlayerTeam] = useState("");
  const [touchedSelectPoste, setTouchedSelectPoste] = useState(false);
  const [touchedSelectTeam, setTouchedSelectTeam] = useState(false);

  const handleSelectionChangePoste = (e: any) => {
    setInputPlayerPoste(e.target.value);
  };

  const handleSelectionChangeTeam = (e: any) => {
    setInputPlayerTeam(e.target.value);
  };

  const isValidPoste = inputPlayerPoste.length > 0;
  const isValidTeam = inputPlayerTeam.length > 0;

  const toggleOpen = (id: any, player?: any) => {
    if (id === activeId) {
      setActiveId(null);

      setInputPlayerName("");
      setInputPlayerNumber("");
      setInputPlayerPoste("");
      setInputPlayerTeam("");
    } else {
      setActiveId(id);

      setInputPlayerName(player.name);
      setInputPlayerNumber(player.number);
      setInputPlayerPoste("" + player.position);
      setInputPlayerTeam("" + player.team_id);
    }
  };

  const toggleOpenPlayer = () => {
    setOpenAddPlayer(!openAddPlayer);
  };

  useEffect(() => {
    getData("/teams/all").then((res) => {
      setTeams(res);
    });
    getData("/players/all").then((res) => {
      setPlayers(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chipPoste = (poste: string) => {
    if (poste == "BU" || poste == "AT" || poste == "AG" || poste == "AD") {
      return "primary";
    } else if (
      poste == "MOC" ||
      poste == "MDC" ||
      poste == "MD" ||
      poste == "MG" ||
      poste == "MC"
    ) {
      return "success";
    } else if (
      poste == "DC" ||
      poste == "DD" ||
      poste == "DG" ||
      poste == "DLG" ||
      poste == "DLD"
    ) {
      return "warning";
    } else if (poste == "G") {
      return "danger";
    } else {
      return "default";
    }
  };

  const postes = [
    { value: "BU", label: "BU" },
    { value: "AT", label: "AT" },
    { value: "AG", label: "AG" },
    { value: "AD", label: "AD" },
    { value: "MOC", label: "MOC" },
    { value: "MDC", label: "MDC" },
    { value: "MD", label: "MD" },
    { value: "MG", label: "MG" },
    { value: "MC", label: "MC" },
    { value: "DC", label: "DC" },
    { value: "DD", label: "DD" },
    { value: "DG", label: "DG" },
    { value: "DLG", label: "DLG" },
    { value: "DLD", label: "DLD" },
    { value: "G", label: "G" },
  ];

  const addPlayer = (player: any) => {
    console.log(player);

    fetch(`http://localhost:8080/players/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: player.name,
        number: Number(player.number),
        position: player.poste,
        team_id: Number(player.team),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTeamResponse) => {
        setPlayers(updatedTeamResponse);
      })
      .catch((error) => {
        console.error("Error updating team:", error.message);
      });
  };

  const updatePlayer = (id: any) => {
    fetch(`http://localhost:8080/players/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputPlayerName,
        number: Number(inputPlayerNumber),
        position: inputPlayerPoste,
        team_id: Number(inputPlayerTeam),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTeamResponse) => {
        toggleOpen(id);
        setPlayers(updatedTeamResponse);
      })
      .catch((error) => {
        console.error("Error updating team:", error.message);
      });
  };

  const deletePlayer = (id: any) => {
    fetch(`http://localhost:8080/players/${id}`, {
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
        setPlayers(updatedTeamResponse);
      })
      .catch((error) => {
        console.error("Error updating team:", error.message);
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500 to-slate-800 to-90%">
      <NavBar url_logo="" page="/players" />
      <div className="w-2/5 m-auto py-4 flex flex-col gap-4">
        <div>
          <Button
            color="default"
            endContent={<MdAdd />}
            size="sm"
            onClick={toggleOpenPlayer}
          >
            Ajouter un joueur
          </Button>
        </div>
        <Collapse open={openAddPlayer}>
          <AddPlayer
            teams={teams}
            postes={postes}
            addPlayer={addPlayer}
            toggleOpenPlayer={toggleOpenPlayer}
          />
        </Collapse>
      </div>
      <div className="w-3/5 m-auto py-4">
        <Card>
          <CardBody>
            <Table removeWrapper fullWidth>
              <TableHeader>
                <TableColumn>Nom</TableColumn>
                <TableColumn>Numéro</TableColumn>
                <TableColumn>Poste</TableColumn>
                <TableColumn>Equipe</TableColumn>
                <TableColumn>Actions</TableColumn>
              </TableHeader>
              <TableBody emptyContent={"Pas de joueurs dans cette équipe."}>
                {players.map((player: any, key: any) => (
                  <TableRow key={key}>
                    <TableCell>
                      <Collapse open={activeId != player.id}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            name={player.name
                              .split(" ")
                              .map((elm: string) => {
                                return elm.slice(0, 1);
                              })
                              .join("")}
                            radius="md"
                          />
                          {player.name}
                        </div>
                      </Collapse>
                      <Collapse open={activeId == player.id}>
                        <Input
                          size="sm"
                          type="text"
                          value={inputPlayerName}
                          onValueChange={setInputPlayerName}
                        />
                      </Collapse>
                    </TableCell>
                    <TableCell>
                      <Collapse open={activeId != player.id}>
                        <p>{player.number}</p>
                      </Collapse>
                      <Collapse open={activeId == player.id}>
                        <Input
                          size="sm"
                          type="number"
                          value={inputPlayerNumber}
                          onValueChange={setInputPlayerNumber}
                        />
                      </Collapse>
                    </TableCell>
                    <TableCell>
                      <Collapse open={activeId != player.id}>
                        <Chip color={chipPoste(player.position)}>
                          {player.position}
                        </Chip>
                      </Collapse>
                      <Collapse open={activeId == player.id}>
                        <Select
                          label="Selectionner un poste"
                          className="w-64"
                          selectedKeys={[inputPlayerPoste]}
                          onChange={(e) => {
                            handleSelectionChangePoste(e);
                          }}
                          errorMessage={
                            isValidPoste || !touchedSelectPoste
                              ? ""
                              : "Vous devez selectionner un poste"
                          }
                          isInvalid={
                            isValidPoste || !touchedSelectPoste ? false : true
                          }
                          onClose={() => setTouchedSelectPoste(true)}
                        >
                          {postes.map((poste) => (
                            <SelectItem key={poste.value} value={poste.value}>
                              {poste.label}
                            </SelectItem>
                          ))}
                        </Select>
                      </Collapse>
                    </TableCell>
                    <TableCell>
                      <Collapse open={activeId != player.id}>
                        <div className="flex items-center gap-4">
                          <Image
                            src={`/images/logos/${
                              (
                                teams.filter(
                                  (elm: any) => elm.id === player.team_id
                                )[0] as any
                              )?.logo
                            }`}
                            width={40}
                            radius="none"
                            alt="logo"
                          />
                          {
                            (
                              teams.filter(
                                (elm: any) => elm.id === player.team_id
                              )[0] as any
                            )?.name
                          }
                        </div>
                      </Collapse>
                      <Collapse open={activeId == player.id}>
                        <Select
                          label="Selectionner une equipe"
                          className="w-64"
                          selectedKeys={[inputPlayerTeam]}
                          errorMessage={
                            isValidTeam || !touchedSelectTeam
                              ? ""
                              : "Vous devez selectionner une equipe"
                          }
                          isInvalid={
                            isValidTeam || !touchedSelectTeam ? false : true
                          }
                          onChange={(e) => {
                            handleSelectionChangeTeam(e);
                          }}
                          onClose={() => setTouchedSelectTeam(true)}
                        >
                          {teams.map((team: any) => (
                            <SelectItem key={team.id} value={team.id}>
                              {team.name}
                            </SelectItem>
                          ))}
                        </Select>
                      </Collapse>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {activeId == player.id && (
                          <Button
                            color="success"
                            variant="faded"
                            size="sm"
                            className="text-xl"
                            isIconOnly
                            onClick={() => updatePlayer(player.id)}
                          >
                            <MdDone />
                          </Button>
                        )}
                        <Button
                          color="primary"
                          variant="faded"
                          size="sm"
                          className="text-xl"
                          isIconOnly
                          onClick={() => toggleOpen(player.id, player)}
                        >
                          <SwapIcon
                            openIcon={<MdEdit />}
                            closeIcon={<MdClose />}
                            toggle={activeId == player.id}
                          />
                        </Button>
                        {activeId != player.id && (
                          <Button
                            color="danger"
                            variant="faded"
                            size="sm"
                            className="text-xl"
                            isIconOnly
                            onClick={() => deletePlayer(player.id)}
                          >
                            <MdDelete />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PlayersPage;
