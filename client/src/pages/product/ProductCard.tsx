import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "./../../dto/ProductDTO";
import { useState } from "react";
import { CardActionArea } from "@mui/material";

export type ProductCardProps = {
  product: Product;
};

export default function ProductCard(props: ProductCardProps) {
  const onClickTitle = () => {
    //navigate to product page and add ID
  };

  return (
    <Card sx={{ maxWidth: 345, margin: 2 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="https://source.unsplash.com/random/?product/" alt="product image" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div" onClick={onClickTitle}>
            {props.product.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.product.description}
          </Typography>
          <Typography>{props.product.startingPrice}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn more</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
