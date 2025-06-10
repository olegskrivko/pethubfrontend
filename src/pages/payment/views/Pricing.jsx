
import React from "react";
import { Button, Box, Container, Typography, Grid, Card, CardContent, CardActions } from "@mui/material";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { CheckCircle, Cancel } from "@mui/icons-material";
const PricingPage = () => {

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    // boxShadow: 3,
    boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
    borderRadius: "12px",
    padding: "5px",
    backgroundColor: "#ffffff",
    //backgroundColor: "#f4f6f8",  // Subtle background color for cards
    textAlign: "center",
    height: "100%",
    maxWidth: "380px",
    // margin: "20px",
    border: "1px solid #ddd",  // Soft border for structure
  };

  const cardContentStyle = {
    flexGrow: 1,  // This ensures the content grows and pushes the button to the bottom
  };

  const buttonStyle = {
    backgroundColor: "#5B9BD5",
    color: "#fff",
    borderRadius: "8px",  // Rounded button edges
    '&:hover': {
      backgroundColor: "#4a89c0",
    },
  };

  // const compareTableStyle = {
  //   marginTop: "40px",
  //   borderCollapse: "collapse",
  //   width: "100%",
  //   textAlign: "left",
  //   marginBottom: "40px",
  // };

  // const compareTableHeaderStyle = {
  //   backgroundColor: "#f7f7f7",
  // };

  // const compareTableCellStyle = {
  //   padding: "12px 15px",
  //   border: "1px solid #ddd",
  // };

  return (
          <Container component="main" maxWidth="lg" sx={{ paddingLeft: 0, paddingRight: 0 }}>
  
      {/* <Typography variant="h3" style={{ textAlign: "center", marginBottom: "40px" }}>
        Izvēlieties savu plānu
      </Typography> */}
                          <Typography variant="h4" align="center" sx={{ mb: 5, fontWeight: 800,
                                
                                       
                                               
                                               background: "linear-gradient(60deg, #16477c 0%, #00b5ad 100%)",
                                               WebkitBackgroundClip: "text",
                                     WebkitTextFillColor: "transparent"
                                    }}>Izvēlieties savu plānu</Typography>
     {/* Freemium Card */}
      <Grid container spacing={3} justifyContent="center">
   
    
        <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} display="flex" justifyContent="center">

          <Card style={cardStyle} sx={{ background: 'linear-gradient(90deg, #d0f0f5 0%, #e3fbff 100%)', border: "1px solid #ddd !important", borderRadius: "8px"}}>
            <CardContent style={cardContentStyle}>
              <Typography variant="h4" style={{ fontWeight: "bold", color: "#16477c" }}>Freemium plāns</Typography>
              <Typography variant="h5" mt={1} sx={{color: "#00b5ad"}} gutterBottom>
                Bezmaksas
              </Typography>
              <List style={{ textAlign: 'left'}}>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet 1 pazudušu, atrastu dzīvnieku" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Pārlūkojiet pakalpojumus un meklējiet dzīvniekus" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Saņemiet reāllaika paziņojumus" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet 1 pakalpojumu" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary"  /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve pamata nodarbībām" />
                </ListItem>
               
              
             
            
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājuma laiks līdz 30 dienām" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Ekskluzīvas atlaides dzīvnieku pakalpojumiem" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Plus punkts karmai" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve premium nodarbībām" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājums sociālajos tīklos" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Individuālās konsultācijas" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Bez reklāmām" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="AI chatbots" />
                </ListItem>
                
              </List>
            </CardContent>
            <CardActions style={{ width: "100%", padding: "1rem" }}>
              <Button variant="outlined" fullWidth sx={{
                    mt: 2,
                    py: 1,
                    background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
                    color: "white",
                  }}>
                Bez maksas
              </Button>
            </CardActions>
          </Card>
        </Grid>

        {/* Plus Card */}

  <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} display="flex" justifyContent="center">
  <Card style={cardStyle} sx={{background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)', border: "1px solid #ddd !important", borderRadius: "8px"}}>
            <CardContent style={cardContentStyle} >
              <Typography variant="h4" style={{ fontWeight: "bold", color: "#16477c" }}>Plus plāns</Typography>
              <Typography variant="h5" mt={1} sx={{color: "#00b5ad"}} gutterBottom>
                5€ / mēnesī
              </Typography>
              <List style={{ textAlign: 'left' }}>
              <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Prioritārie dzīvnieku sludinājumi (parādās augšā)" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Paplašināts sludinājumu laiks 90 dienas" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Saņemiet reāllaika paziņojumus" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Ekskluzīvas atlaides dzīvnieku pakalpojumiem" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 3 pakalpojumiem" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Plus punkts karmai" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve premium nodarbībām" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājums sociālajos tīklos" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Individuālās konsultācijas" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Bez reklāmām" />
                </ListItem>

                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle sx={{ color: "#FF746C" }} /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="AI chatbots" />
                </ListItem>
              </List>
            </CardContent>
            <CardActions style={{ width: "100%", padding: "1rem" }}>
              {/* <Link to="/checkout" style={{ width: "100%" }}>
                <Button variant="contained" style={buttonStyle} fullWidth>
                  Plus
                </Button>
              </Link> */}
              <Link to="/checkout?plan=plus" style={{ width: "100%" }}>
  {/* <Button variant="contained" style={buttonStyle} fullWidth >
    Plus
  </Button> */}
       <Button variant="outlined" fullWidth sx={{
                    mt: 2,
                    py: 1,
                    background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
                    color: "white",
                  }}>
                Plus
              </Button>
</Link>

            </CardActions>
          </Card>
  </Grid>

  <Grid size={{ xs: 12, sm: 8, md: 4, lg: 4 }} display="flex" justifyContent="center">
  <Card style={cardStyle} sx={{background: 'linear-gradient(90deg, #e8f6f9 0%, #f1faff 100%)', border: "1px solid #ddd !important", borderRadius: "8px"}}>
            <CardContent style={cardContentStyle}>
              <Typography variant="h4" style={{ fontWeight: "bold", color: "#16477c" }}>Premium plāns</Typography>
              <Typography variant="h5" mt={1} sx={{color: "#00b5ad"}} gutterBottom>
                12€ / mēnesī
              </Typography>
              <List style={{ textAlign: 'left' }}>
              <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Prioritārie dzīvnieku sludinājumi (parādās augšā)" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Paplašināts sludinājumu laiks 90 dienas" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 5 pazudušiem, atrastiem dzīvniekiem" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Saņemiet reāllaika paziņojumus" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Ekskluzīvas atlaides dzīvnieku pakalpojumiem" />
                </ListItem>
                <ListItem >  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Publicējiet līdz 5 pakalpojumiem" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Plus punkts karmai" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Piekļuve premium nodarbībām" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Sludinājums sociālajos tīklos" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Individuālās konsultācijas" />
                </ListItem>
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="Bez reklāmām" />
                </ListItem>
             
                <ListItem>  <ListItemIcon sx={{padding: "0 !important", margin: "0 !important"}}><CheckCircle color="primary" /></ListItemIcon>
                  <ListItemText sx={{ marginLeft: "-1rem !important" }} primary="AI chatbots" />
                </ListItem>
              </List>
            </CardContent>
            <CardActions style={{ width: "100%", padding: "1rem" }}>
              {/* <Link to="/checkout" style={{ width: "100%" }}>
                <Button variant="contained" style={buttonStyle} fullWidth>
                  Premium
                </Button>
              </Link> */}
              <Link to="/checkout?plan=premium" style={{ width: "100%" }}>
  {/* <Button variant="contained" style={buttonStyle} fullWidth>
    Premium
  </Button> */}
   <Button variant="outlined" fullWidth sx={{
                    mt: 2,
                    py: 1,
                    background: "linear-gradient(0deg, #0994ba 30%, #02b4c4 90%)",
                    color: "white",
                  }}>
                Premium
              </Button>
</Link>
            </CardActions>
          </Card>
  </Grid>



      </Grid>


    </Container>
  );
};

export default PricingPage;
