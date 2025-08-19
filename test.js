import { writeToFile } from "./index.js"

import assert from 'node:assert/strict';    // https://nodejs.org/api/assert.html#class-assertassert
import test from 'node:test';               // https://nodejs.org/api/test.html

// TDD approach 

// scrapData - skip first, no fixed data to test, too dependent on external

// writeToFile
test('writeToFile can write to JSON', (t) => {
    // todo: test - can write data to directory, in JSON
    assert.strictEqual(1, 1);
});

test('writeToFile can write to JSON', (t) => {
    // todo: test - .read from JSON, must be same.
    assert.strictEqual(1, 1);
});