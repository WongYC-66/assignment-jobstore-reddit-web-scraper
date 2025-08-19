import { writeFile } from 'node:fs/promises';

// todo
export const scrapData = () => {
    // technicality issue :
    // reddit dont use pagination like ?page=1
    // has to find other way
}


// todo
export const writeToFile = async (data, filename) => {
    // data as Array of JSON
    const stringified = JSON.stringify(data)
    await  writeFile(filename, stringified, { encoding: "utf-8" });
}



//  main function
const main = () => {
    // todo: scrap data and store it as arr
    // todo: File IO output to data.json
}

main()