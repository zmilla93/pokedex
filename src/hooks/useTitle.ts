import { useEffect } from "react";

const DEFAULT_TITLE = "Pokédex";

/**
 * Sets the page's title, appending a default title to the end.
 * Passing no parameter or null will set the title to the default title.
 * @param title Page title or null
 */
export function useTitle(title: string | null = null) {
    useEffect(() => {
        if (title === null || title === undefined) document.title = DEFAULT_TITLE;
        else document.title = title + " | " + DEFAULT_TITLE;
    });
}