"use client";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
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
  Input,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { MdAdd, MdClose, MdDelete, MdDone, MdEdit } from "react-icons/md";
import Collapse from "./collapse";
import { useState } from "react";
import AddPlayer from "./addPlayer";
import SwapIcon from "./swapIcon";

const TeamDetail = ({ team, setTeam }: { team: any; setTeam: any }) => {
  const [openAddPlayer, setOpenAddPlayer] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const [inputPlayerName, setInputPlayerName] = useState("");
  const [inputPlayerNumber, setInputPlayerNumber] = useState("");
  const [inputPlayerPoste, setInputPlayerPoste] = useState("");
  const [inputPlayerTeam, setInputPlayerTeam] = useState("");
  const [touchedSelectPoste, setTouchedSelectPoste] = useState(false);

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
    const players = [
      ...team.players,
      {
        name: player.name,
        number: Number(player.number),
        position: player.poste,
        team_id: Number(player.team),
      },
    ];

    console.log(player);

    fetchData(players);
  };

  const updatePlayer = (id: any) => {
    const players = team.players.filter((elm: any) => elm.id != id);

    fetchData([
      ...players,
      {
        name: inputPlayerName,
        number: Number(inputPlayerNumber),
        position: inputPlayerPoste,
        team_id: Number(inputPlayerTeam),
      },
    ]);
  };

  const deletePlayer = (id: any) => {
    const players = team.players.filter((elm: any) => elm.id != id);

    fetchData(players);
  };

  const fetchData = (players: any) => {
    fetch(`http://localhost:8080/teams/players/${team.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(players),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTeamResponse) => {
        setTeam(updatedTeamResponse);
      })
      .catch((error) => {
        console.error("Error updating team:", error.message);
      });
  };

  return (
    <Card>
      <CardHeader className="flex gap-3 justify-between">
        <div className="flex gap-3">
          <Image
            alt="logo"
            height={40}
            radius="none"
            src={`/images/logos/${team.logo}`}
            width={40}
          />
          <div className="flex flex-col items-start">
            <p className="text-md cursor-pointer">{team.name}</p>
            <p className="text-small text-default-500">{team.nickname}</p>
          </div>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <div>
          <h3 className="text-md font-light mb-3"> Slogan : </h3>
          <p>{team.slogan}</p>
        </div>
      </CardBody>
      <Divider />
      <CardFooter>
        <div className="w-full">
          <h3 className="text-md font-light mb-3"> Joueurs : </h3>
          <div className="m-auto py-4 flex flex-col gap-4">
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
                teamId={"" + team.id}
                teams={[team]}
                postes={postes}
                addPlayer={addPlayer}
                toggleOpenPlayer={toggleOpenPlayer}
              />
            </Collapse>
          </div>
          <Table removeWrapper fullWidth>
            <TableHeader>
              <TableColumn>Nom</TableColumn>
              <TableColumn>Numéro</TableColumn>
              <TableColumn>Poste</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Pas de joueurs dans cette équipe."}>
              {team.players?.map((player: any, key: any) => (
                <TableRow key={key}>
                  <TableCell className="flex gap-2 items-center">
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
                      {player.number}
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
                        {player.position}{" "}
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
        </div>
      </CardFooter>
      <Divider />
    </Card>
  );
};

export default TeamDetail;
