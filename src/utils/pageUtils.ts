export const isServer = () => typeof window === 'undefined';

export enum EnvironmentTypes {
    DEVELOPMENT,
    PRODUCTION
}


export const getEnvironmentByHostname = function getEnvironmentByHostname() {
    const hostname = typeof window !== 'undefined' && window.location && window.location.hostname || '';

    if (hostname.toLowerCase().includes('192.168')) {
        return EnvironmentTypes.DEVELOPMENT;
    }
    switch (hostname.toLowerCase()) {
        // Commented out for now because it messes with tests
        case 'localhost':
            return EnvironmentTypes.DEVELOPMENT;

        case 'www.moments.lk':
        case 'moments.com':
            return EnvironmentTypes.PRODUCTION;
        default:
            return EnvironmentTypes.PRODUCTION;
    }
};
export const isDev = getEnvironmentByHostname() === EnvironmentTypes.DEVELOPMENT
