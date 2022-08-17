import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Container, Typography, Box, Button, Backdrop, Modal, Fade, Radio, FormGroup, Checkbox, FormControlLabel, FormControl } from "@material-ui/core";
import { useSelector } from 'react-redux';
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomCheckbox = withStyles({
  root: {
    color: '#c5cab8',
    '&$checked': {
      color: '#fff9ad',
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);

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
    marginLeft: '60px',
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
    fontFamily: "BreviaBold",
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
    marginTop: '20px',
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

  const [checkList, setCheckList] = useState([]); // array for checked ones

  const [dipped, setDipped] = useState(false) // dipped state

  const dipChip = () => {
    checkList.length && setDipped(true);
    !checkList.length && toast.error(`Choose one Dip!`);
  }

  const tasty = () => {
    setCheckboxArr([
      {
        id: 1,
        name: "Chip #1"
      },
      {
        id: 2,
        name: "Chip #2"
      }
    ])
    setDipped(false);
    setCheckList([]);
  }

  const [selectedDip, setSelectedDip] = useState(); // selected dip category

  const chooseDip = (event) => {
    if (!address) {
      toast.error(`Connect your wallet!`)
      return;
    }

    event.preventDefault();
    setSelectedDip(event.currentTarget.id);
    setOpen(true);
  }

  const [checkboxArr, setCheckboxArr] = useState([
    {
      id: 1,
      name: "Chip #1"
    },
    {
      id: 2,
      name: "Chip #2"
    },
    {
      id: 3,
      name: "Chip #3"
    }
  ]);

  const handleChange = e => {
    if (e.target.checked === true) {
      setCheckList([...checkList, Number(e.target.value)]);
    } else {
      const selectedAcc = checkList.filter(a => {
        if (a === Number(e.target.value)) return false;
        return true;
      });
      setCheckList([...selectedAcc]);
    }
  };

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
                <FormControl component="fieldset" className={classes.formControl}>
                  <FormGroup>
                    {checkboxArr.map(elem => {
                      return <FormControlLabel
                        key={elem.id}
                        control={
                          <CustomCheckbox
                            value={elem.id}
                            onChange={e => handleChange(e)}
                            checked={
                              checkList.lastIndexOf(Number(elem.id)) >= 0 ? true : false
                            }
                            name={elem.name} />
                        }
                        label={elem.name} />
                    })}
                  </FormGroup>
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
                  You dipped chip #{checkList};
                </Typography>
                <Typography className={classes.selectModalTitle}>
                  You have two more chips available to dip this session
                </Typography>
                <Box mt="20px" display='flex' justifyContent='center'>
                  <Button variant="contained" color="primary" onClick={tasty}>
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