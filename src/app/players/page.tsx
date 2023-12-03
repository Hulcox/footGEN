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
import { MdAdd, MdClose, MdDelete, MdEdit } from "react-icons/md";
import Collapse from "@/components/collapse";

async function getData(url: string) {
  const res = await fetch(`http://localhost:8080${url}`);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

const PlayersPage = () => {
  const [teams, setTeams] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [openAddPlayer, setOpenAddPlayer] = useState(false);

  const toggleOpen = (id: any) => {
    if (id === activeId) {
      setActiveId(null);
    } else {
      setActiveId(id);
    }
  };

  const toggleOpenPlayer = () => {
    setOpenAddPlayer(!openAddPlayer);
  };

  useEffect(() => {
    getData("/teams/all").then((res) => {
      setTeams(res);
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

  return (
    <div className="min-h-screen bg-gradient-to-tr from-slate-500 to-slate-800 to-90%">
      <NavBar url_logo="" page="/teams" />
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
          <Card>
            <CardBody>
              <div className="flex flex-col gap-4">
                <div className="flex gap-4 justify-between">
                  <Input
                    size="sm"
                    type="text"
                    placeholder="Ajouter un nom"
                    label="Nom"
                    labelPlacement={"outside"}
                  />
                  <Input
                    size="sm"
                    type="number"
                    placeholder="Ajouter un numéro"
                    label="Numéro"
                    labelPlacement={"outside"}
                  />
                </div>
                <div className="flex gap-4 justify-between">
                  <Select
                    label="Poste"
                    placeholder="Selectionner un poste"
                    labelPlacement={"outside"}
                  >
                    {postes.map((poste) => (
                      <SelectItem key={poste.value} value={poste.value}>
                        {poste.label}
                      </SelectItem>
                    ))}
                  </Select>
                  <Select
                    label="Equipe"
                    placeholder="Selectionner une equipe"
                    labelPlacement={"outside"}
                  >
                    {teams.map((team: any) => (
                      <SelectItem key={team.id} value={team.id}>
                        {team.name}
                      </SelectItem>
                    ))}
                  </Select>
                </div>
              </div>
            </CardBody>
          </Card>
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
                {teams.map((team: any) =>
                  team.players.map((player: any, key: any) => (
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
                          <Input size="sm" type="text" value={player.name} />
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
                            value={player.number}
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
                            defaultSelectedKeys={[player.position]}
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
                              src={`/images/logos/${team.logo}`}
                              width={40}
                              radius="none"
                              alt="logo"
                            />
                            {team.name}
                          </div>
                        </Collapse>
                        <Collapse open={activeId == player.id}>
                          <Select
                            label="Selectionner une equipe"
                            className="w-64"
                            defaultSelectedKeys={["" + player.team_id]}
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
                          <Button
                            color="primary"
                            variant="faded"
                            size="sm"
                            className="text-xl"
                            isIconOnly
                            onClick={() => toggleOpen(player.id)}
                          >
                            <SwapIcon
                              openIcon={<MdEdit />}
                              closeIcon={<MdClose />}
                              toggle={activeId == player.id}
                            />
                          </Button>
                          <Button
                            color="danger"
                            variant="faded"
                            size="sm"
                            className="text-xl"
                            isIconOnly
                          >
                            <MdDelete />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PlayersPage;
