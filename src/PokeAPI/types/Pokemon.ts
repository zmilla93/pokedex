import {
	NamedAPIResource,
	Name,
	VerboseEffect,
	Effect,
	Description,
	VersionGameIndex,
	VersionEncounterDetail,
	APIResource,
	FlavorText,
	GenerationGameIndex
} from "./Utility";
import * as SpriteFormat from "./SpriteFormats";

export interface Ability {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** Whether or not this ability originated in the main series of the video games. */
	is_main_series: boolean;
	/** The generation this ability originated in. */
	generation: NamedAPIResource;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** The effect of this ability listed in different languages. */
	effect_entries: VerboseEffect[];
	/** The list of previous effects this ability has had across version groups. */
	effect_changes: AbilityEffectChange[];
	/** The flavor text of this ability listed in different languages. */
	flavor_text_entries: AbilityFlavorText[];
	/** A list of Pokemon that could potentially have this ability. */
	pokemon: AbilityPokemon[];
}

export interface AbilityEffectChange {
	/** The previous effect of this ability listed in different languages. */
	effect_entries: Effect[];
	/** The version group in which the previous effect of this ability originated. */
	version_group: NamedAPIResource;
}

export interface AbilityFlavorText {
	/** The localized name for an API resource in a specific language. */
	flavor_text: string;
	/** The language this text resource is in. */
	language: NamedAPIResource;
	/** The version group that uses this flavor text. */
	version_group: NamedAPIResource;
}

export interface AbilityPokemon {
	/** Whether or not this a hidden ability for the referenced Pokemon. */
	is_hidden: boolean;
	/** Pokemon have 3 ability 'slots' which hold references to possible abilities they could have. This is the slot of this ability for the referenced pokemon. */
	slot: number;
	/** The Pokemon this ability could belong to. */
	pokemon: NamedAPIResource;
}

export interface Characteristic {
	/** The identifier for this resource. */
	id: number;
	/** The remainder of the highest stat/IV divided by 5. */
	gene_modulo: number;
	/** The possible values of the highest stat that would result in a Pokemon recieving this characteristic when divided by 5. */
	possible_values: number[];
	/** The stat which results in this characteristic. */
	highest_stat: NamedAPIResource;
	/** The descriptions of this characteristic listed in different languages. */
	descriptions: Description[];
}

export interface EggGroup {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of all Pokemon species that are members of this egg group. */
	pokemon_species: NamedAPIResource[];
}

export interface Gender {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** A list of Pokemon species that can be this gender and how likely it is that they will be. */
	pokemon_species_details: PokemonSpeciesGender[];
	/** A list of Pokemon species that required this gender in order for a Pokemon to evolve into them. */
	required_for_evolution: NamedAPIResource[];
}

export interface PokemonSpeciesGender {
	/** The chance of this Pokemon being female, in eighths; or -1 for genderless. */
	rate: number;
	/** A Pokemon species that can be the referenced gender. */
	pokemon_species: NamedAPIResource;
}

export interface GrowthRate {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The formula used to calculate the rate at which the Pokemon species gains level. */
	formula: string;
	/** The descriptions of this characteristic listed in different languages. */
	descriptions: Description[];
	/** A list of levels and the amount of experienced needed to atain them based on this growth rate. */
	levels: GrowthRateExperienceLevel[];
	/** A list of Pokemon species that gain levels at this growth rate. */
	pokemon_species: NamedAPIResource[];
}

export interface GrowthRateExperienceLevel {
	/** The level gained. */
	level: number;
	/** The amount of experience required to reach the referenced level. */
	experience: number;
}

export interface Nature {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The stat decreased by 10% in Pokemon with this nature. */
	decreased_stat: NamedAPIResource;
	/** The stat increased by 10% in Pokemon with this nature. */
	increased_stat: NamedAPIResource;
	/** The flavor hated by Pokemon with this nature. */
	hates_flavor: NamedAPIResource;
	/** The flavor liked by Pokemon with this nature. */
	likes_flavor: NamedAPIResource;
	/** A list of Pokeathlon stats this nature effects and how much it effects them. */
	pokeathlon_stat_changes: NatureStatChange[];
	/** A list of battle styles and how likely a Pokemon with this nature is to use them in the Battle Palace or Battle Tent. */
	move_battle_style_preferences: MoveBattleStylePreference[];
	/** The name of this resource listed in different languages. */
	names: Name[];
}

export interface NatureStatChange {
	/** The amount of change. */
	max_change: number;
	/** The stat being affected. */
	pokeathlon_stat: NamedAPIResource;
}

