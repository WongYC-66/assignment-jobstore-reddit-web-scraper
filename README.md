# Feature:
1. This is an assignment task
1. A web scrapper of https://www.reddit.com/r/malaysia/
2. Crawled data store at ./src/output/data.json
3. Only posts with user-uploaded-image will be kept

## Prerequsite:
- install latest node

## Usage:
1.  clone a copy
    ```
    git clone https://github.com/WongYC-66/assignment-jobstore-reddit-web-scraper
    ```
1.  ```
    cd assignment-jobstore-reddit-web-scraper
    ```
1.  ```
    npm install
    ```
1.  ```
    npm run start
    ```
1. results at /src/output/data.json
1. optional: open index.html with live server [localhost](http://127.0.0.1:5500/)



# Assignment:
### Instructions:
- Develop a simple web scraper
- Get your data source from Reddit, search for any subreddit you prefer (eg. https://www.reddit.com/r/malaysia/)
- Scrape around 10 'pages' worth of data with any language or library you prefer (Phyton, Node, PHP, etc)
- Filter out the postings data, to only keep those with images, and save the results (post_title, image_url) into a JSON file

- Optional task: display the JSON file data into a web page, listing out the post by title following by the image

### Suggestions:
- Create a public repository eg. Github, and document your code progress clearly via each git commit (each commit must be meaningfully shows which file created/updated with description on what the purpose of the changes), this should explain your thought process when developing the app, a single commit with completed solution is not a good solution
- No need to focus on the web page UI design, just for display
- Attach your sample output file (JSON) within the repository
- After completion, update the code repository with instructions on how to install and run it (in the readme) and share the link.



### my notes:
1. scrap reddit for 10 pages
1. process data(filter only with images)
1. stores as JSON.
    - format: 
    ```
    [
        { 
            post_title: title1,
            image_url: http:// xxx..., 
        },
        {
            post_title: title2,
            image_url: ....,
        }
        , ...
    ]
    ```
1. beside JSON, make a HTML to fetch (reuse module), and display.