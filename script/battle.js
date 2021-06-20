function battle_start(_opponentTeam, _numberOfPokemon)
{
    activeWindow = 'unactive';
    
    //(...) efekty przejścia i takie tam
    
    if(_opponentTeam == null)
    {
        _opponentTeam = [0,0,0,0,0,0];
        switch(_numberOfPokemon)
        {
            case 6: _opponentTeam[5] = new BattlePokemon(randomWildPokemon(1));
            case 5: _opponentTeam[4] = new BattlePokemon(randomWildPokemon(1));
            case 4: _opponentTeam[3] = new BattlePokemon(randomWildPokemon(1));
            case 3: _opponentTeam[2] = new BattlePokemon(randomWildPokemon(1));
            case 2: _opponentTeam[1] = new BattlePokemon(randomWildPokemon(1));
            case 1: _opponentTeam[0] = new BattlePokemon(randomWildPokemon(1));
        }
    }
    
    

}

function randomWildPokemon(level)
{
    return new Pokemon(randomInt(pokemonList.length - 1), level, -1, 0, 0, -1,[1,0,0,0],'',-1,-1,'wild',0,0,0,0);
}