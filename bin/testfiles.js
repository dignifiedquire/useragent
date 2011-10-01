#!/usr/bin/env node

var request = require('request')
  , path = require('path')
  , fs = require('fs');

var files = {
    'pgts.yaml': 'http://ua-parser.googlecode.com/svn/trunk/test/resources/pgts_browser_list.yaml'
  , 'testcases.yaml': 'http://ua-parser.googlecode.com/svn/trunk/test/resources/test_user_agent_parser.yaml'
  , 'firefoxes.yaml': 'http://ua-parser.googlecode.com/svn/trunk/test/resources/firefox_user_agent_strings.yaml'
};

/**
 * Update the fixtures
 */

Object.keys(files).forEach(function (key) {
  request(files[key], function response (err, res, data) {
    if (err || res.statusCode !== 200) return console.error('failed to update');

    console.log('downloaded', files[key]);
    fs.writeFileSync(path.join(__dirname, '..', 'tests', 'fixtures', key), data);
  });
});
