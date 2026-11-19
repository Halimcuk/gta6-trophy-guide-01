// A tiny static server for app/ (Node 22, standard library only), so the guide can
// be run locally without a build step: `node serve.ts` serves app/ on
// http://localhost:8080 (`--port <n>` for another port). It sends the MIME types a
// browser needs, refuses any path outside app/, and otherwise does nothing clever:
// this is a development convenience, not a web server for the internet.
import { createReadStream, statSync } from 'node:fs';
import { createServer } from 'node:http';
import { extname, join, normalize, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('./app', import.meta.url)));
const args = process.argv.slice(2);
const portIndex = args.indexOf('--port');
const requested = portIndex === -1 ? 8080 : Number(args[portIndex + 1]);
const port = Number.isInteger(requested) && requested > 0 && requested < 65536 ? requested : 8080;

const MIME: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

const server = createServer((req, res) => {
  const rawPath = decodeURIComponent(new URL(req.url ?? '/', 'http://localhost').pathname);
  const safe = normalize(join(root, rawPath)).replace(/\/$/, '');
  const target = safe === root ? join(root, 'index.html') : safe;
  if (!target.startsWith(root + sep) && target !== root) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }
  let stat;
  try {
    stat = statSync(target);
  } catch {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  const file = stat.isDirectory() ? join(target, 'index.html') : target;
  try {
    statSync(file);
  } catch {
    res.writeHead(404);
    res.end('Not found');
    return;
  }
  res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' });
  createReadStream(file).pipe(res);
});

server.listen(port, () => {
  console.log(`Leonida Legends guide at http://localhost:${port}/`);
});
