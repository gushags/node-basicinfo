const express = require('express');
const app = express();
const path = require('path');

// options for app.get
const options = {
  root: path.join(__dirname, 'pages'),
  headers: {
    'x-timestamp': Date.now(),
    'x-sent': true,
  },
};

// error handler function in app.get
function errorHandler(err, file) {
  if (err) {
    next(err);
  } else {
    console.log('Sent:', file);
  }
}

// homepage
app.get('/', (req, res, next) => {
  const fileName = 'index.html';
  res.sendFile(fileName, options, (err) => errorHandler(err, fileName));
});

// about page
app.get('/about', (req, res, next) => {
  const fileName = 'about.html';
  res.sendFile(fileName, options, (err) => errorHandler(err, fileName));
});

// contact page
app.get('/contact', (req, res, next) => {
  const fileName = 'contact-me.html';
  res.sendFile(fileName, options, (err) => errorHandler(err, fileName));
});

// handle any 404 status codes
app.use((req, res, next) => {
  res.status(404).sendFile('404.html', options, (err) => {
    if (err) {
      next(err);
    } else {
      console.log('Sent:', '404.html');
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  // This is important!
  if (error) {
    throw error;
  }
  console.log(`Express app listening on port ${PORT}!`);
});
