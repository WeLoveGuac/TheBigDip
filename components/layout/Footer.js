import Link from "components/Link";
import { useRouter } from "next/router";

import { makeStyles } from "@material-ui/core/styles";

import { Container, Grid, Typography, Box } from "@material-ui/core";

import Social from "components/Social";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: '#078965',
    width: `100%`,
    position: "relative",
    overflow: "hidden",
  },
  link: {
    fontStyle: "normal",
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "24px",
    color: "#9CA3AF",
    "&:hover": {
      color: '#30B943',
    },
  },
  copylight: {
    fontStyle: "normal",
    fontWeight: "400",
    fontSize: "18px",
    lineHeight: "24px",
    color: "#FFFFFF",
    "&:hover": {
      color: '#30B943',
    },
  },
}));

const Footer = () => {
  const classes = useStyles();
  // const path = [
  //   { name: "About", link: "/about" },
  //   { name: "Blog", link: "/blog" },
  //   { name: "Jobs", link: "/jobs" },
  //   { name: "Press", link: "/press" },
  //   { name: "Accessibility", link: "/access" },
  //   { name: "Partners", link: "/partners" },
  // ];
  const path = []

  const router = useRouter();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Grid container direction="column" style={{ margin: "27px 0 27px 0" }}>
          <Social />
        </Grid>
        <Grid
          item
          container
          rel="noreferrer noopener"
          justifyContent="center"
          style={{
            textDecoration: "none",
          }}
        >
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
