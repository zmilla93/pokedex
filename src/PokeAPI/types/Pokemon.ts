import { NamedAPIResource, VersionGameIndex } from "./Utility"
import * as SpriteFormat from "./SpriteFormats";

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
    }
    versions: {
        "generation-i": {
            "red-blue": SpriteFormat.Gen1;
            "yellow": SpriteFormat.Gen1;
        };
        "generation-ii": {
            gold: SpriteFormat.Gen2GoldSilver;
            silver: SpriteFormat.Gen2GoldSilver;
            crystal: SpriteFormat.Gen2Crystal;
        };
        "generation-iii": {
            "ruby-sapphire": SpriteFormat.Gen3RubySapphire;
            emerald: SpriteFormat.Gen3Emerald;
            "firered-leafgreen": SpriteFormat.Gen3RubySapphire;
        };
        "generation-iv": {
            "diamond-pearl": SpriteFormat.Gen4;
            "heartgold-soulsilver": SpriteFormat.Gen4;
            "platinum": SpriteFormat.Gen4;
        };
        "generation-v": {
            "black-white": SpriteFormat.Gen5;
        };
        "generation-vi": {
            "omegaruby-alphasapphire": SpriteFormat.Gen6;
            "x-y": SpriteFormat.Gen6;
        };
        "generation-vii": {
            icons: SpriteFormat.Icon;
            "ultra-sun-ultra-moon": SpriteFormat.Gen7;
        };
        "generation-viii": {
            icons: SpriteFormat.Icon;
        };
    }
}
