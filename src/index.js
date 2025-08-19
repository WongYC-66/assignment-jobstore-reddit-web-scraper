import { writeFile } from 'node:fs/promises';
import { fetchReddit, processData, removeDataWithoutMedia } from './utility.js'

const FETCH_TIMES = 10

export const scrapData = async () => {
    // Approach - reddit's .json
    // https://stackoverflow.com/questions/31942743/how-to-get-json-data-from-reddit-after-the-first-page

    let after = null
    let allData = []

    // fetch remaining 10 times
    for (let i = 0; i < FETCH_TIMES; i++) {
        // use sychonous/blocking method, to respect rate-limiter of Reddit
        const data = await fetchReddit({ after });
        if (data.error) {
            return console.error(data.error)
        }
        after = data.after     // update "after" for reddit pagination
        allData.push(...data.children)
    }

    return allData
}

export const writeToFile = async (data, filename) => {
    // data as Array of JS Object
    const stringified = JSON.stringify(data, null, 2)
    await writeFile(filename, stringified, { encoding: "utf-8" });
}

export const main = async () => {
    const data = await scrapData()
    await writeToFile(data, "./src/output/rawData.json")  // a copy of raw

    const processedData = processData(data)
    const filteredData = removeDataWithoutMedia(processedData)
    await writeToFile(filteredData, "./src/output/data.json")
}