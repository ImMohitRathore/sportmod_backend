const User = require("../Model/User.model");
const Follow = require("../Model/follwers.model");

const mongoose = require("mongoose");
const { model } = mongoose;
const mongoosePaginate = require("mongoose-paginate-v2");

const paginate = async (model, pipeline = null, options = {}) => {
  const page = parseInt(options.page) || 1;
  const limit = parseInt(options.limit) || 10;
  const skip = (page - 1) * limit;

  const paginatedResults = {
    currentPage: page,
    perPage: limit,
  };

  try {
    let result, totalDocs;

    if (pipeline) {
      // For total count
      const totalCountPipeline = [...pipeline, { $count: "totalCount" }];
      const totalCountResult = await model.aggregate(totalCountPipeline);
      totalDocs = totalCountResult[0]?.totalCount || 0;

      // For paginated data
      const paginationPipeline = [
        ...pipeline,
        { $skip: skip },
        { $limit: limit },
        ...(options.sort ? [{ $sort: options.sort }] : []), // Dynamic sorting
      ];
      result = await model.aggregate(paginationPipeline);
    } else {
      // Without pipeline
      result = await model
        .find({})
        .skip(skip)
        .limit(limit)
        .sort(options.sort || {})
        .select(options.select || "");

      totalDocs = await model.countDocuments({});
    }

    const totalPages = Math.ceil(totalDocs / limit);

    paginatedResults.totalPages = totalPages;
    paginatedResults.totalCount = totalDocs;
    paginatedResults.data = result;

    return {
      status: true,
      data: paginatedResults,
      message: "Data fetched successfully",
    };
  } catch (error) {
    console.log("Pagination error:", error);
    return {
      status: false,
      message: "Pagination failed: " + error.message,
    };
  }
};

async function createUsersFromTemplate() {
  try {
    const templateUser = await User.findOne({}).lean();

    if (!templateUser) {
      console.log("No template user found in the database.");
      return;
    }

    const usersToCreate = 20;
    const createdUsers = [];

    // Create 20 new users based on the template user's data
    for (let i = 0; i < usersToCreate; i++) {
      const newUser = new User({
        ...templateUser, // Replicate all fields from template user
        fname: `${templateUser.fname}_${i + 1}`, // Example: appending _1, _2, ..., _20 to fname
        lname: `${templateUser.lname}_${i + 1}`, // Example: appending _1, _2, ..., _20 to lname
        email: `${templateUser.email.split("@")[0]}_${i + 1}@example.com`, // Example: appending _1, _2, ..., _20 to email
        // You may need to adjust how you generate the email based on your actual data structure
      });

      // Save the new user to the database
      const savedUser = await newUser.save();
      createdUsers.push(savedUser);
    }

    console.log(`${usersToCreate} new users created successfully.`);
    console.log("Created Users:", createdUsers);
  } catch (error) {
    console.error("Error creating users:", error);
  }
}

let isArray = function (a) {
  return !!a && a.constructor === Array;
};

let isObject = function (a) {
  return !!a && a.constructor === Object;
};

const isAllDataCome = (madatoryFeilds) => {
  let finalRes = false;
  let responseData = {
    data: null,
    status: false,
    message: "Please fill the data properly",
  };

  madatoryFeilds.forEach((feild) => {
    if (!feild) {
      finalRes = true;
    } else {
      responseData.message = "";
    }
  });
  return {
    status: finalRes,
    data: responseData,
  };
};

const checkDataisComing = (mandatoryFields = [], data) => {
  let finalRes = true;
  let responseData = {
    data: null,
    status: false,
    message: "Please fill the data properly",
  };

  mandatoryFields.forEach((field) => {
    if (
      !data.hasOwnProperty(field) ||
      data[field] === null ||
      data[field] === ""
    ) {
      finalRes = false;
    }
  });

  if (finalRes) {
    responseData = {
      data: data,
      status: true,
      message: "Data is valid",
    };
  }

  return responseData;
};

module.exports = {
  createUsersFromTemplate,
  paginate,
  isAllDataCome,
  checkDataisComing,
};