export interface MoveBattleStylePreference {
	/** Chance of using the move, in percent, if HP is under one half. */
	low_hp_preference: number;
	/** Chance of using the move, in percent, if HP is over one half. */
	high_hp_preference: number;
	/** The move battle style. */
	move_battle_style: NamedAPIResource;
}

export interface PokeathlonStat {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A detail of natures which affect this Pokeathlon stat positively or negatively. */
	affecting_natures: NaturePokeathlonStatAffectSets;
}

export interface NaturePokeathlonStatAffectSets {
	/** A list of natures and how they change the referenced Pokeathlon stat. */
	increase: NaturePokeathlonStatAffect[];
	/** A list of natures and how they change the referenced Pokeathlon stat. */
	decrease: NaturePokeathlonStatAffect[];
}

export interface NaturePokeathlonStatAffect {
	/** The maximum amount of change to the referenced Pokeathlon stat. */
	max_change: number;
	/** The nature causing the change. */
	nature: NamedAPIResource;
}

export interface Pokemon {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The base experience gained for defeating this Pokemon. */
	base_experience: number;
	/** The height of this Pokemon in decimetres. */
	height: number;
	/** Set for exactly one Pokemon used as the default for each species. */
	is_default: boolean;
	/** Order for sorting. Almost national order, except families are grouped together. */
	order: number;
	/** The weight of this Pokemon in hectograms. */
	weight: number;
	/** A list of abilities this Pokemon could potentially have. */
	abilities: PokemonAbility[];
	/** A list of forms this Pokemon can take on. */
	forms: NamedAPIResource[];
	/** A list of game indices relevent to Pokemon item by generation. */
	game_indices: VersionGameIndex[];
	/** A list of items this Pokemon may be holding when encountered. */
	held_items: PokemonHeldItem[];
	/** A link to a list of location areas, as well as encounter details pertaining to specific versions. */
	location_area_encounters: string;
	/** A list of moves along with learn methods and level details pertaining to specific version groups. */
	moves: PokemonMove[];
	/** A list of details showing types this pokemon had in previous generations */
	past_types: PokemonTypePast[];
	/** A set of sprites used to depict this Pokemon in the game. A visual representation of the various sprites can be found at PokeAPI/sprites */
	sprites: SpriteFormat.PokemonSprites;
	/** The species this Pokemon belongs to. */
	species: NamedAPIResource;
	/** A list of base stat values for this Pokemon. */
	stats: PokemonStat[];
	/** A list of details showing types this Pokemon has. */
	types: PokemonType[];
}

export interface PokemonAbility {
	/** Whether or not this is a hidden ability. */
	is_hidden: boolean;
	/** The slot this ability occupies in this Pokemon species. */
	slot: number;
	/** The ability the Pokemon may have. */
	ability: NamedAPIResource;
}

export interface PokemonType {
	/** The order the Pokemon's types are listed in. */
	slot: number;
	/** The type the referenced Pokemon has. */
	type: NamedAPIResource;
}

export interface PokemonFormType {
	/** The order the Pokemon's types are listed in. */
	slot: number;
	/** The type the referenced Form has. */
	type: NamedAPIResource;
}

export interface PokemonTypePast {
	/** The last generation in which the referenced pokemon had the listed types. */
	generation: NamedAPIResource;
	/** The types the referenced pokemon had up to and including the listed generation. */
	types: PokemonType[];
}

export interface PokemonHeldItem {
	/** The item the referenced Pokemon holds. */
	item: NamedAPIResource;
	/** The details of the different versions in which the item is held. */
	version_details: PokemonHeldItemVersion[];
}

export interface PokemonHeldItemVersion {
	/** The version in which the item is held. */
	version: NamedAPIResource;
	/** How often the item is held. */
	rarity: number;
}

export interface PokemonMove {
	/** The move the Pokemon can learn. */
	move: NamedAPIResource;
	/** The details of the version in which the Pokemon can learn the move. */
	version_group_details: PokemonMoveVersion[];
}

export interface PokemonMoveVersion {
	/** The method by which the move is learned. */
	move_learn_method: NamedAPIResource;
	/** The version group in which the move is learned. */
	version_group: NamedAPIResource;
	/** The minimum level to learn the move. */
	level_learned_at: number;
}

export interface PokemonStat {
	/** The stat the Pokemon has. */
	stat: NamedAPIResource;
	/** The effort points (EV) the Pokemon has in the stat. */
	effort: number;
	/** The base value of the stat. */
	base_stat: number;
}

