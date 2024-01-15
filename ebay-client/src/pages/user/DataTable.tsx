import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Internship } from "../../dto/InternshipDTO";
import { useNavigate } from "react-router-dom";

function createData(id: number, name: string, positions: number, isActive: boolean) {
  return { id, name, positions, isActive };
}

export type DataTableProps = {
  internships: Internship[];
  bid?: boolean;
  uid?: number;
};

export default function DataTable(props: DataTableProps) {
  const navigate = useNavigate();
  const rows: any[] = [];

  props.internships.forEach((internship) => {
    let sold;
    if (props.bid === false) {
      sold = !internship.isActive && internship.userID !== null;
    } else {
      sold = props.uid === internship.userID;
    }
    rows.push(createData(internship.id, internship.name, internship.openPositions, internship.isActive));
  });

  const viewProductPage = (id: number, name: string) => {
    navigate("/product/" + `${name}`, { state: { id: id } });
  };

  return (
    <TableContainer component={Paper} sx={{ maxWidth: 850 }}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Your listings</TableCell>
            <TableCell align="right">Name</TableCell>
            <TableCell align="right">Open Positions</TableCell>
            <TableCell align="right">Active</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} onClick={() => viewProductPage(row.id, row.name)}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.positions}</TableCell>
              <TableCell align="right">{row.isActive.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
