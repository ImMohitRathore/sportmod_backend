const Admin = require("../Model/admin.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.create_admin = async (req) => {
  const { email, name, password, role } = req.body;
  let responseData = {};
  try {
    // Check if email already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return {
        status: false,
        message: "Admin with this email already exists.",
      };
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = new Admin({
      email,
      name,
      password: hashedPassword,
      role,
      status: true, // By default, status is active
      createAt: Date.now(),
      updatedAt: Date.now(),
    });

    await admin.save();
    responseData = {
      status: true,
      message: "Admin created successfully.",
    };
  } catch (e) {
    responseData = {
      status: false,
      message: `Something went wrong: ${e.message}`,
    };
  }
  return responseData;
};

exports.update_admin = async (id, data) => {
  let responseData = {};
  try {
    const updatedAdmin = await Admin.findByIdAndUpdate(id, {
      ...data,
      updatedAt: Date.now(),
    }, { new: true });

    if (!updatedAdmin) {
      return {
        status: false,
        message: "Admin not found.",
      };
    }

    responseData = {
      status: true,
      message: "Admin updated successfully.",
      data: updatedAdmin,
    };
  } catch (e) {
    responseData = {
      status: false,
      message: `Something went wrong: ${e.message}`,
    };
  }
  return responseData;
};

exports.get_admin = async (id) => {
  let responseData = {};
  try {
    const admin = await Admin.findById(id);
    if (!admin) {
      return {
        status: false,
        message: "Admin not found.",
      };
    }
    responseData = {
      status: true,
      data: admin,
    };
  } catch (e) {
    responseData = {
      status: false,
      message: `Something went wrong: ${e.message}`,
    };
  }
  return responseData;
};

exports.get_all_admin = async () => {
  let responseData = {};
  try {
    const admins = await Admin.find({});
    responseData = {
      status: true,
      data: admins,
    };
  } catch (e) {
    responseData = {
      status: false,
      message: `Something went wrong: ${e.message}`,
    };
  }
  return responseData;
};

exports.delete_admin = async (id) => {
  let responseData = {};
  try {
    const deletedAdmin = await Admin.findByIdAndDelete(id);
    if (!deletedAdmin) {
      return {
        status: false,
        message: "Admin not found.",
      };
    }
    responseData = {
      status: true,
      message: "Admin deleted successfully.",
    };
  } catch (e) {
    responseData = {
      status: false,
      message: `Something went wrong: ${e.message}`,
    };
  }
  return responseData;
};

exports.login_admin = async (email, password) => {
  let responseData = {};
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return {
        status: false,
        message: "Admin not found.",
      };
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return {
        status: false,
        message: "Invalid password.",
      };
    }

    // Create JWT token
    const token = jwt.sign({ adminId: admin._id, role: admin.role }, "your-secret-key", { expiresIn: '1h' });

    // Save token to admin
    admin.tokens.push({ token });
    await admin.save();

    responseData = {
      status: true,
      message: "Login successful.",
      token,
    };
  } catch (e) {
    responseData = {
      status: false,
      message: `Something went wrong: ${e.message}`,
    };
  }
  return responseData;
};
