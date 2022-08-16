import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Grid, Button, Backdrop, Modal, Fade, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from "@material-ui/core";
import { useSelector } from 'react-redux';
import clsx from "clsx";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomRadio = withStyles({
  root: {
    color: "#c5cab8",
    '&$checked': {
      color: "#fff9ad",
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />);

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
    "&:hover img:nth-child(1)": {
      zIndex: 2,
      WebkitTransform: 'scale(1.5)',
      transform: 'scale(1.5)',
    },
    "&:hover img:nth-child(2)": {
      zIndex: 1,
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
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: "450px",
    minHeight: '350px',
    border: '5px solid #000f47',
    boxShadow: theme.shadows[5],
    padding: "30px",
    background: "#4e6dd1",
    borderRadius: "20px",
    outline: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column'
  },
  selectModalTitle: {
    color: '#fff9ad',
    fontSize: '20px',
    textAlign: 'center',
    marginBottom: '20px'
  },
  customLabel: {
    fontWeight: "bold",
    fontSize: "16px",
    lineHeight: "1.5",
    color: "#001446",
  },
  chipTitle: {
    fontWeight: "bold",
    fontSize: "25px",
    textTransform: 'uppercase',
    lineHeight: "1.5"
  }
}));

const Dip = () => {
  const classes = useStyles();
  const {
    address,
    balance
  } = useSelector(state => state.ConnectWallet);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const imgArr = [
    {
      id: 'queso',
      url1: 'dipchip1.png',
      url2: 'quesobowl.png',
      color: '#d29f4d'
    },
    {
      id: 'guac',
      url1: 'dipchip2.png',
      url2: 'guacbowl.png',
      color: '#71cf2d'
    },
    {
      id: 'salsa',
      url1: 'dipchip3.png',
      url2: 'salsabowl.png',
      color: '#500912'
    }
  ]

  const [value, setValue] = useState(null); // choosen chip number

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const [dipped, setDipped] = useState(false)

  const dipChip = () => {
    value && setDipped(true);
    !value && toast.error(`Choose one Dip!`);
  }

  const [selectedDip, setSelectedDip] = useState();

  const chooseDip = (event) => {
    event.preventDefault();
    setSelectedDip(event.currentTarget.id)
    setOpen(true)
    setValue(null);
    setDipped(false);
  }

  return (
    <Container>
      <Typography className={classes.title}>CHOOSE YOUR DIP</Typography>
      <Box display="flex" justifyContent='center' mt="50px">
        {imgArr.map((elem, index) => {
          return <Box key={index} className={classes.section} id={elem.id} onClick={chooseDip}>
            <img className={classes.dip} src={elem.url1}></img>
            <img className={classes.bowl} src={elem.url2}></img>
            <Typography className={classes.chipTitle} style={{ color: elem.color }}>{elem.id}</Typography>
          </Box>
        })}
      </Box>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box className={classes.paper}>
            {!dipped ? (
              <>
                <Typography className={classes.selectModalTitle}>
                  Please select each chip you would like to dip in <span style={{ textTransform: 'capitalize' }}>{selectedDip}</span>
                </Typography>
                <FormControl component="fieldset">
                  <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel value="873" control={<CustomRadio />} label={<Typography className={classes.customLabel}>Chip #873</Typography>} />
                    <FormControlLabel value="44" control={<CustomRadio />} label={<Typography className={classes.customLabel}>Chip #44</Typography>} />
                    <FormControlLabel value="1222" control={<CustomRadio />} label={<Typography className={classes.customLabel}>Chip #1222</Typography>} />
                  </RadioGroup>
                </FormControl>
                <Box mt="20px" display='flex' justifyContent='center'>
                  <Button variant="contained" color="primary" onClick={dipChip}>
                    Dip it
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography className={classes.selectModalTitle}>
                  You dipped chip #{value};
                </Typography>
                <Typography className={classes.selectModalTitle}>
                  You have two more chips available to dip this session
                </Typography>
                <Box mt="20px" display='flex' justifyContent='center'>
                  <Button variant="contained" color="primary" onClick={() => setDipped(false)}>
                    Tasty
                  </Button>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

export default Dip;