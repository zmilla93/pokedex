import { ChainLink, EvolutionChain, EvolutionDetail } from "../../PokeAPI/types/Evolution";

interface EvolutionEntry {
    name: string;
    details: EvolutionDetail;
}

export function EvolutionTable({ data }: { data: EvolutionChain | undefined }) {
    if (data === undefined) return null;
    const evoData = parseChain(data);
    // FIXME : Remove length check after testing
    let curLen = 0;
    evoData.forEach(e => {
        if (e.length < curLen) throw new Error("Reduction in evolution count size!");
        curLen = e.length;
    });
    return (
        <div>
        </div>
    );
}

function parseChain(data: EvolutionChain) {
    const entries: EvolutionEntry[][] = [];
    const base: EvolutionEntry = {
        name: data.chain.species.name,
        details: data.chain.evolution_details[0],
    };
    entries.push([base]);
    recursiveAppendData(entries, data.chain, 1);
    return entries;
}

function recursiveAppendData(data: EvolutionEntry[][], entry: ChainLink, index: number) {
    entry.evolves_to.forEach(link => {
        if (data[index] === undefined) data[index] = [];
        const evoEntry: EvolutionEntry = {
            name: link.species.name,
            details: link.evolution_details[0],
        };
        // FIXME: Remove this error after testing
        if (link.evolution_details.length > 1) throw new Error("Pokemon found with multiple evolution details!");
        data[index].push(evoEntry);
        recursiveAppendData(data, link, index + 1);
    });
}