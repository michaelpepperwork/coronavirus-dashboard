export function placeParams(pathRegex, params) {
    const segments = pathRegex.split('/');
    return segments.map(segment => {
        const offset = segment.indexOf(':') + 1;
        if (!offset) {
            return segment;
        }

        const key = segment.slice(offset);
        return params[key];
    }).join('/');
}

