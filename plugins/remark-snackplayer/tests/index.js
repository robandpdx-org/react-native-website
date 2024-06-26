/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const path = require('path');
const fs = require('fs');
const test = require('tape');
const snackplayer = require('../');

const read = name => fs.readFileSync(path.join(__dirname, name), 'utf8');
const normalizeLineEndings = str => str.replace(/\r\n/g, '\n');

test('remark-snackplayer', async t => {
  const {remark} = await import('remark');
  const processor = remark().use(snackplayer);

  processor.process(read('markdown/test1.md'), (err, file) => {
    if (err) t.fail('Failed to process markdown/test1.md');
    t.equal(
      normalizeLineEndings(String(file)),
      normalizeLineEndings(read('output/output1.html')),
      'With 1 Code Block'
    );
  });

  processor.process(read('markdown/test2.md'), (err, file) => {
    if (err) t.fail('Failed to process markdown/test2.md');
    t.equal(
      normalizeLineEndings(String(file)),
      normalizeLineEndings(read('output/output2.html')),
      'With 2 Code Blocks'
    );
  });
});
