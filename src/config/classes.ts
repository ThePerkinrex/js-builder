export class InvalidConfigError extends TypeError {
    config_object: any;
    config_path: any;

    constructor(path: string, config: any) {
        super(`Config in ${path} (${config.toString()}) isn't a valid config.`);
        this.config_object = config;
        this.config_path = path;
    }
}

export interface IConfig {
    unifiedFiles: {
        [unifiedFile: string]: Array<string>
    },
    libraries?: {
        [libraryName: string]: IConfigLibrary
    },
    outDir?: string,
    nameStyle?: string
}

export interface IConfigLibrary {
    files: Array<string>,
}