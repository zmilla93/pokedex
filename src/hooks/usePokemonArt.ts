import { useEffect, useState } from "react";
import api from "../PokeAPI/PokeAPI";

export interface NamedArt {
    name: string;
    url: string;
}

export function usePokemonArt(count: number): NamedArt[] {
    const [pokemonImages, setPokemonImages] = useState<NamedArt[]>([]);
    const [validData, setValidData] = useState(false);
    const BUFFER = 5;
    const MAX_INDEX = 1000;
    useEffect(() => {
        (async () => {
            if (validData) return;
            const nums = [...Array(MAX_INDEX).keys()];
            const rng: number[] = [];
            let curMax = MAX_INDEX - 2;
            for (let i = 0; i < count + BUFFER; i++) {
                const randomIndex = Math.floor(Math.random() * curMax) + 1;
                const num = nums.splice(randomIndex, 1)[0];
                rng.push(num);
                curMax--;
            }
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
            setValidData(true);
            setPokemonImages(nextImages);
        })();
    }, [count, validData]);
    return pokemonImages;
}