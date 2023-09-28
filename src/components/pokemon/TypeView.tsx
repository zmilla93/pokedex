export function TypeView({ types }: { types: string[] }) {
    const typeJsx = types.map((entry) => {
        // const type = entry.type.name;
        const typeColor = getTypeColors(entry);
        return (
            <div key={entry} className={typeColor.out() + "inline-flex rounded border border-white-800 py-1 text-sm text-white w-20 justify-center"}>
                {entry.toUpperCase()}
            </div>
        );
    });

    return (
        <div>
            {typeJsx}
        </div>
    );
}

function getTypeColors(type: string): TypeColor {
    switch (type) {
        case 'fire':
            return new TypeColor("bg-orange-600", "text-black");
        default:
            return new TypeColor("bg-black", "white");
    }
}

class TypeColor {
    constructor(public background: string, public text?: string) {

    }
    out() {
        return this.background + " " + this.text + " ";
    }
}
