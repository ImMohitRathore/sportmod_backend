const service = require("../Service/admin.service");

exports.create_admin = async (req, res) => {
  const { email, name, password, role } = req.body;
  if (!email || !name || !password || !role) {
    return res.send({
      status: false,
      message: "Please fill all the required fields.",
    });
  }

  const data = await service.create_admin(req);
  res.send(data);
};

exports.update_admin = async (req, res) => {
  const { id } = req.params;
  const { email, name, password, role, status } = req.body;
  if (!email || !name || !password || !role || status === undefined) {
    return res.send({
      status: false,
      message: "Please fill all the required fields.",
    });
  }

  const data = await service.update_admin(id, req.body);
  res.send(data);
};

exports.get_admin = async (req, res) => {
  const { id } = req.params;
  const data = await service.get_admin(id);
  res.send(data);
};

exports.get_all_admin = async (req, res) => {
  const data = await service.get_all_admin();
  res.send(data);
};

exports.delete_admin = async (req, res) => {
  const { id } = req.params;
  const data = await service.delete_admin(id);
  res.send(data);
};

exports.login_admin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.send({
      status: false,
      message: "Please provide both email and password.",
    });
  }

  const data = await service.login_admin(email, password);
  res.send(data);
};
