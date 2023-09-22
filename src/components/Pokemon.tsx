import { Pokemon, PokemonSpecies, PokemonType } from "../PokeAPI/types/Pokemon";
import { usePokemon, validatePokemonData } from "../hooks/usePokemon";
import { MoveTableType, PokemonMoveTables } from "./pokemon/Moves";
import { TypeView } from "./pokemon/TypeView";

type PokemonViewProps = {
    pokemonName: string,
}

export function PokemonView({ pokemonName }: PokemonViewProps) {
    // FIXME : Temp local name
    pokemonName = "bulbasaur"
    const pokeData = usePokemon(pokemonName);
    if (!validatePokemonData(pokeData)) return (<div>Loading...</div>);
    const { pokemon, species } = pokeData;
    const flavorText = formatFlavorText(species!.flavor_text_entries[0].flavor_text);
    const imgSrc = pokemon!.sprites.other["official-artwork"].front_default;
    return (
        <div>
            <div className="">{pokemonName} | #{pokemon!.id}</div>
            <div className="">#{pokemon!.order}</div>
            <div className="bg-blue-300 flex max-w-7xl">
                {/* Left Column */}
                <div className="flex w-1/2 bg-orange-400 justify-center">
                    <Image src={imgSrc} />
                </div>
                {/* Right Column */}
                <div className="w-1/2 p-5">
                    <StatTable pokemon={pokemon!} species={species!} />
                    <div className="mt-5">
                        {flavorText}
                    </div>
                </div>

                {/* Move Table */}
            </div>
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

    const elements = []
    for (const entry of Object.entries(namedData)) {
        const name = entry[0]
        const value = entry[1]
        elements.push((<tr key={name} className="border-b border-b-slate-400">
            <td className="pr-10 text-neutral-300">{name}</td>
            <td>{value}</td>
        </tr>))
    }

    return (
        <table>
            <tbody>
                {elements}
            </tbody>
        </table>
    )
}

function Image({ src }: { src: string }) {
    return (
        <div className="max-w-xs bg-slate-200 border-2 border-slate-400 rounded-xl p-5 flex items-center">
            <img src={src} />
        </div>
    )
}

function formatFlavorText(text: string) {
    return text.replace("\f", " ");
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