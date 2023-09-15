export type NamedAPIResource = {
    name: string,
    url: string
}

export interface VersionGameIndex {
    text: string,
    language: NamedAPIResource,
    version_group: NamedAPIResource,
}