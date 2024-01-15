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
    <Card sx={{ width: "300px", margin: "auto" }} className="productCard" onClick={onClickTitle}>
      <CardActionArea>
        <CardMedia component="img" height="250" width={300} image={productImage} alt="internship image" sx={{maxWidth: "300px", borderRadius: 1}}/>
        <CardContent>
          {props.internship.isActive ? (
            <Typography gutterBottom variant="h5" component="div" sx={{fontWeight: 700}}>
              {props.internship.name}
            </Typography>
          ) : (
            <Typography gutterBottom variant="h5" component="div">
              {props.internship.name} - No longer active
            </Typography>
          )}

          <Typography gutterBottom variant="body2" color="text.secondary">
            {props.internship.description}
          </Typography>
          <Typography sx={{fontWeight: 600, display: "flex", gap: 1}}>Open positions: <Typography  sx={{color: "red", fontWeight: 700}}>{props.internship.openPositions}</Typography></Typography>
          <Typography  sx={{fontWeight: 600, display: "flex", gap: 1}}>Apply until: <Typography  >{new Date(props.internship.activeUntil).toLocaleString()}</Typography></Typography>
        </CardContent>
        <CardActions>
          <Button variant="contained" color="secondary" size="medium">Learn more</Button>
        </CardActions>
      </CardActionArea>
    </Card>
  );
}
