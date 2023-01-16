import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Product } from "../../../../dto/ProductDTO";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

export type ProductCardProps = {
  product: Product;
};

export default function ProductCard(props: ProductCardProps) {
  const productImage = "https://source.unsplash.com/random/?" + props.product.name.split(" ")[0];
  const navigate = useNavigate();

  const onClickTitle = () => {
    navigate("/product/" + `${props.product.name}`, { state: { id: props.product.id } });
  };

  return (
    <Card sx={{ minWitdh: "80%", margin: "auto" }} className="productCard" onClick={onClickTitle}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={productImage} alt="product image" />
        <CardContent>
          {props.product.isActive ? (
            <Typography gutterBottom variant="h5" component="div">
              {props.product.name}
            </Typography>
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {props.product.name} - No longer active
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            {props.product.description}
          </Typography>
          <Typography>Starting at: {props.product.startingPrice}</Typography>
          <Typography>Bidding closes on: {new Date(props.product.biddingClosesOn).toLocaleString()}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn more</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
