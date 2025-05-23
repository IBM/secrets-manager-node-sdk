/**
 * (C) Copyright IBM Corp. 2020.
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

const common = require('../../dist/lib/common');

const {getSdkHeaders} = common;

describe('Tests of Common Library', () => {
    describe('getSdkHeaders', () => {
        test('should return correct User-Agent header', () => {
            const headers = getSdkHeaders('service1', 'v1', 'operation1');
            expect(headers).not.toBeNull();
            expect(headers['User-Agent']).toMatch(/^secrets-manager-node-sdk\/.*/);
        });
    });
});
