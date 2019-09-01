export interface ServerConfig {
    url: string;
}
export abstract class ServerConfig implements ServerConfig {
    url: string;
}
