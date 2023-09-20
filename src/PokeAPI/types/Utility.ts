export interface Language {
	/** The identifier for this resource. */
	id: number;
	/** The name for this resource. */
	name: string;
	/** Whether or not the games are published in this language. */
	official: boolean;
	/** The two-letter code of the country where this language is spoken. Note that it is not unique. */
	iso639: string;
	/** The two-letter code of the language. Note that it is not unique. */
	iso3166: string;
	/** The name of this resource listed in different languages. */
	names: Name[];
}

export interface APIResource {
	/** The URL of the referenced resource. */
	url: string;
}

export interface Description {
	/** The localized description for an API resource in a specific language. */
	description: string;
	/** The language this name is in. */
	language: NamedAPIResource;
}

export interface Effect {
	/** The localized effect text for an API resource in a specific language. */
	effect: string;
	/** The language this effect is in. */
	language: NamedAPIResource;
}

export interface Encounter {
	/** The lowest level the Pokemon could be encountered at. */
	min_level: number;
	/** The highest level the Pokemon could be encountered at. */
	max_level: number;
	/** A list of condition values that must be in effect for this encounter to occur. */
	condition_values: NamedAPIResource[];
	/** Percent chance that this encounter will occur. */
	chance: number;
	/** The method by which this encounter happens. */
	method: NamedAPIResource;
}

export interface FlavorText {
	/** The localized flavor text for an API resource in a specific language. Note that this text is left unprocessed as it is found in game files. This means that it contains special characters that one might want to replace with their visible decodable version. Please check out this issue to find out more. */
	flavor_text: string;
	/** The language this name is in. */
	language: NamedAPIResource;
	/** The game version this flavor text is extracted from. */
	version: NamedAPIResource;
}

export interface GenerationGameIndex {
	/** The internal id of an API resource within game data. */
	game_index: number;
	/** The generation relevent to this game index. */
	generation: NamedAPIResource;
}

export interface MachineVersionDetail {
	/** The machine that teaches a move from an item. */
	machine: APIResource;
	/** The version group of this specific machine. */
	version_group: NamedAPIResource;
}

export interface Name {
	/** The localized name for an API resource in a specific language. */
	name: string;
	/** The language this name is in. */
	language: NamedAPIResource;
}

export interface NamedAPIResource {
	/** The name of the referenced resource. */
	name: string;
	/** The URL of the referenced resource. */
	url: string;
}

export interface VerboseEffect {
	/** The localized effect text for an API resource in a specific language. */
	effect: string;
	/** The localized effect text in brief. */
	short_effect: string;
	/** The language this effect is in. */
	language: NamedAPIResource;
}

export interface VersionEncounterDetail {
	/** The game version this encounter happens in. */
	version: NamedAPIResource;
	/** The total percentage of all encounter potential. */
	max_chance: number;
	/** A list of encounters and their specifics. */
	encounter_details: Encounter[];
}

export interface VersionGameIndex {
	/** The internal id of an API resource within game data. */
	game_index: number;
	/** The version relevent to this game index. */
	version: NamedAPIResource;
}

export interface VersionGroupFlavorText {
	/** The localized name for an API resource in a specific language. */
	text: string;
	/** The language this name is in. */
	language: NamedAPIResource;
	/** The version group which uses this flavor text. */
	version_group: NamedAPIResource;
}

