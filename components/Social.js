import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

import { socialMedia } from "data/socialMedia";

const useStyles = makeStyles((theme) => ({
  snsIcon: {
    width: "30px",
    height: "25px",
    [theme.breakpoints.down("xs")]: {
      width: "20px",
      height: "20px",
    },
    "&:hover": {
      filter: "brightness(0.8)"
    },
    transition: ".2s ease-out"
  },
}));

const Social = ({ color }) => {
  const classes = useStyles();
  // if you want to add more social medias, add it to here and /data/socialMedia.js.
  // and import the Material Icon, then add the code.
  const { twitter, discord } = socialMedia;

  return (
    <Grid item container justifyContent="center" style={{ height: "35px" }}>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={twitter}
        style={{ padding: 0, display: "flex", alignItems: 'center', marginRight: "100px" }}
      >
        <img className={classes.snsIcon} src="icons/light/twitter.svg"></img>
      </Grid>
      <Grid
        item
        component={"a"}
        target="_blank"
        rel="noreferrer noopener"
        href={discord}
        style={{ padding: 0, display: "flex", alignItems: 'center' }}
      >
        <img className={classes.snsIcon} src="icons/light/discord.svg"></img>
      </Grid>
    </Grid>
  );
};

export default Social;
