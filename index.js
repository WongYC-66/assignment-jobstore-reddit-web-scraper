import { error } from 'node:console';
import { writeFile } from 'node:fs/promises';

// const FETCH_TIMES = 10
const FETCH_TIMES = 3

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

// helper fn
const fetchReddit = async (options) => {
    const { after = "null" } = options  // default to null
    const fetchURL = `https://www.reddit.com/r/malaysia/new/.json?after=${after}`
    console.log({ fetchURL })
    try {
        const response = await fetch(fetchURL)
        if (!response.ok) throw Error();
        const { data } = await response.json()
        return data
    } catch {
        return { error: "fetch failed" }
    }
}

// helper fn
const filterData = (data) => {
    // return data;
    return data
    .map(toPostTitleAndImage_URL)
    .filter(item => item.image_url !== null)
}

// helper fn
const toPostTitleAndImage_URL = (item) => {
    item = item.data
    return {
        post_title : item?.title,
        // image_url:item?.preview?.images?.[0]?.source?.url
        image_url: item?.url
    }
}


export const writeToFile = async (data, filename) => {
    // data as Array of JSON
    const stringified = JSON.stringify(data, null, 2)
    await writeFile(filename, stringified, { encoding: "utf-8" });
}


const main = async () => {

    const data = await scrapData()
    const filteredData = filterData(data)
    await writeToFile(filteredData, "data.json")
}

main()