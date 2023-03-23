


function Pokemon({pokemon, loading }){
    //console.log(pokemon)
    return(
        <div className="pokemon-info">
            {/* <h2>{pokemon[0].species.name}</h2> */}
            {/* <img src={pokemon[0].sprites.front_default}/> */}
            <div className="poke-butttons">
                <button>attribute 1</button>
                <button>attribute 2</button>
            </div>
        </div>
    )
}

export default Pokemon;