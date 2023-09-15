import { Pokemon, PokemonMove } from "./types/Pokemon";

type NameOrId = string | number;
interface PokemonCache { [key: string]: Promise<object>; }

export class PokeApi {
    static URL = 'https://pokeapi.co/api/v2/';

    private cache: PokemonCache = {};
    private fetchCount = 0;
    private cacheHitCount = 0;

    /**
     * Fetches data from the pokemon API, caches the result, then returns a promise.
     * 
     * @param endpoint The target PokeAPI endpoint. IE '/pokemon/charmander'
     * @param limit (Optional) Pagination limit, default 9999
     * @returns Promise<T> for the requested endpoint
     */
    async request<T>(endpoint: string, limit = 9999): Promise<T> {
        endpoint = endpoint.toLowerCase();
        const limitData = `limit=${limit}`;
        let response = this.cache[endpoint];
        if (response !== undefined) this.cacheHitCount++;
        else {
            this.fetchCount++;
            response = fetch(PokeApi.URL + endpoint + "?" + limitData)
                .then(data => {
                    if (!data.ok || data.status !== 200) throw new Error(`Failed to fetch data from '${endpoint}', status '${data.status}'.`);
                    return data.json();
                });
            this.cache[endpoint] = response;
        }
        return response as Promise<T>;
    }

    // API endpoint aliases
    getPokemon(id: NameOrId) { return this.request<Pokemon>(`pokemon/${id}`); }
    getMove(id: NameOrId) { return this.request<PokemonMove>(`move/${id}`); }

    /**
     * Prints debug stats about API calls.
     */
    printStats() {
        console.log("    API Stats"
            + "\n================="
            + "\nFetch Count --- " + this.fetchCount
            + "\nCache Hits ---- " + this.cacheHitCount
            + "\nAPI Calls ----- " + (this.fetchCount + this.cacheHitCount)
            + "\n================="
        );
    }

}