import { ChainLink, EvolutionChain, EvolutionDetail } from "../../PokeAPI/types/Evolution";

interface EvolutionEntry {
    name: string;
    details: EvolutionDetail;
}

export function EvolutionTable({ data }: { data: EvolutionChain | undefined }) {
    if (data === undefined) return null;
    const stuff = parseChain(data);
    console.log(stuff);
    return (
        <div>
            {/* {data.chain.species} */}
            {/* {stuff} */}
        </div>
    );
}

function parseChain(data: EvolutionChain) {
    const stuff: EvolutionEntry[][] = [];
    const base: EvolutionEntry = {
        name: data.chain.species.name,
        details: data.chain.evolution_details[0],
    };
    stuff.push([base]);
    recursiveAppendData(stuff, data.chain, 1);
    return stuff;
}

function recursiveAppendData(data: EvolutionEntry[][], entry: ChainLink, index: number) {
    entry.evolves_to.forEach(link => {
        if (data[index] === undefined) data[index] = [];
        const evoEntry: EvolutionEntry = {
            name: link.species.name,
            details: link.evolution_details[0],
        };
        // FIXME: Remove this error after testing
        if (link.evolution_details.length > 1) console.error("Pokemon found with multiple evolution details!");
        data[index].push(evoEntry);
        recursiveAppendData(data, link, index + 1);
    });
}