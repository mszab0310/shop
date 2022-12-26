import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../../../dto/ProductDTO";
import { CardActionArea } from "@mui/material";
import { NavigationRoutes } from "src/routes/ROUTES";
import { useNavigate } from "react-router-dom";

export type ProductCardProps = {
  product: Product;
};

export default function ProductCard(props: ProductCardProps) {
  const productImage = "https://source.unsplash.com/random/?" + props.product.name.split(" ")[0];
  const navigate = useNavigate();

  const onClickTitle = () => {
    navigate(NavigationRoutes.PRODUCT + `:${props.product.name}`);
    //navigate to product page and add ID
  };

  return (
    <Card sx={{ minWitdh: "80%", margin: "auto" }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={productImage} alt="product image" />
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
