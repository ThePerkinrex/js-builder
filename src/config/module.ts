import fs from 'fs';

export * from './classes';
export * from './constants';

import { IConfig, InvalidConfigError } from './classes';
import { default_config, empty_library_config, empty_main_config } from './constants';


export function isValidConfig(config: any): config is IConfig {
    if (config.unifiedFiles === undefined) return false;
    if (config.libraries !== undefined) {
        let libraries: any = config.libraries;
        for (let libname in libraries) {
            let lib = libraries[libname]
            if (lib.files === undefined || lib.usedBy === undefined) {
                return false;
            }
        }
    }
    return true;
}

export function loadConfig(path: string): IConfig {
    let config = require(path);
    if (isValidConfig(config)) {
        return <IConfig>config;
    }
    throw new InvalidConfigError(path, config);
}

export function fixConfig(config: any): IConfig {
    let return_config = empty_main_config;
    return_config.unifiedFiles = config.unifiedFiles || return_config.unifiedFiles;
    if (config.libraries !== undefined) {
        let libraries: any = config.libraries;
        return_config.libraries = {};
        for (let libname in libraries) {
            let lib = libraries[libname]
            lib.files = lib.files || empty_library_config.files;
            lib.usedBy = lib.usedBy || empty_library_config.usedBy;
            return_config.libraries[libname] = lib;
        }
    }
    return return_config;
}

export function writeConfig(path: string, config?: IConfig) {
    let config_to_write: IConfig = default_config;
    if (config) {
        config_to_write = config;
    }
    let writer = fs.createWriteStream(path);
    writer.write(JSON.stringify(config_to_write, null, '\t'));
    writer.close();
}