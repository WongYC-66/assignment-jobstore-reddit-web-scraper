import { writeFile } from 'node:fs/promises';

// todo
export const scrapData = async () => {
    // technicality issue :
    // reddit dont use pagination like ?page=1
    // has to find other way
    // option 1 - reddit-api, https://developers.reddit.com/docs/quickstart
    // option 2 - headless browser agent like playwright - troublesome, last resort

    return []
}


// todo
export const writeToFile = async (data, filename) => {
    // data as Array of JSON
    const stringified = JSON.stringify(data)
    await writeFile(filename, stringified, { encoding: "utf-8" });
}



//  main function
const main = async () => {
    // todo: scrap data and store it as arr

    const data = await scrapData()

    // todo: File IO output to data.json
    await writeToFile(data, "data.json")
}

main()