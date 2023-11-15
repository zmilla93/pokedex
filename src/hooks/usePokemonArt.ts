import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";
import { RNG } from "../utility/rng";

export interface NamedArt {
    name: string;
    url: string;
}

export function usePokemonArt(count: number, seed: number): NamedArt[] {
    const [pokemonImages, setPokemonImages] = useState<NamedArt[]>([]);
    const BUFFER = 0;
    const MAX_INDEX = 1000;
    RNG.setSeed(seed);
    useEffect(() => {
        let ignore = false;
        (async () => {
            const rng = RNG.getRandomArray(1, MAX_INDEX, count + BUFFER, true);
            const requests = rng.map(index => api.getPokemon(index));
            const responses = await Promise.all(requests);
            let validImages = 0;
            const nextImages: NamedArt[] = [];
            responses.map(response => {
                if (validImages >= count) return;
                const imageUrl = response.sprites.other["official-artwork"].front_default;
                if (imageUrl !== null && imageUrl !== undefined) {
                    const namedImage = { name: response.name, url: imageUrl };
                    nextImages.push(namedImage);
                    validImages++;
                }
            });
            if (!ignore) setPokemonImages(nextImages);
        })();
        return () => { ignore = true; };
    }, [count]);
    return pokemonImages;
}