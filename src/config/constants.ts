import { IConfig, IConfigLibrary } from './classes';

export const default_config: IConfig = {
    unifiedFiles: {
        index: [
            'index.js'
        ]
    },
    libraries: {
        utils: {
            files: ['utils.js']
        }
    },
    outDir: 'dist',
    nameStyle: '[name].min.js'
}

export const empty_main_config: IConfig = {
    unifiedFiles: {}
}

export const empty_library_config: IConfigLibrary = {
    files: []
}

export const config_filename = 'jsbconfig.json';