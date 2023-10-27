export { asString, asNumber };

function asString(variableName: string, defaultValue?: string): string {
    const variable = process.env[variableName];

    if (variable !== undefined) {
        return String(variable);
    }

    if (defaultValue === undefined) {
        throw Error(`Missing environment variable ${variableName}`);
    }

    console.warn(`Using default value ${defaultValue} for variable ${variableName}`);

    return defaultValue;
}

function asNumber(variableName: string, defaultValue?: number): number {
    const variable = process.env[variableName];

    if (variable !== undefined) {
        const numVar = Number(variable);
        if (Number.isNaN(numVar)) {
            throw Error(`Invalid value ${variable} for variable ${variableName}`);
        }
        return numVar;
    }

    if (defaultValue === undefined) {
        throw Error(`Missing environment variable ${variableName}`);
    }

    console.warn(`Using default value ${defaultValue} for variable ${variableName}`);

    return defaultValue;
}
