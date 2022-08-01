const http = require('http')
const fs = require('fs')
const page = `
<!DOCTYPE html>
<html lang="pt">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Exemplo com docker node</title>
</head>
<body>
  <h2>Nosso exercicio de docker</h2>
</body>
</html>
`

const indexHtml = fs.readFileSync("./index.html").toString()

const server = http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/html' });
  res.write(indexHtml)
  res.end();
})

server.listen(3000);

console.log('Node.js web server at port 3000 is running...')

// para rodar em docker sem criar Dockerfile
// docker run --name=nodeServer -d --rm -w /app -p 3000:3000 -v $(pwd):/app node:14-alpine node /app/index.js
