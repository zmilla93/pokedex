
export interface Gen1 {
    back_default: string;
    back_gray: string;
    back_transparent: string;
    front_default: string;
    front_gray: string;
    front_transparent: string;
}

export interface Gen2GoldSilver {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
    front_transparent: string;
}

export interface Gen2Crystal {
    back_default: string;
    back_shiny: string;
    back_shiny_transparent: string;
    back_transparent: string;
    front_default: string;
    front_shiny: string;
    front_shiny_transparent: string;
    front_transparent: string;
}

export interface Gen3RubySapphire {
    back_default: string;
    back_shiny: string;
    front_default: string;
    front_shiny: string;
}

export interface Gen3Emerald {
    front_default: string;
    front_shiny: string;
}

export interface Gen4 {
    back_default: string;
    back_female: string;
    back_shiny: string;
    back_shiny_female: string;
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_feamle: string;
}

export interface Gen5 extends Gen4 {
    animated: Gen4;
}

export interface Gen6 {
    front_default: string;
    front_female: string;
    front_shiny: string;
    front_shiny_female: string;
}

export interface Gen7 extends Gen6 {
    // Same as Gen 6
}

export interface Icon {
    front_default: string;
    front_female: string;
}