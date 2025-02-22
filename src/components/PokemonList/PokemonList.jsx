import { useEffect, useState } from "react"
import axios from 'axios' ;
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){
    const [isloading,setisloading]=useState(true);
    const [pokemonlist,setpokemonlist] =useState([]);
    
async function downloadPokemons(){
    const response = await axios.get("https://pokeapi.co/api/v2/pokemon");
    const pokemonsresults = response.data.results;
    const pokemonpromises = pokemonsresults.map((pokemon)=> axios.get(pokemon.url));
    const pokemonData = await axios.all(pokemonpromises);
    console.log(pokemonData);
    const res = pokemonData.map((pokeData)=>{
       const pokemon = pokeData.data;
       return{
        id : pokemon.id,
        name : pokemon.name,
        image: (pokemon.sprites.other)? pokemon.sprites.other.dream_world.front_default :pokemon.sprites.front_shiny,
        types: pokemon.types
           }
    });
    console.log(res);
    setpokemonlist(res);
    setisloading(false)
}
              useEffect(()=>{
                downloadPokemons();
               } ,[])
    return (
        <div className="pokemon-list-wrapper">
            <div>  List of pokemons</div>
          <div className="pokemon-wrapper">
            {(isloading)?"Loading" : 
            pokemonlist.map((pokemon)=> <Pokemon name={pokemon.name} image ={pokemon.image} key={pokemon.id}/>)
            }
            </div>
            <div className="controls">
                <button>prev</button>
                <button>next</button>
            </div>
            
        </div>
    )
}
export default PokemonList