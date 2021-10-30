var Userdb = require('../model/model');

// create and save new user
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // save user in the database
  user
    .save(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          'Some error occurred while creating a create operation',
      });
    });
};

//retrive and return all users/ retive and return a single user
exports.find = (req, res) => {
  Userdb.find()
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error Occurred while retriving user information',
      });
    });
};

// Update a new identified user by user id
exports.update = (req, res) => {
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'data to update can not be empty!' });
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) {
        res.status(404).sned({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        res.send(data);
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Error Update user information' });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {};
