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
} from "@nextui-org/react";

const TeamDetail = ({ team }: { team: any }) => {
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
          <Table removeWrapper fullWidth>
            <TableHeader>
              <TableColumn>Nom</TableColumn>
              <TableColumn>Numéro</TableColumn>
              <TableColumn>Poste</TableColumn>
            </TableHeader>
            <TableBody emptyContent={"Pas de joueurs dans cette équipe."}>
              {team.players?.map((player: any, key: any) => (
                <TableRow key={key}>
                  <TableCell className="flex gap-2 items-center">
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
                  </TableCell>
                  <TableCell>{player.number}</TableCell>
                  <TableCell>
                    <Chip color={chipPoste(player.position)}>
                      {player.position}
                    </Chip>
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
