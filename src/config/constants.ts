import { IConfig, IConfigLibrary } from './classes';

export const default_config: IConfig = {
    unifiedFiles: {
        index: [
            'index.js'
        ]
    },
    libraries: {
        utils: {
            files: ['utils.js'],
            usedBy: ['index']
        }
    }
}

export const empty_main_config: IConfig = {
    unifiedFiles: {}
}

export const empty_library_config: IConfigLibrary = {
    files: [],
    usedBy: []
}

export const config_filename = 'jsbconfig.json';