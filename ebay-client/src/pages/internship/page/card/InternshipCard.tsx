import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Internship } from "../../../../dto/InternshipDTO";
import { CardActionArea } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./InternshipCard.css";
import {NavigationRoutes} from "../../../../routes/ROUTES";

export type InternshipCardProps = {
  internship: Internship;
};

export default function InternshipCard(props: InternshipCardProps) {
  const productImage = "https://source.unsplash.com/random/?" + props.internship.name.split(" ")[0];
  const navigate = useNavigate();

  const onClickTitle = () => {
    navigate( NavigationRoutes.INTERNSHIP + "/" + `${props.internship.name}`, { state: { id: props.internship.id } });
  };

  return (
    <Card sx={{ minWitdh: "80%", margin: "auto" }} className="productCard" onClick={onClickTitle}>
      <CardActionArea>
        <CardMedia component="img" height="140" image={productImage} alt="internship image" />
        <CardContent>
          {props.internship.isActive ? (
            <Typography gutterBottom variant="h5" component="div">
              {props.internship.name}
            </Typography>
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {props.internship.name} - No longer active
            </Typography>
          )}

          <Typography variant="body2" color="text.secondary">
            {props.internship.description}
          </Typography>
          <Typography>Open positions: {props.internship.openPositions}</Typography>
          <Typography>Apply until: {new Date(props.internship.activeUntil).toLocaleString()}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn more</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
