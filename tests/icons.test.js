import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
const html=readFileSync(new URL('../index.html',import.meta.url),'utf8');
const app=readFileSync(new URL('../src/app.js',import.meta.url),'utf8');
const css=readFileSync(new URL('../src/styles.css',import.meta.url),'utf8');
test('interface decorative icons do not depend on Unicode symbol fonts',()=>{assert.doesNotMatch(html+app,/[↗→↓◫▤✧◎ⓘ⌁×]/)});
test('brand mark is vector geometry, not a text glyph',()=>{assert.match(html,/<span class="brand-icon"><svg[^>]*>[\s\S]*?<path/);assert.match(html,/aria-hidden="true" focusable="false"/)});
test('font stack has local fallbacks and no network font dependency',()=>{assert.doesNotMatch(css,/@import|url\(['"]?https?:/);assert.doesNotMatch(css,/Manrope|DM Sans/);assert.match(css,/Arial,Helvetica,sans-serif/)});

test('Siege visual identity names concrete operators and preserves asset disclaimers',()=>{for(const name of ['Ace','Smoke','Buck','Valkyrie','Nomad'])assert.ok(app.includes(name));assert.match(app,/ORIGINAL SCHEMATIC/);assert.match(app,/not official operator badges/);assert.match(app,/Blue and orange identify teams/)});
