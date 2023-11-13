import { Pokemon } from "../PokeAPI/types/Pokemon";
import assert from "../utility/assert";

export function SpriteViewer({ data, showBack }: { data: Pokemon | undefined, showBack?: boolean }) {
    const suffix = showBack ? "back_default" : "front_default";
    if (data === undefined) return null;
    const sprites = data.sprites.versions;
    const gen1 = new SpriteGroup(
        ["Red/Blue", "Yellow"],
        [sprites["generation-i"]["red-blue"][suffix], sprites["generation-i"].yellow[suffix]]
    );
    const gen2 = new SpriteGroup(
        ["Gold", "Silver", "Crystal"],
        [sprites["generation-ii"].gold[suffix], sprites["generation-ii"].silver[suffix], sprites["generation-ii"].crystal[suffix]]
    );
    const gen3 = new SpriteGroup(
        ["Ruby/Sapphire", "Emerald", "Fire Red/Leaf Green"],
        [sprites["generation-iii"]["ruby-sapphire"][suffix], sprites["generation-iii"]["emerald"].front_default, sprites["generation-iii"]["firered-leafgreen"][suffix]]
    );
    const gen4 = new SpriteGroup(
        ["Diamond/Pearl", "Platinum", "Heart Gold/Soul Silver"],
        [sprites["generation-iv"]["diamond-pearl"][suffix], sprites["generation-iv"].platinum[suffix], sprites["generation-iv"]["heartgold-soulsilver"][suffix]]
    );
    const gen5 = new SpriteGroup(
        ["Black/White"],
        [sprites["generation-v"]["black-white"][suffix]]
    );
    const gen6 = new SpriteGroup(
        ["X/Y", "Omega Ruby/Alpha Sapphire"],
        [sprites["generation-vi"]["x-y"].front_default, sprites["generation-vi"]["omegaruby-alphasapphire"].front_default]
    );
    const gen7 = new SpriteGroup(
        ["Ultra Sun/Ultra Moon"],
        [sprites["generation-vii"]["ultra-sun-ultra-moon"].front_default]
    );

    const table = (
        <table>
            <thead>
                <tr>
                    <td>Gen 1</td>
                    <td>Gen 2</td>
                    <td>Gen 3</td>
                    <td>Gen 4</td>
                    <td>Gen 5</td>
                    <td>Gen 6</td>
                    <td>Gen 7</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    {gen1.getJSX()}
                    {gen2.getJSX()}
                    {gen3.getJSX()}
                    {gen4.getJSX()}
                    {gen5.getJSX()}
                    {gen6.getJSX()}
                    {gen7.getJSX()}
                </tr>
            </tbody>

        </table>
    );
    return (table);
}

class SpriteGroup {
    hasSprites = false;
    srcs;
    names;
    constructor(names: string[], srcs: string[]) {
        this.srcs = srcs;
        this.names = names;
        assert(() => names.length === srcs.length);
        srcs.forEach(src => { if (src !== null) this.hasSprites = true; });
    }
    getJSX() {
        let contents;
        if (this.hasSprites) {
            let i = 0;
            contents = this.srcs.map(src => {
                if (src === null || i > 1) return null;
                return <img key={src} src={src} title={this.names[i++]} />;
            });
        } else {
            contents = "-";
        }
        return <td>{contents}</td>;
    }
}