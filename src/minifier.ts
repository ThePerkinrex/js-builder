import fs from 'fs';
import {replaceInString} from './utils'

const commentRegex = [
    /\/\*.*?\*\//,
    /\/\/.*$/
]

export function minifyFile(path: string): string {
    let file_contents = fs.readFileSync(path, 'utf-8');
    let lines = file_contents.split('\n');
    let new_lines = [];
    let r = '';
    for (let line of lines){
        //console.log('L:',line);
        let new_line = line;
        for(let c_regex of commentRegex){
            let last_index = 0;
            let match;
            while(match = c_regex.exec(new_line.substr(last_index))){
                new_line = replaceInString(new_line, last_index + match.index, last_index + match.index + match[0].length); // Delete the match
                last_index += match.index; // We don't need to count it's index
            }
        }
        if(new_line != '')
            new_lines.push(new_line)
    }
    for (let line of new_lines){
        if(!line.endsWith(';')){
            line += ';'
        }
        r+=line;
    }
    return r;
}