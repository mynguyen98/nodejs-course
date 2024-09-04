const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded());
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'Success',
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  console.log(req.body);
  res.send('Done');
});

app.listen(3000, () => {
  console.log('server listening on port 3000');
});
