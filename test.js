import { writeToFile } from "./src/index.js"

import assert from 'node:assert/strict';    // https://nodejs.org/api/assert.html#class-assertassert
import test from 'node:test';               // https://nodejs.org/api/test.html
import { existsSync, unlinkSync } from 'node:fs';
import { readFile } from 'node:fs/promises';

// TDD approach 

// scrapData - skip first, no fixed data to test, too dependent on external

// writeToFile
const FAKE_DATA = [
    {post_title: "title-1", photo_url: "abc.com"},
    {post_title: "title-2", photo_url: "def.com"},
    {post_title: "title-3", photo_url: "ghi.com"},
]

test('writeToFile can write to JSON', async() => {
    // todo: test - can write data to directory, in JSON
    await writeToFile(FAKE_DATA, "test.json")
    const isFileCreated = existsSync('./test.json')
    assert.equal(isFileCreated, true)
});

test('writeToFile write with no data loss', async () => {
    // todo: test - .read from JSON, must be same.
    const readData = await readFile("./test.json", "utf-8")
    const parsedData = JSON.parse(readData)
    assert.deepEqual(parsedData, FAKE_DATA)

    // clean up - delete
    unlinkSync("./test.json")
});