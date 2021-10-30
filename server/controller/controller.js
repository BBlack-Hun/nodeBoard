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
  // 전체 데이터를 조회
  Userdb.find()
    // 데이터를 잘 찾은 경우 반환해준다.
    .then((user) => {
      res.send(user);
    })
    // callback 데이터 즉, 반환되는 데이터가 문제가 발생할 경우
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Error Occurred while retriving user information',
      });
    });
};

// Update a new identified user by user id
exports.update = (req, res) => {
  // 업데이트 할 데이터가 있는지를 확인
  if (!req.body) {
    return res
      .status(400)
      .send({ message: 'data to update can not be empty!' });
  }
  // 업데이트할 아이디를 파라미터로 부터 받아온다.
  const id = req.params.id;

  // id를 가지고 게시글을 검색후, 내용을 업데이트 한다.
  Userdb.findByIdAndUpdate(id, req.body)
    .then((data) => {
      // callback 데이터가 없을 경우
      if (!data) {
        res.status(404).sned({
          message: `Cannot Update user with ${id}. Maybe user not found!`,
        });
      } else {
        // callback 데이터가 있을 경우
        res.send(data);
      }
    })
    // callback 과정에서 오류가 발생할 경우
    .catch((err) => {
      res.status(500).send({ message: 'Error Update user information' });
    });
};

// Delete a user with specified user id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({ message: 'User was deleted successfully' });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: 'Could not delete User withd id' + id });
    });
};
