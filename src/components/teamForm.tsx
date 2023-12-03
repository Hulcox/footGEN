"use client";
import { Button, Input } from "@nextui-org/react";
import React from "react";
import { useState } from "react";
import { MdCheck, MdClose } from "react-icons/md";

interface Props {
  team?: any;
  toggleOpen?: any;
  editable?: boolean;
  setTeams: any;
}

const TeamForm: React.FC<Props> = ({
  team,
  toggleOpen,
  editable = false,
  setTeams,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [inputPrimaryColor, setPrimaryColor] = useState(
    team?.primaryColor.slice(1) || ""
  );
  const [inputSecondaryColor, setSecondaryColor] = useState(
    team?.secondaryColor.slice(1) || ""
  );
  const [inputSlogan, setInputSlogan] = useState(team?.slogan || "");
  const [inputNickName, setInputNickName] = useState(team?.nickname || "");
  const [inputName, setInputName] = useState(team?.name || "");

  const validateHexaCode = (value: any) => value.match(/^[a-zA-Z0-9]{0,6}$/i);

  const isInvalidPrimaryColor = React.useMemo(() => {
    if (inputPrimaryColor === "") return false;

    return validateHexaCode(inputPrimaryColor) ? false : true;
  }, [inputPrimaryColor]);

  const isInvalidSecondaryColor = React.useMemo(() => {
    if (inputPrimaryColor === "") return false;

    return validateHexaCode(inputPrimaryColor) ? false : true;
  }, [inputPrimaryColor]);

  const handleFileChange = (e: any) => {
    const file = e.target.files[0];
    console.log(e.target.files[0]);
    // Vérifier si le fichier est de type SVG
    if (file && file.type === "image/svg+xml") {
      setSelectedFile(file);
      // Vous pouvez ajouter ici d'autres traitements si nécessaire
    } else {
      alert("Veuillez sélectionner un fichier SVG valide.");
    }
  };

  const fetchEditTeam = () => {
    fetch(`http://localhost:8080/teams/${team.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        nickname: inputNickName,
        slogan: inputSlogan,
        primaryColor: "#" + inputPrimaryColor,
        secondaryColor: "#" + inputSecondaryColor,
        logo: team.logo,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTeamResponse) => {
        toggleOpen();
        // Handle the updated team data
        setTeams(updatedTeamResponse);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error updating team:", error.message);
      });
  };

  const fetchAddTeam = () => {
    fetch(`http://localhost:8080/teams/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: inputName,
        nickname: inputNickName,
        slogan: inputSlogan,
        primaryColor: "#" + inputPrimaryColor,
        secondaryColor: "#" + inputSecondaryColor,
        logo: "",
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((updatedTeamResponse) => {
        toggleOpen();
        // Handle the updated team data
        setTeams(updatedTeamResponse);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error updating team:", error.message);
      });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Input
          type="text"
          label="Nom"
          size="sm"
          className="w-2/4"
          value={inputName}
          onValueChange={setInputName}
        />
        <Input
          type="text"
          label="Surnom"
          size="sm"
          className="w-2/4"
          value={inputNickName}
          onValueChange={setInputNickName}
        />
      </div>
      <Input
        type="text"
        label="Slogan"
        size="sm"
        className="w-3/4"
        value={inputSlogan}
        onValueChange={setInputSlogan}
      />
      <div className="flex gap-4">
        <Input
          type="text"
          label="Couleur Principale"
          labelPlacement="outside"
          placeholder="code hex"
          size="sm"
          className="w-2/4 rounded-r-md"
          value={inputPrimaryColor}
          errorMessage={
            isInvalidPrimaryColor &&
            "(max 6 caractères, lettres et chiffres seulement)."
          }
          onValueChange={setPrimaryColor}
          startContent={
            <div className="flex items-center gap-1">
              <input
                type="color"
                className="bg-transparent"
                value={"#" + inputPrimaryColor}
                disabled
              />
              <span className="text-default-400 text-small">#</span>
            </div>
          }
        />
        <Input
          type="text"
          label="Couleur Secondaire"
          labelPlacement="outside"
          placeholder="code hex"
          size="sm"
          className="w-2/4 rounded-r-md"
          value={inputSecondaryColor}
          errorMessage={
            isInvalidSecondaryColor &&
            "(max 6 caractères, lettres et chiffres seulement)."
          }
          onValueChange={setSecondaryColor}
          startContent={
            <div className="flex items-center gap-1">
              <input
                type="color"
                className="bg-transparent"
                value={"#" + inputSecondaryColor}
                disabled
              />
              <span className="text-default-400 text-small">#</span>
            </div>
          }
        />
      </div>
      <Input
        type="file"
        label="Logo du club"
        labelPlacement="outside"
        placeholder=" "
        size="sm"
        className="w-3/4 [&_input]:py-[3px]"
        onChange={handleFileChange}
        description={
          team?.logo
            ? `Fichier charger: ${team?.logo}`
            : ".svg obligatoire, fond transparent conseillé"
        }
      />
      <div className="flex justify-end gap-4">
        <Button
          color="success"
          size="sm"
          endContent={<MdCheck />}
          onClick={() => {
            editable ? fetchEditTeam() : fetchAddTeam();
          }}
        >
          Valider
        </Button>
        <Button
          color="danger"
          size="sm"
          endContent={<MdClose />}
          onClick={toggleOpen}
        >
          Annuler
        </Button>
      </div>
    </div>
  );
};

export default TeamForm;
