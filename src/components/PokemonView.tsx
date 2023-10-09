import { useState } from "react";
import { useParams } from "react-router-dom";
import { isValidPokemon } from "../PokeAPI/Utility";
import { Pokemon, PokemonSpecies } from "../PokeAPI/types/Pokemon";
import { usePokemon, validatePokemonData } from "../hooks/usePokemon";
import { Loader } from "./Loader";
import { Column, TwoColumnView } from "./TwoColumnView";
import { PokemonMoveTables } from "./pokemon/PokemonMoveTable";
import { TypeView } from "./pokemon/TypeView";
import { VersionGroupValue } from "../PokeAPI/types/Custom";
import { useGameVersion } from "../hooks/useGameVersion";
import { formatFlavorText } from "../utility/StringCleaning";
import { gameVersionMap } from "../utility/data";

const starEmpty = require("Icons/star-outline.svg");
const starFull = require("Icons/star-full-outline.svg");

export function PokemonView() {
    let { pokemonName } = useParams();
    if (pokemonName === undefined) pokemonName = "";
    const pokeData = usePokemon(pokemonName);
    const gameVersion = useGameVersion();
    if (!isValidPokemon(pokemonName)) return (<div>Invalid pokemon!</div>);
    if (!validatePokemonData(pokeData)) return (<Loader />);
    const { pokemon, species } = pokeData;
    const flavorText = getFlavorText(species!, gameVersion);
    const imgSrc = pokemon!.sprites.other["official-artwork"].front_default;
    const imgShinySrc = pokemon!.sprites.other["official-artwork"].front_shiny;
    return (
        <div>
            <div className="px-5">
                <div className="border-2 border-gray-400 rounded p-4 my-4 text-2xl text-gray-400 text-center">
                    {pokemonName} | #{pokemon!.id}
                </div>
            </div>

            <TwoColumnView className="bg-red-400 box-border p-5">
                <Column center>
                    <PokemonImage src={imgSrc} srcShiny={imgShinySrc} />
                </Column>
                <Column className="p-5 h-full border border-gray-200 rounded">
                    <StatTable pokemon={pokemon!} species={species!} />
                    <div className="mt-5">
                        {flavorText}
                    </div>
                </Column>
            </TwoColumnView>
            <PokemonMoveTables pokemonName={pokemonName} />
        </div>
    );
}

function StatTable({ pokemon, species }: { pokemon: Pokemon, species: PokemonSpecies }) {
    const namedData = {
        Name: pokemon.name,
        Height: formatHeight(pokemon.height),
        Weight: formatWeight(pokemon.weight),
        Species: species.genera.find(v => v.language.name === "en")?.genus,
        Type: <TypeView types={pokemon.types.map(entry => entry.type.name)} />
    };

    const elements = [];
    for (const entry of Object.entries(namedData)) {
        const name = entry[0];
        const value = entry[1];
        elements.push((<tr key={name} className="border-b border-b-slate-400">
            <td className="pr-10 text-neutral-300">{name}</td>
            <td>{value}</td>
        </tr>));
    }

    return (
        <table>
            <tbody>
                {elements}
            </tbody>
        </table>
    );
}

function PokemonImage({ src, srcShiny }: { src: string, srcShiny: string }) {
    const [shiny, setShiny] = useState(false);
    const defaultVisibility = shiny ? "hidden" : "";
    const shinyVisiblity = shiny ? "" : "hidden";

    function handleShinyClick() {
        setShiny(!shiny);
    }

    return (
        <div className="relative max-w-xs bg-slate-200 border-2 border-slate-400 rounded-xl p-5 flex items-center">
            <img src={src} className={defaultVisibility} />
            <img src={srcShiny} className={shinyVisiblity} />
            <ShinyButton src={starEmpty} onClick={handleShinyClick} className={defaultVisibility} />
            <ShinyButton src={starFull} onClick={handleShinyClick} className={shinyVisiblity} />
        </div>
    );
}

function ShinyButton({ src, className, onClick }: { src: string, className: string, onClick: React.MouseEventHandler }) {
    return <img className={className + " absolute right-1 bottom-1 cursor-pointer"} src={src} title="Toggle Shiny" onClick={onClick} />;
}

function getFlavorText(species: PokemonSpecies, gameVersion: VersionGroupValue) {
    const gameVersions = gameVersionMap[gameVersion];
    let flavorText = species.flavor_text_entries.find(entry => gameVersions.includes(entry.version.name) && entry.language.name == "en");
    if (flavorText === undefined) flavorText = species.flavor_text_entries.find(entry => entry.language.name === "en");
    if (flavorText === undefined) flavorText = species.flavor_text_entries[0];
    return formatFlavorText(flavorText.flavor_text);
}

function formatHeight(height: number): string {
    const heightMeters = height / 10;
    const heightFeetInches = heightMeters * 3.28;
    const heightFeet = Math.floor(heightFeetInches);
    const heightInches = Math.round((heightFeetInches % 1) * 12);
    return heightMeters.toString() + " m / " + heightFeet + "'" + heightInches + "\"";
}

function formatWeight(weight: number): string {
    const weightKg = weight / 10;
    const weightLbs = (weightKg * 2.205).toFixed(2);
    return `${weightKg} kg / ${weightLbs} lbs`;
}