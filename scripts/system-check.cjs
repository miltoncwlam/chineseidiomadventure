const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const root = path.join(__dirname, '..');
let failed = 0;

function assert(name, ok, detail) {
  if (ok) {
    console.log('ok  ' + name);
    return;
  }
  failed += 1;
  console.log('FAIL  ' + name + (detail ? ' — ' + detail : ''));
}

function shuffle(items) {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function pickBoardWords(bank, masteredIds, failedIds, wordCount) {
  const missedWords = bank.filter((item) => failedIds.includes(item.id) && !masteredIds.includes(item.id));
  const freshWords = shuffle(bank.filter((item) => !failedIds.includes(item.id) && !masteredIds.includes(item.id)));
  const unmastered = [...shuffle(missedWords), ...freshWords];
  const pool = unmastered.length ? unmastered : shuffle([...bank]);
  return pool.slice(0, wordCount);
}

function swipeMatch(pathTiles, boardWords, foundIds) {
  const chars = pathTiles.map((tile) => tile.char).join('');
  const reversed = [...chars].reverse().join('');
  const ids = pathTiles.map((tile) => tile.wordId);
  const wordId = ids[0];
  const aligned = Boolean(wordId) && ids.every((id) => id === wordId);
  if (!aligned) return null;
  return boardWords.find((item) =>
    !foundIds.includes(item.id) &&
    item.id === wordId &&
    (item.word === chars || item.word === reversed)
  ) || null;
}

const game = fs.readFileSync(path.join(root, 'landscape.html'), 'utf8');
const pubGame = fs.readFileSync(path.join(root, 'public/landscape.html'), 'utf8');
const home = fs.readFileSync(path.join(root, 'app/page.tsx'), 'utf8');
const signIn = fs.readFileSync(path.join(root, 'app/sign-in/[[...sign-in]]/page.tsx'), 'utf8');
const privacy = fs.readFileSync(path.join(root, 'app/privacy/page.tsx'), 'utf8');
const terms = fs.readFileSync(path.join(root, 'app/terms/page.tsx'), 'utf8');
const config = fs.readFileSync(path.join(root, 'config.js'), 'utf8');
const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));

const start = game.lastIndexOf('<script>');
const end = game.lastIndexOf('</script>');
const js = game.slice(start + 8, end);
const tmp = '/tmp/chinese-idiom-game-check.js';
fs.writeFileSync(tmp, js);
const syntax = spawnSync('node', ['--check', tmp], { encoding: 'utf8' });
assert('game script parses', syntax.status === 0, syntax.stderr);

assert('public landscape.html stays in sync', game === pubGame);
assert('dev server is port 3002', pkg.scripts.dev.includes('-p 3002'));
assert('homepage uses /sign-in link, not modal', home.includes('href="/sign-in"') && !home.includes('SignInButton') && home.includes('useUser'));
assert('sign-in page is full-screen AuthScreen', signIn.includes('AuthScreen') && signIn.includes('SignInPanel'));
assert('privacy and terms pages exist', privacy.includes('私隱政策') && terms.includes('服務條款'));
assert('no exam retry shop', !game.includes('測驗重答') && game.includes('測驗進行中不能使用金幣'));
assert('decoy fade costs 40', game.includes('去干擾 · 40') && !game.includes('去干擾 · 15'));
assert('gold skin CSS class is applied', game.includes('is-owned-gold') && game.includes("goldBorder ? 'is-gold'"));
assert('exam locks other tabs', game.includes("examInProgress && tab.id !== 'test'"));
assert('guest can skip auth', home.includes('以訪客進入遊戲'));
assert('clerk overlay redirects to /sign-in', config.includes("location.assign('/sign-in')"));
assert(
  'legacy clerk popup is gone',
  !config.includes('mountSignIn') && !config.includes('clerk-host') && !config.includes('載入登入') && !config.includes('closeChineseIdiomSignIn')
);
assert('legacy Homepage hub is gone', !fs.existsSync(path.join(root, 'Homepage', 'index.html')));
assert('layout forces path sign-in', fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8').includes('signInUrl="/sign-in"'));
assert(
  'clerk frontend API is proxied on-origin',
  fs.existsSync(path.join(root, 'app/api/clerk')) &&
    fs.readFileSync(path.join(root, 'app/layout.tsx'), 'utf8').includes("proxyUrl={process.env.NEXT_PUBLIC_CLERK_PROXY_URL || '/api/clerk'}")
);
assert('remote idioms merge by id', game.includes('bank.find((item) => item.id === row.id)'));
assert('all-mastered boards still pick words', game.includes('const pool = unmastered.length ? unmastered : shuffle([...bank])'));
assert('swipes require matching wordId', game.includes('pathWordIds.every(id => id === wordId)'));

const bank = Array.from({ length: 17 }, (_, i) => ({ id: i + 1, word: '成語' + i }));
const mastered = bank.map((item) => item.id);
const review = pickBoardWords(bank, mastered, [], 5);
assert('review board after 17/17 still has 5 words', review.length === 5);

const fresh = pickBoardWords(bank, [1, 2], [], 3);
assert('unmastered words are preferred', fresh.every((item) => item.id !== 1 && item.id !== 2));

const realPath = [
  { char: '山', wordId: 1 },
  { char: '明', wordId: 1 },
  { char: '水', wordId: 1 },
  { char: '秀', wordId: 1 }
];
const decoyPath = [
  { char: '山', wordId: null },
  { char: '明', wordId: null },
  { char: '水', wordId: null },
  { char: '秀', wordId: null }
];
const words = [{ id: 1, word: '山明水秀' }];
assert('real tiles count as a find', swipeMatch(realPath, words, []).id === 1);
assert('decoy tiles that spell the word do not count', swipeMatch(decoyPath, words, []) === null);

if (failed) {
  console.log('\n' + failed + ' check(s) failed');
  process.exit(1);
}
console.log('\nall checks passed');
