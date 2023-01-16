import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Product } from "src/dto/ProductDTO";
import { useNavigate } from "react-router-dom";

function createData(id: number, name: string, price: number, isActive: boolean, isSold: boolean) {
  return { id, name, price, isActive, isSold };
}

export type DataTableProps = {
  products: Product[];
  bid?: boolean;
  uid?: number;
};

export default function DataTable(props: DataTableProps) {
  const navigate = useNavigate();
  const rows: any[] = [];

  props.products.forEach((product) => {
    let sold;
    if (props.bid === false) {
      sold = !product.isActive && product.bidderId !== null;
    } else {
      sold = props.uid === product.bidderId;
    }
    rows.push(createData(product.id, product.name, product.startingPrice, product.isActive, sold));
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
            <TableCell align="right">Starting price</TableCell>
            <TableCell align="right">Active</TableCell>
            <TableCell align="right">{props.bid === true ? "Won" : "Sold"}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }} onClick={() => viewProductPage(row.id, row.name)}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.name}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.isActive.toString()}</TableCell>
              <TableCell align="right">{row.isSold.toString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
