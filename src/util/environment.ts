export { asString, asNumber };

function asString(variableName: string, defaultValue?: string): string {
    const variable = process.env[variableName];

    if (variable) {
        return String(variable);
    }
    if (defaultValue) {
        console.warn(`Using default value ${defaultValue} for variable ${variableName}`);
        return defaultValue;
    }

    throw Error(`Missing environment variable ${variableName}`);
}

function asNumber(variableName: string, defaultValue?: number): number {
    const variable = process.env[variableName];

    if (variable) {
        const numVar = Number(variable);
        if (Number.isNaN(numVar)) {
            throw Error(`Invalid value ${variable} for variable ${variableName}`);
        }
        return numVar;
    }
    if (defaultValue) {
        console.warn(`Using default value ${defaultValue} for variable ${variableName}`);
        return defaultValue;
    }

    throw Error(`Missing environment variable ${variableName}`);
}
