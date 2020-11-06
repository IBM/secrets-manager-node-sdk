/**
 * (C) Copyright IBM Corp. 2019.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';
const fs = require('fs');
const path = require('path');
const authPath = path.join(__dirname, './auth.js');

const hasAuth = fs.existsSync(authPath);

if (hasAuth) {
  exports.describe = describe;
} else {
  exports.describe = describe.skip.bind(describe);
  exports.describe.skip = exports.describe;
}
exports.auth = hasAuth ? require(authPath) : null;
