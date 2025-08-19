import { error } from 'node:console';
import { writeFile } from 'node:fs/promises';

const FETCH_TIMES = 10

// todo
export const scrapData = async () => {
    // technicality issue :
    // reddit dont use pagination like ?page=1 , has to find other way
    // REJECTED - option 1 - reddit-api, https://developers.reddit.com/docs/quickstart
    // option 2 - headless browser agent like playwright - troublesome, last resort
    // option 3 - reddit's .rss/json ? https://stackoverflow.com/questions/31942743/how-to-get-json-data-from-reddit-after-the-first-page

    // let's try option 3. Reddit .json

    let after = null
    let allData = []

    // fetch remaining 10 times
    // Array(FETCH_TIMES).fill().forEach(async() => {
    Array(2).fill().forEach(async () => {
        const data = await fetchReddit({ after });
        if (data.error) {
            return console.error(data.error)
        }

        console.log(data)
        after = data.after     // update "after" for reddit pagination
        allData.push(...data.children)
    })

    return allData
}

const fetchReddit = async (options) => {
    const { after = "null" } = options  // default to null
    const fetchURL = `https://www.reddit.com/r/malaysia/.json?after=${after}`
    console.log({ fetchURL })
    try {
        const response = await fetch(fetchURL)
        if (!response.ok) throw Error();
        const { data } = await response.json()
        return { data }
    } catch {
        return { error: "fetch failed" }
    }
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