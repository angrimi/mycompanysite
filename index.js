const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// public 폴더를 정적 파일 제공 경로로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 기본 경로 접속 시 public/index.html 파일 제공
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
