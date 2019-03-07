#!/usr/bin/env node

import * as minifier from './minifier';
import * as conf from './config/module';
import fs from 'fs';
import shelljs from 'shelljs';


let args = process.argv.slice(2);
let config_path = shelljs.pwd()+'/'+conf.config_filename;
if(args.length > 0){
    if(args[0] == '--init' || args[0] == 'init'){
        if(fs.existsSync(config_path)){
            try {
                let config = conf.loadConfig(config_path);
                console.log(config);
            }catch(e){
                if(e instanceof conf.InvalidConfigError){
                    console.log(`Config at ${config_path} is invalid. Fixing missing things`);
                    let fixed_config = conf.fixConfig(e.config_object);
                    console.log('Fixed config. Rewriting the old one');
                    conf.writeConfig(config_path, fixed_config);
                }else{
                    console.error(e);
                }
            }
        }else{
            conf.writeConfig(config_path);
        }
    }else{
        console.log(minifier.minifyFile(shelljs.pwd()+'/'+args[0]));
    }
}