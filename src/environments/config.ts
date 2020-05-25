export interface ServerConfig {
    url: string;
}
export abstract class ServerConfig implements ServerConfig {
    url: string;
}
export interface OneSignalConfig {
    appId: string;
    googleProjectNumber: string;
}
export abstract class OneSignalConfig implements OneSignalConfig {
    appId: string;
    googleProjectNumber: string;
}
export interface SplashScreenConfig {
    duration: {first: number, next: number};
}
export abstract class SplashScreenConfig implements SplashScreenConfig {
    duration: {first: number, next: number};
}