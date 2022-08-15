import { makeStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Grid, Button } from "@material-ui/core";
import { useSelector } from 'react-redux';
import clsx from "clsx";
import { useState } from "react";
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  dip: {
    width: '100px',
    transition: 'all .3s ease',
    zIndex: 30,
  },
  bowl: {
    width: '200px',
    transition: 'all .3s ease',
    zIndex: 20,
  },
  section: {
    display: 'flex',
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '50px',
    "&:first-child": {
      marginLeft: '0px',
    },
    cursor: 'pointer',
    "&:hover img:first-child": {
      zIndex: 30,
      WebkitTransform: 'scale(1.5)',
      transform: 'scale(1.5)',
    },
    "&:hover img:last-child": {
      zIndex: 20,
      WebkitTransform: 'scale(2)',
      transform: 'scale(2)',
    },
  },
  title: {
    fontFamily: "Poppins",
    lineHeight: "30px",
    fontSize: '50px',
    fontWeight: "500",
    color: '#fff9ad',
    marginTop: '100px',
    textAlign: 'center'
  }
}));

const Dip = () => {
  const classes = useStyles();
  const {
    address,
    balance
  } = useSelector(state => state.ConnectWallet);

  const imgArr = [
    {
      url1: 'dipchip1.png',
      url2: 'quesobowl.png'
    },
    {
      url1: 'dipchip2.png',
      url2: 'guacbowl.png'
    },
    {
      url1: 'dipchip3.png',
      url2: 'salsabowl.png'
    }
  ]

  return (
    <Container>
      <Typography className={classes.title}>CHOOSE YOUR DIP</Typography>
      <Box display="flex" justifyContent='center' mt="50px">
        {imgArr.map((elem, index) => {
          return <Box key={index} className={classes.section}>
            <img className={classes.dip} src={elem.url1}></img>
            <img className={classes.bowl} src={elem.url2}></img>
          </Box>
        })}
      </Box>
    </Container>
  );
};

export default Dip;