export interface PokemonSprites {
	/** The default depiction of this Pokemon from the front in battle. */
	front_default: string;
	/** The shiny depiction of this Pokemon from the front in battle. */
	front_shiny: string;
	/** The female depiction of this Pokemon from the front in battle. */
	front_female: string;
	/** The shiny female depiction of this Pokemon from the front in battle. */
	front_shiny_female: string;
	/** The default depiction of this Pokemon from the back in battle. */
	back_default: string;
	/** The shiny depiction of this Pokemon from the back in battle. */
	back_shiny: string;
	/** The female depiction of this Pokemon from the back in battle. */
	back_female: string;
	/** The shiny female depiction of this Pokemon from the back in battle. */
	back_shiny_female: string;
}

export interface LocationAreaEncounter {
	/** The location area the referenced Pokemon can be encountered in. */
	location_area: NamedAPIResource;
	/** A list of versions and encounters with the referenced Pokemon that might happen. */
	version_details: VersionEncounterDetail[];
}

export interface PokemonColor {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of the Pokemon species that have this color. */
	pokemon_species: NamedAPIResource[];
}

export interface PokemonForm {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The order in which forms should be sorted within all forms. Multiple forms may have equal order, in which case they should fall back on sorting by name. */
	order: number;
	/** The order in which forms should be sorted within a species' forms. */
	form_order: number;
	/** True for exactly one form used as the default for each Pokemon. */
	is_default: boolean;
	/** Whether or not this form can only happen during battle. */
	is_battle_only: boolean;
	/** Whether or not this form requires mega evolution. */
	is_mega: boolean;
	/** The name of this form. */
	form_name: string;
	/** The Pokemon that can take on this form. */
	pokemon: NamedAPIResource;
	/** A list of details showing types this Pokemon form has. */
	types: PokemonFormType[];
	/** A set of sprites used to depict this Pokemon form in the game. */
	sprites: PokemonFormSprites;
	/** The version group this Pokemon form was introduced in. */
	version_group: NamedAPIResource;
	/** The form specific full name of this Pokemon form, or empty if the form does not have a specific name. */
	names: Name[];
	/** The form specific form name of this Pokemon form, or empty if the form does not have a specific name. */
	form_names: Name[];
}

export interface PokemonFormSprites {
	/** The default depiction of this Pokemon form from the front in battle. */
	front_default: string;
	/** The shiny depiction of this Pokemon form from the front in battle. */
	front_shiny: string;
	/** The default depiction of this Pokemon form from the back in battle. */
	back_default: string;
	/** The shiny depiction of this Pokemon form from the back in battle. */
	back_shiny: string;
}

export interface PokemonHabitat {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of the Pokemon species that can be found in this habitat. */
	pokemon_species: NamedAPIResource[];
}

export interface PokemonShape {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The "scientific" name of this Pokemon shape listed in different languages. */
	awesome_names: AwesomeName[];
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of the Pokemon species that have this shape. */
	pokemon_species: NamedAPIResource[];
}

export interface AwesomeName {
	/** The localized "scientific" name for an API resource in a specific language. */
	awesome_name: string;
	/** The language this "scientific" name is in. */
	language: NamedAPIResource;
}

export interface PokemonSpecies {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** The order in which species should be sorted. Based on National Dex order, except families are grouped together and sorted by stage. */
	order: number;
	/** The chance of this Pokemon being female, in eighths; or -1 for genderless. */
	gender_rate: number;
	/** The base capture rate; up to 255. The higher the number, the easier the catch. */
	capture_rate: number;
	/** The happiness when caught by a normal Pokeball; up to 255. The higher the number, the happier the Pokemon. */
	base_happiness: number;
	/** Whether or not this is a baby Pokemon. */
	is_baby: boolean;
	/** Whether or not this is a legendary Pokemon. */
	is_legendary: boolean;
	/** Whether or not this is a mythical Pokemon. */
	is_mythical: boolean;
	/** Initial hatch counter: one must walk 255 x (hatch_counter + 1) steps before this Pokemon's egg hatches, unless utilizing bonuses like Flame Body's. */
	hatch_counter: number;
	/** Whether or not this Pokemon has visual gender differences. */
	has_gender_differences: boolean;
	/** Whether or not this Pokemon has multiple forms and can switch between them. */
	forms_switchable: boolean;
	/** The rate at which this Pokemon species gains levels. */
	growth_rate: NamedAPIResource;
	/** A list of Pokedexes and the indexes reserved within them for this Pokemon species. */
	pokedex_numbers: PokemonSpeciesDexEntry[];
	/** A list of egg groups this Pokemon species is a member of. */
	egg_groups: NamedAPIResource[];
	/** The color of this Pokemon for Pokedex search. */
	color: NamedAPIResource;
	/** The shape of this Pokemon for Pokedex search. */
	shape: NamedAPIResource;
	/** The Pokemon species that evolves into this Pokemon_species. */
	evolves_from_species: NamedAPIResource;
	/** The evolution chain this Pokemon species is a member of. */
	evolution_chain: APIResource;
	/** The habitat this Pokemon species can be encountered in. */
	habitat: NamedAPIResource;
	/** The generation this Pokemon species was introduced in. */
	generation: NamedAPIResource;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of encounters that can be had with this Pokemon species in pal park. */
	pal_park_encounters: PalParkEncounterArea[];
	/** A list of flavor text entries for this Pokemon species. */
	flavor_text_entries: FlavorText[];
	/** Descriptions of different forms Pokemon take on within the Pokemon species. */
	form_descriptions: Description[];
	/** The genus of this Pokemon species listed in multiple languages. */
	genera: Genus[];
	/** A list of the Pokemon that exist within this Pokemon species. */
	varieties: PokemonSpeciesVariety[];
}

