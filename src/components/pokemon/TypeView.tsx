
export function TypeView({ types }: { types: string[] }) {
    const typeJsx = types.map((entry) => {
        const typeColor = "#" + typeColors[entry];
        return (
            <div key={entry}
                className={"inline-flex rounded border border-white-800 py-1 text-sm text-white w-20 justify-center"}
                // Since tailwind can't handle string concatenation, the default style attribute is used for type colors
                style={{ backgroundColor: typeColor }}
            >
                {entry.toUpperCase()}
            </div>
        );
    });

    return (
        <div>
            {typeJsx}
        </div>
    );
}

// Colors from https://bulbapedia.bulbagarden.net/wiki/Category:Type_color_templates
const typeColors: { [index: string]: string } = {
    bug: "A8B820",
    dark: "705848",
    dragon: "7038F8",
    electric: "F8D030",
    fairy: "EE99AC",
    fighting: "C03028",
    fire: "F08030",
    flying: "A890F0",
    ghost: "705898",
    grass: "78C850",
    ground: "E0C068",
    ice: "98D8D8",
    normal: "A8A878",
    poison: "A040A0",
    psychic: "F85888",
    rock: "B8A038",
    shadow: "#1f1f1f",
    steel: "B8B8D0",
    water: "6890F0",
    unknown: "68A090",
};