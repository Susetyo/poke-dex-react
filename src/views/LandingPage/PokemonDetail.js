import React,{ Fragment, useState, useEffect }   from "react";
import axios from 'axios';

// material-ui components
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
import Face from "@material-ui/icons/Face";
import Chat from "@material-ui/icons/Chat";
import Build from "@material-ui/icons/Build";

// core components
import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";
import Header from "components/Header/Header.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import Parallax from "components/Parallax/Parallax.js";
import { cardTitle } from "assets/jss/material-kit-react.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";

const styles = {
    ...imagesStyles,
    cardTitle,
    textCenter: {
      textAlign: "center"
    },
    parallaxHeight: {
      height: "60vh"
    },
    makeCenter:{
      margin:'0 auto'
    }
};
const dashboardRoutes =[];

const useStyles = makeStyles(styles);
export default function PokemonDetail(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const [pokemonImage, setPokemonImage] = useState({sprites:{}});
  const [aboutPokemon, setAboutPokemon] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(`https://pokeapi.co/api/v2/pokemon-form/${props.match.params.name}`);
      setPokemonImage(result.data)
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let data = {};
      const about = await axios(`https://pokeapi.co/api/v2/pokemon/${props.match.params.name}`);
      data["height"] =  about.data.height;
      data["weight"] = about.data.weight;
      data["abilities"] = about.data.abilities.map((ability)=>ability.ability.name);
      const species = await axios(`https://pokeapi.co/api/v2/pokemon-species/${props.match.params.name}`);
      data["eggGroups"] = species.data.egg_groups.map((egg)=>egg.name);
      data["genera"] = species.data.genera[2].genus;
      console.log(data)
      setAboutPokemon(data)
    };
    fetchData();
  }, []);


  console.log(pokemonImage)
  return (
    <Fragment>
      <Header
        color="transparent"
        routes={dashboardRoutes}
        brand="Material Kit React"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 400,
          color: "white"
        }}
        {...rest}
      />
      <Parallax 
        className={classes.parallaxHeight}
        filter 
        image={require("assets/img/landing-bg.jpg")}>
        <div className={classes.container, classes.makeCenter}>
          <GridContainer>
            <GridItem
               style={{width:'440px'}}
               xs={12} 
               sm={12} 
               md={6}>
              <img
                style={{height: "100%px", width: "100%", display: "block"}}
                className={classes.imgCardTop}
                src={pokemonImage.sprites !== undefined ? pokemonImage.sprites.front_shiny : ""}
                alt="Card-img-cap"/>
            </GridItem>
          </GridContainer>
        </div>
      </Parallax>
      <CustomTabs
        headerColor="primary"
        tabs={[
          {
            tabName: "About",
            tabIcon: Face,
            tabContent: (
              <div>
                <div>Species: {aboutPokemon.genera}</div>
                <div>Height: {aboutPokemon.height}</div>
                <div>Weight: {aboutPokemon.weight}</div>
                <div>Abilities: {aboutPokemon.abilities ? aboutPokemon.abilities[0] : ""}</div>

                <div>Breeding</div>
                <div>Gender:</div>
                <div>Egg Groups: {aboutPokemon.eggGroups ? aboutPokemon.eggGroups[0] : ""}</div>
                <div>Egg Cycle: {aboutPokemon.eggGroups ? aboutPokemon.eggGroups[1] : ""} </div>
      
              </div>
            )
          },
          {
            tabName: "Base Status",
            tabIcon: Chat,
            tabContent: (
              <p className={classes.textCenter}>
                I think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that
                things could be at. I will be the leader of a company
                that ends up being worth billions of dollars, because
                I got the answers. I understand culture. I am the
                nucleus. I think that’s a responsibility that I have,
                to push possibilities, to show people, this is the
                level that things could be at.
              </p>
            )
          },
          {
            tabName: "Evolution",
            tabIcon: Build,
            tabContent: (
              <p className={classes.textCenter}>
                think that’s a responsibility that I have, to push
                possibilities, to show people, this is the level that
                things could be at. So when you get something that has
                the name Kanye West on it, it’s supposed to be pushing
                the furthest possibilities. I will be the leader of a
                company that ends up being worth billions of dollars,
                because I got the answers. I understand culture. I am
                the nucleus.
              </p>
            )
          }
        ]}
      />
    </Fragment>
  );
}