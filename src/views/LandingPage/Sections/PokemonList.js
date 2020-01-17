import React,{useState, useEffect } from "react";
// material-ui components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Button from "components/CustomButtons/Button.js";

import imagesStyles from "assets/jss/material-kit-react/imagesStyles.js";

import { cardTitle } from "assets/jss/material-kit-react.js";
import { useHistory } from "react-router-dom";
import axios from 'axios';

const styles = {
  ...imagesStyles,
  cardTitle,
};

const useStyles = makeStyles(styles);
const { useImperativeHandle } = React;


export default function PokemonList(props) {
  const classes = useStyles();
  let history = useHistory();
  const [pokemon,setPokemon] = useState({})
  const [searchTerm,setSearchTearm] = useState("")
  const [pokemonId, setPokemonId] = useState(0);

  let changeLocation = (id) =>{
    history.push(`/pokemon-detail/${props.pokemonName}`);
  }

  const fetchPokemonFormApi =  async()=>{
    let url = props.dataPokemon !== undefined ? props.dataPokemon.url : "";
    let pokemon = await axios(url);    
    return pokemon;
  }

  useEffect(()=>{ 
    if(props.searchTerm == true){
      setSearchTearm(props.dataPokemon)
    }else{
      Promise.resolve(fetchPokemonFormApi()).then((res)=>{
        setPokemon(res.data)
      })
    }  
    

  },[setPokemonId,searchTerm])

  
  return (
    <Card
      key={pokemon.id !== undefined ? pokemon.id : ''} 
      style={{width: "20rem",margin: '10px auto',}} 
      onClick={changeLocation}
      >
      <CardBody>
        <h4 className={classes.cardTitle}>{ props.dataPokemon !== undefined ? props.dataPokemon.name.charAt(0).toUpperCase()+props.dataPokemon.name.substring(1) : ""}</h4>
        <div style={{display:'flex'}}>
          <div>
            <div>Abilities:</div>
            {pokemon.abilities !== undefined ? 
              pokemon.abilities.map((ability)=>(<Button round color="primary">{ability.ability.name}</Button>)):
              searchTerm == "" ? "" :
              searchTerm.abilities.map(ability=>(<Button round color="primary">{ability.ability.name}</Button>))
            }
          </div>
            {console.log(searchTerm)}
          <img
            style={{height: "100%px", width: "100%", display: "block"}}
            className={classes.imgCardTop}
            src={pokemon.sprites !== undefined ? pokemon.sprites.front_shiny : searchTerm == "" ? "" : searchTerm.sprites.front_shiny }
            alt="Card-img-cap"/>
        </div>
      </CardBody>
    </Card>
  );
}