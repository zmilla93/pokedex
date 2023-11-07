
export function preloadImage(src: string) { new Image().src = src; }

/**
 * Sets the page's title, appending a default title to the end.
 * Passing no parameter will set the title to the default title.
 * @param title Page title or null
 */
export function setTitle(title: string | null = null) {
    const DEFAULT_TITLE = "Pokédex";
    if (title === null || title === "") document.title = DEFAULT_TITLE;
    else document.title = title + " | " + DEFAULT_TITLE;
}