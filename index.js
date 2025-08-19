import { writeFile } from 'node:fs/promises';

// todo
export const scrapData = async () => {
    // technicality issue :
    // reddit dont use pagination like ?page=1 , has to find other way
    // REJECTED - option 1 - reddit-api, https://developers.reddit.com/docs/quickstart
    // option 2 - headless browser agent like playwright - troublesome, last resort
    // option 3 - reddit's .rss/json ? https://stackoverflow.com/questions/31942743/how-to-get-json-data-from-reddit-after-the-first-page

    // let's try option 3. Reddit .json

    return []
}


export const writeToFile = async (data, filename) => {
    // data as Array of JSON
    const stringified = JSON.stringify(data)
    await writeFile(filename, stringified, { encoding: "utf-8" });
}


const main = async () => {

    const data = await scrapData()
    await writeToFile(data, "data.json")
}

main()