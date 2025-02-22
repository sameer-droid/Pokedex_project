import { useEffect, useState } from "react"
import axios from 'axios' ;
import './PokemonList.css'
import Pokemon from "../Pokemon/Pokemon";


function PokemonList(){
    const [isloading,setisloading]=useState(true);
    const [pokemonlist,setpokemonlist] =useState([]);
    const [nexturl,setnext] = useState('');
    const [prev,setprev] = useState('');
     const [pokedexurl,setpokedexurl] =useState("https://pokeapi.co/api/v2/pokemon");
    
async function downloadPokemons(){
    setisloading(true);
    const response = await axios.get(pokedexurl);
    const pokemonsresults = response.data.results;
    console.log(response.data);
    setnext(response.data.next);
    setprev(response.data.previous);
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
               } ,[pokedexurl])
    return (
        <div className="pokemon-list-wrapper">
            <div>  List of pokemons</div>
          <div className="pokemon-wrapper">
            {(isloading)?"Loading" : 
            pokemonlist.map((pokemon)=> <Pokemon name={pokemon.name} image ={pokemon.image} key={pokemon.id}/>)
            }
            </div>
            <div className="controls">
                <button disabled={prev==null} onClick={()=>setpokedexurl(prev)}>prev</button>
                <button disabled={nexturl==null} onClick={()=>setpokedexurl(nexturl)}>next</button>
            </div>
            
        </div>
    )
}
export default PokemonList