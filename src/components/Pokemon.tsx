import { Pokemon, PokemonType } from "../PokeAPI/types/Pokemon";


type PokemonViewProps = {
    pokemonName: string,
    data: Pokemon,
    desc: any,
}

export function PokemonView({ pokemonName, data, desc }: PokemonViewProps) {
    const flavorText = formatFlavorText(desc.flavor_text_entries[0].flavor_text);
    const imgSrc = data.sprites.other.dream_world.front_default;
    return (
        <div className="bg-slate-300 block w-fit">
            <h1>{pokemonName}</h1>
            <h2>{data.id}</h2>
            {/* <img src={imgSrc} /> */}
            <Image src={imgSrc} />
            {/* Stats */}
            <div>
                <div>Height: {data.height / 10}m</div>
                <div>Weight: {data.weight * 0.1}kg</div>
            </div>
            {/* Description */}
            <div>
                {flavorText}
            </div>
            {/* Type */}
            <div>
                Type
                <TypeView types={data.types} />
            </div>
        </div>
    );
}

function Image({ src: src }: { src: string }) {
    return (
        <div className=" max-w-xs object-contain bg-purple-500">
            <img src={src} />
        </div>
    )
}

function TypeView({ types }: { types: PokemonType[] }) {
    const typeJsx = types.map((entry) => {
        const type = entry.type.name;
        const typeColor = getTypeColors(type);
        return (
            <div key={type} className={typeColor.out()}>
                {type}
            </div>
        )
    });

    return (
        <div>
            {typeJsx}
        </div>
    )
}

function getTypeColors(type: string): TypeColor {
    switch (type) {
        case 'fire':
            return new TypeColor("bg-orange-500", "text-black");
        default:
            return new TypeColor("bg-black", "white");
    }
}

class TypeColor {
    constructor(public background: string, public text?: string) {

    }
    out() {
        return this.background + " " + this.text + " ";
    }
}

function formatFlavorText(text: string) {
    return text.replace("\f", " ");
}