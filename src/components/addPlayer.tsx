"use client";
import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { MdCheck, MdClose } from "react-icons/md";

const AddPlayer = ({
  teamId,
  teams,
  postes,
  addPlayer,
  toggleOpenPlayer,
}: {
  teamId?: string;
  teams: any;
  postes: any;
  addPlayer: any;
  toggleOpenPlayer: any;
}) => {
  const [inputNewPlayerName, setInputNewPlayerName] = useState("");
  const [inputNewPlayerNumber, setInputNewPlayerNumber] = useState("");
  const [inputNewPlayerPoste, setInputNewPlayerPoste] = useState("");
  const [inputNewPlayerTeam, setInputNewPlayerTeam] = useState(teamId || "");
  const [touchedSelectPoste, setTouchedSelectPoste] = useState(false);
  const [touchedSelectTeam, setTouchedSelectTeam] = useState(false);

  const handleSelectionChangePoste = (e: any) => {
    setInputNewPlayerPoste(e.target.value);
  };

  const handleSelectionChangeTeam = (e: any) => {
    setInputNewPlayerTeam(e.target.value);
  };

  const isValidPoste = inputNewPlayerPoste.length > 0;
  const isValidTeam = inputNewPlayerTeam.length > 0;

  const createPlayer = () => {
    console.log(
      inputNewPlayerName,
      inputNewPlayerNumber,
      inputNewPlayerPoste,
      inputNewPlayerTeam
    );

    if (
      inputNewPlayerName.length > 0 &&
      inputNewPlayerNumber.length > 0 &&
      inputNewPlayerPoste.length > 0 &&
      inputNewPlayerTeam.length > 0
    ) {
      toggleOpenPlayer();
      addPlayer({
        name: inputNewPlayerName,
        number: inputNewPlayerNumber,
        poste: inputNewPlayerPoste,
        team: inputNewPlayerTeam,
      });
    }
  };

  return (
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
              onValueChange={setInputNewPlayerName}
            />
            <Input
              size="sm"
              type="number"
              placeholder="Ajouter un numéro"
              label="Numéro"
              labelPlacement={"outside"}
              onValueChange={setInputNewPlayerNumber}
            />
          </div>
          <div className="flex gap-4 justify-between">
            <Select
              label="Poste"
              placeholder="Selectionner un poste"
              labelPlacement={"outside"}
              selectedKeys={[inputNewPlayerPoste]}
              onChange={(e) => {
                handleSelectionChangePoste(e);
              }}
              errorMessage={
                isValidPoste || !touchedSelectPoste
                  ? ""
                  : "Vous devez selectionner un poste"
              }
              isInvalid={isValidPoste || !touchedSelectPoste ? false : true}
              onClose={() => setTouchedSelectPoste(true)}
            >
              {postes.map((poste: any) => (
                <SelectItem key={poste.value} value={poste.value}>
                  {poste.label}
                </SelectItem>
              ))}
            </Select>
            <Select
              label="Equipe"
              placeholder="Selectionner une equipe"
              labelPlacement={"outside"}
              errorMessage={
                isValidTeam || !touchedSelectTeam
                  ? ""
                  : "Vous devez selectionner une equipe"
              }
              isInvalid={isValidTeam || !touchedSelectTeam ? false : true}
              selectedKeys={[inputNewPlayerTeam]}
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
          </div>
          <div className="flex justify-end gap-4">
            <Button
              color="success"
              size="sm"
              endContent={<MdCheck />}
              onClick={() => {
                createPlayer();
              }}
            >
              Valider
            </Button>
            <Button
              color="danger"
              size="sm"
              endContent={<MdClose />}
              onClick={toggleOpenPlayer}
            >
              Annuler
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default AddPlayer;