export interface Genus {
	/** The localized genus for the referenced Pokemon species */
	genus: string;
	/** The language this genus is in. */
	language: NamedAPIResource;
}

export interface PokemonSpeciesDexEntry {
	/** The index number within the Pokedex. */
	entry_number: number;
	/** The Pokedex the referenced Pokemon species can be found in. */
	pokedex: NamedAPIResource;
}

export interface PalParkEncounterArea {
	/** The base score given to the player when the referenced Pokemon is caught during a pal park run. */
	base_score: number;
	/** The base rate for encountering the referenced Pokemon in this pal park area. */
	rate: number;
	/** The pal park area where this encounter happens. */
	area: NamedAPIResource;
}

export interface PokemonSpeciesVariety {
	/** Whether this variety is the default variety. */
	is_default: boolean;
	/** The Pokemon variety. */
	pokemon: NamedAPIResource;
}

export interface Stat {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** ID the games use for this stat. */
	game_index: number;
	/** Whether this stat only exists within a battle. */
	is_battle_only: boolean;
	/** A detail of moves which affect this stat positively or negatively. */
	affecting_moves: MoveStatAffectSets;
	/** A detail of natures which affect this stat positively or negatively. */
	affecting_natures: NatureStatAffectSets;
	/** A list of characteristics that are set on a Pokemon when its highest base stat is this stat. */
	characteristics: APIResource[];
	/** The class of damage this stat is directly related to. */
	move_damage_class: NamedAPIResource;
	/** The name of this resource listed in different languages. */
	names: Name[];
}

export interface MoveStatAffectSets {
	/** A list of moves and how they change the referenced stat. */
	increase: MoveStatAffect[];
	/** A list of moves and how they change the referenced stat. */
	decrease: MoveStatAffect[];
}

export interface MoveStatAffect {
	/** The maximum amount of change to the referenced stat. */
	change: number;
	/** The move causing the change. */
	move: NamedAPIResource;
}

export interface NatureStatAffectSets {
	/** A list of natures and how they change the referenced stat. */
	increase: NamedAPIResource[];
	/** A list of nature sand how they change the referenced stat. */
	decrease: NamedAPIResource[];
}

export interface Type {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** A detail of how effective this type is toward others and vice versa. */
	damage_relations: TypeRelations;
	/** A list of details of how effective this type was toward others and vice versa in previous generations */
	past_damage_relations: TypeRelationsPast[];
	/** A list of game indices relevent to this item by generation. */
	game_indices: GenerationGameIndex[];
	/** The generation this type was introduced in. */
	generation: NamedAPIResource;
	/** The class of damage inflicted by this type. */
	move_damage_class: NamedAPIResource;
	/** The name of this resource listed in different languages. */
	names: Name[];
	/** A list of details of Pokemon that have this type. */
	pokemon: TypePokemon[];
	/** A list of moves that have this type. */
	moves: NamedAPIResource[];
}

export interface TypePokemon {
	/** The order the Pokemon's types are listed in. */
	slot: number;
	/** The Pokemon that has the referenced type. */
	pokemon: NamedAPIResource;
}

export interface TypeRelations {
	/** A list of types this type has no effect on. */
	no_damage_to: NamedAPIResource[];
	/** A list of types this type is not very effect against. */
	half_damage_to: NamedAPIResource[];
	/** A list of types this type is very effect against. */
	double_damage_to: NamedAPIResource[];
	/** A list of types that have no effect on this type. */
	no_damage_from: NamedAPIResource[];
	/** A list of types that are not very effective against this type. */
	half_damage_from: NamedAPIResource[];
	/** A list of types that are very effective against this type. */
	double_damage_from: NamedAPIResource[];
}

export interface TypeRelationsPast {
	/** The last generation in which the referenced type had the listed damage relations */
	generation: NamedAPIResource;
	/** The damage relations the referenced type had up to and including the listed generation */
	damage_relations: TypeRelations;
}

