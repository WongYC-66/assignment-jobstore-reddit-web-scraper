// helper fn
export const fetchReddit = async (options) => {
    const { after = "null" } = options  // default to null
    // https://www.reddit.com/r/redditdev/comments/1866kxm/cannot_view_reddit_images_from_json_api/

    const fetchURL = `https://www.reddit.com/r/malaysia/new/.json?after=${after}&raw_json=1`     // append raw_json=1 to avoid reddit encrpytion
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
export const removeDataWithoutMedia = (data) => {
    return data.filter(item => item.img_url.length >= 1)
}

// helper fn
export const processData = (data) => {
    let processed = data.map(item => {
        return {
            post_title: item.data.title,
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