const http = require('http');

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Content-Type', 'application/json');

  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  if (req.method !== 'POST' || req.url !== '/api/analyze') {
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not found' }));
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const analysis = `YOUR VIDEO SCORE: 6/10

HERE'S WHAT'S WRONG:

🔴 Your Hook Is Too Slow
→ FIX: Start with something surprising

🟡 Low Retention in the Middle
→ FIX: Add visuals every 5-10 seconds

🟢 Strong CTA
Good job!

YOUR ACTION PLAN:
1. Re-do your hook
2. Add more visuals
3. Re-upload`;

    res.writeHead(200);
    res.end(JSON.stringify({ success: true, analysis }));
  });
});

server.listen(3001, () => console.log('Server on http://localhost:3001'));