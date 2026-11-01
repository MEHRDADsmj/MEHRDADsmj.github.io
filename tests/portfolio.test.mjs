import { readFileSync } from 'node:fs';
import { describe, test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const css = readFileSync(join(root, 'assets/css/portfolio.css'), 'utf8');

function titleText(doc) {
  const m = doc.match(/<title[^>]*>([^<]*)<\/title>/i);
  return m ? m[1] : '';
}

function metaDescription(doc) {
  const m = doc.match(
    /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["'][^>]*>/i,
  ) || doc.match(
    /<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["'][^>]*>/i,
  );
  return m ? m[1] : '';
}

describe('portfolio content contract', () => {
  test('title and meta describe systems/backend, not Game Developer', () => {
    const title = titleText(html);
    const desc = metaDescription(html);
    assert.match(title, /backend|distributed|systems/i);
    assert.doesNotMatch(title, /Game Developer/i);
    assert.match(desc, /backend|distributed|systems/i);
    assert.doesNotMatch(desc, /Game Developer/i);
  });

  test('body rejects game-developer and mashup/game-page links', () => {
    assert.doesNotMatch(html, /Game Developer/i);
    assert.doesNotMatch(html, /Pages\/(mafia|pirate|herostrike|voxelcraft|shed)/);
    assert.doesNotMatch(html, /mashup-template/i);
  });

  test('required identity and case-study anchors exist', () => {
    assert.match(html, /Mehrdad Jafari/);
    assert.match(html, /Smart X/);
    assert.match(html, /35M/);
    assert.match(html, /SMPP/);
    assert.match(html, /jafari\.mehrdad\.2001@gmail\.com/);
    assert.match(html, /id="case-study"/);
    assert.match(html, /id="contact"/);
  });
});

function extractHero(doc) {
  const m = doc.match(
    /<header[^>]*data-section=["']hero["'][^>]*>([\s\S]*?)<\/header>/i,
  );
  return m ? m[1] : '';
}

describe('nav and hero', () => {
  test('nav links to work and contact', () => {
    assert.match(html, /href="#work"/);
    assert.match(html, /href="#contact"/);
  });

  test('hero presents systems engineer identity without photo or metric strip', () => {
    const hero = extractHero(html);
    assert.ok(hero.length > 0, 'hero header[data-section=hero] missing');
    assert.match(hero, /Mehrdad Jafari/);
    assert.match(hero, /backends|distributed systems/i);
    assert.match(hero, /→/);
    assert.match(hero, /href="#case-study"/);
    assert.doesNotMatch(hero, /<img\b/i);
    assert.doesNotMatch(hero, /35M[\s\S]{0,80}22M[\s\S]{0,80}300ms/);
  });
});

function extractById(doc, id) {
  const re = new RegExp(
    `<section[^>]*id=["']${id}["'][^>]*>([\\s\\S]*?)<\\/section>`,
    'i',
  );
  const m = doc.match(re);
  return m ? m[1] : '';
}

describe('notification case study', () => {
  test('case study covers scale, SMPP, flexibility, and AI quality framing', () => {
    const cs = extractById(html, 'case-study');
    assert.ok(cs.length > 0, '#case-study missing');
    assert.match(cs, /Smart X/);
    assert.match(cs, /35M/);
    assert.match(cs, /50%|50/);
    assert.match(cs, /SMPP/);
    assert.match(cs, /multi-?channel/i);
    assert.match(cs, /provider|flexib/i);
    assert.match(cs, /AI/i);
    assert.match(cs, /quality|speed/i);
    const blocks = (cs.match(/problem|approach|outcome/gi) || []).length;
    assert.ok(blocks >= 3, 'expected problem/approach/outcome structure');
  });
});

describe('systems work, experience, skills, education, contact', () => {
  test('secondary systems proof points appear', () => {
    assert.match(html, /22M/);
    assert.match(html, /300ms|5s/);
  });

  test('experience covers Smart X, Lucid Dream, Medrick without Free State/CyberSoul sections', () => {
    assert.match(html, /Smart X/);
    assert.match(html, /Lucid Dream/);
    assert.match(html, /Medrick/);
    assert.match(html, /concurrent|backend|latency|player/i);
    assert.doesNotMatch(html, /<h[2-3][^>]*>[^<]*(Free State|CyberSoul)[^<]*<\/h[2-3]>/i);
  });

  test('skills, education, and contact links are present', () => {
    assert.match(html, /\.NET|ASP/i);
    assert.match(html, /Redis|RabbitMQ/);
    assert.match(html, /Computer Engineering/);
    assert.match(html, /Science and Culture/);
    assert.match(html, /18\.87/);
    assert.match(html, /mailto:jafari\.mehrdad\.2001@gmail\.com/);
    assert.match(html, /linkedin\.com\/in\/mehrdad-jafari-developer/);
    assert.match(html, /github\.com\/MEHRDADsmj/);
  });
});

describe('legacy cleanup', () => {
  test('homepage has no Mashup bundles or game gallery assets', () => {
    assert.doesNotMatch(html, /main\.d8e0d294\.css/);
    assert.doesNotMatch(html, /main\.bc58148c\.js/);
    assert.doesNotMatch(html, /assets\/images\/mafia/i);
    assert.doesNotMatch(html, /hero strike|Pirate\.png|voxelcraft\.jpg/i);
  });
});

describe('sticky nav jump targets', () => {
  test('sections reserve scroll-margin-top under sticky nav', () => {
    assert.match(css, /scroll-margin-top\s*:\s*[0-9.]+rem/);
  });
});
