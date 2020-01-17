import React ,{ Fragment, useState, useEffect }  from "react";
import axios from 'axios';
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Icon from "@material-ui/core/Icon";

// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import Button from "components/CustomButtons/Button.js";
import HeaderLinks from "components/Header/HeaderLinks.js";

import styles from "assets/jss/material-kit-react/views/landingPage.js";
import CustomDropdown from 'components/CustomDropdown/CustomDropdown.js';
import CustomInput from "components/CustomInput/CustomInput.js";

import PokemonList from "./Sections/PokemonList.js";

const dashboardRoutes = [];

const useStyles = makeStyles(styles);
export default  function LandingPage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [data, setData] = useState(null);
  const [dataImage, setDataImage] = useState({sprites: []});
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [limit,setLimit] = useState(10);

  let handleClickSearch = event => {setQuery(search.toLocaleLowerCase())}

  let handleChangeCustomInput = event =>{ setSearch(event.target.value)}

  let handleDropDown = (params) => { setLimit(params) }
  
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://pokeapi.co/api/v2/pokemon/${query}?limit=${limit}`);
      setData(result)
    };
    fetchData();
  }, [query,limit]);


  return (
    <Fragment>
      <div style={{
        backgroundImage:'url(https://wallpapercave.com/wp/wp2311695.png)',
        backgroundSize:'contain'
      }}>
        
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Pokemon"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 100,
            color: ""
          }}
          {...rest}
        />

        <GridContainer className={classes.addPaddingTop120}>
          <GridItem xs={12} sm={12} md={12}>
            <CustomDropdown
              handleDropDown = {handleDropDown}
              dropup
              dropdownHeader="Pokemon show limit"
              buttonText="Limit"
              buttonProps={{
                round: true,
                color: "primary"
              }}
              dropdownList={[
                "100",
                "50",
                "25",
                "10",
                "5",
              ]}
            />
          </GridItem>
          <GridItem className={classes.addPaddingLeft25} xs={9} sm={9} md={9}>
            <CustomInput
              white={true}
              handleOnChangeCustomInput={handleChangeCustomInput}
              id="regular"
              inputProps={{placeholder: "Search pokemon..."}}
              formControlProps={{fullWidth: true}}
          />
          </GridItem>
          <GridItem xs={3} sm={3} md={3}>
            <Button 
              onClick={handleClickSearch}
              className={classes.addMarginTop35} 
              justIcon 
              round 
              color="primary">
                <Icon>search</Icon>
            </Button>
          </GridItem>

          {data !== null && Array.isArray(data.data.results) ?  (
            data.data.results.map((p,index)=>(
              <PokemonList
                pokemonName={p.name}
                searchTerm={false}
                key={`poke-${index}`}
                dataPokemon={p} />) 
            )
            ): search !== '' ? (<PokemonList pokemonName={data.data.name} dataPokemon={data.data} searchTerm ={true} />) : '' 
          }
          
        </GridContainer>
        <Footer />
      </div>
    </Fragment>
  );
}
