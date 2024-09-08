const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'Success',
    requestedAt: req.requestTime,
    data: {
      tours: tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Not found!',
      message: 'invalid id',
    });
  }
  const tour = tours.find((el) => el.id === id);

  res.status(200).json({
    status: 'Success',
    data: { tour },
  });
};

exports.createTour = (req, res) => {
  console.log(req.body);
  res.send('Done');
};

exports.updateTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Not found!',
      message: 'invalid id',
    });
  }
  console.log(req.body);
  const newTours = tours.map((tour) => {
    if (tour.id === id) return { ...tour, ...req.body };
    return tour;
  });
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(newTours),
    (err) => {
      console.log(err);
    }
  );
  res.status(200).json({
    status: 'success',
    data: {
      tour: newTours,
    },
  });
};
exports.deleteTour = (req, res) => {
  const id = +req.params.id;
  if (id > tours.length) {
    return res.status(404).json({
      status: 'Not found!',
      message: 'invalid id',
    });
  }
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
