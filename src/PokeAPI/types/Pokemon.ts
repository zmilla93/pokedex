import { NamedAPIResource, VersionGameIndex } from "./Utility"

export interface Pokemon {
    id: number;
    name: string;
    base_experience: number;
    height: number;
    is_default: boolean;
    order: number;
    weight: number;
    abilities: PokemonAbility[];
    forms: NamedAPIResource[];
    game_indices: VersionGameIndex[];
    held_items: PokemonHeldItem[];
    location_area_encounters: string;
    moves: PokemonMove[];
    past_types: PokemonTypePast[];
    sprites: PokemonSprites;
    species: NamedAPIResource;
    stats: PokemonStat;
    types: PokemonFormType[];
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: NamedAPIResource;
}

export interface PokemonType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonFormType {
    slot: number;
    type: NamedAPIResource;
}

export interface PokemonTypePast {
    generation: NamedAPIResource;
    types: PokemonType[];
}

export interface PokemonHeldItem {
    item: NamedAPIResource;
    version_details: PokemonHeldItemVersion;
}

export interface PokemonHeldItemVersion {
    version: NamedAPIResource;
    rarity: number;
}

export interface PokemonMove {
    move: NamedAPIResource;
    version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
    move_learn_method: NamedAPIResource;
    version_group: NamedAPIResource;
    level_learned_at: number;
}

export interface PokemonStat {
    stat: NamedAPIResource;
    effort: number;
    base_stat: number;
}

export interface PokemonSprites {
    front_default: string;
    front_shiny: string;
    front_female: string;
    front_shiny_female: string;
    back_default: string;
    back_shiny: string;
    back_female: string;
    back_shiny_female: string;
    other: {
        dream_world: {
            front_default: string;
            front_female: string;
        };
        home: {
            front_default: string;
            front_female: string;
            front_shiny: string;
            front_shiny_female: string;
        }
        "official-artwork": {
            front_default: string;
            front_shiny: string;
        }
        // FIXME: Version Sprites
    }
}
