import { useEffect, useState } from 'react';
import { Pokemon } from '../../PokeAPI/types/Pokemon';
import { PokeApi } from '../../PokeAPI/PokeAPI';

type NamedImage = { name: string; src: string };
type ImageStatus = { name: string, status: boolean }

export function DebugSpriteViewer({ pokeName }: { pokeName: string | null }) {
    const [targetData, setTargetData] = useState<Pokemon>();


    const images: NamedImage[] = [];
    const missing: string[] = [];
    const status: ImageStatus[] = [];

    if (targetData != null) findImagesRecursive(targetData.sprites, images, missing, status);

    useEffect(() => {
        if (pokeName === null) return;
        const api = new PokeApi();
        api.getPokemon(pokeName)
            .then(data => setTargetData(data))
            .catch(e => console.error(e));
    }, [pokeName]);

    function getImages() {
        return images.map(image => {
            return (
                <div key={image.name} className="border-2 border-orange-500 rounded m-2 shrink">
                    <img src={image.src} className="self-center" title={image.name} />
                </div>
            );
        });
    }

    function getMissing() {
        return missing.map(value => {
            return (
                <div key={value}>{value}</div>
            );
        });
    }

    function getStatus() {
        return status.map(entry => {
            const className = entry.status ? "" : "text-red-500";
            return (
                <div key={entry.name} className={className}>
                    {entry.name}
                </div>
            );
        });
    }
    if (targetData === undefined) return (<div>Loading...</div>);

    return (
        <div>
            <h1>Debug Sprite Viewer: {targetData.name}</h1>
            <div className="flex flex-wrap items-center">
                {getImages()}
            </div>
            <div className="flex items-start">
                <div className="m-5 p-5 border-2 border-green-900 bg-green-100 rounded max-w-fit">
                    <h1 className="text-green-600 text-xl underline">Image Results</h1>
                    {getStatus()}
                </div>
                <div className='m-5 p-5 border-2 border-red-700 bg-red-100 rounded max-w-fit'>
                    <h1 className="text-red-700 text-xl underline">Missing Images</h1>
                    {getMissing()}
                </div>
            </div>

        </div>
    );
}

function findImagesRecursive(obj: object, images: NamedImage[],
    missing: string[] = [], results: ImageStatus[] = [], path: string = "") {
    Object.entries(obj as object).forEach(entry => {
        const [key, value] = entry;
        if (typeof value === "string") {
            images.push({ name: path + "/" + key, src: value });
            results.push({ name: path + "/" + key, status: true });
        }
        else if (value === undefined || value === null) {
            missing.push(path + "/" + key);
            results.push({ name: path + "/" + key, status: false });
        }
        else if (typeof value === 'object') {
            findImagesRecursive(value, images, missing, results, path + "/" + key);
        }
    });
}