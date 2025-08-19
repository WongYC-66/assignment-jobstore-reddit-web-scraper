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

    // https://www.reddit.com/r/redditdev/comments/1866kxm/cannot_view_reddit_images_from_json_api/
    // append raw_json=1 to avoid reddit encrpytion
    const fetchURL = `https://www.reddit.com/r/malaysia/new/.json?after=${after}&raw_json=1`
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
const removeDataWithoutMedia = (data) => {
    return data.filter(item => item.img_url.length >= 1)
}

// helper fn
const processData = (data) => {
    let processed = data.map(item => {
        return {
            item: item.data.title,
            img_url: item.data.media_metadata
        }
    })

    const convertImgUrlToLinkArr = (item) => {
        const links = []
        for (let id in item.img_url) {
            links.push(item.img_url[id]?.s?.u)
        }
        item.img_url = links
    }

    processed.forEach(convertImgUrlToLinkArr)

    return processed
}


export const writeToFile = async (data, filename) => {
    // data as Array of JSON
    const stringified = JSON.stringify(data, null, 2)
    await writeFile(filename, stringified, { encoding: "utf-8" });
}


const main = async () => {

    const data = await scrapData()
    const processedData = processData(data)
    const filteredData = removeDataWithoutMedia(processedData)
    await writeToFile(filteredData, "data.json")
    // await writeToFile(filteredData, "data.json")
}

main()