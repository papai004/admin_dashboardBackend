import DataModel from "../models/data.model.js";

class AdminService {
  constructor() {}

  async createNewData(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, email, role } = payload;

        const newData = new DataModel({
          name,
          email,
          role,
        });

        const createdData = await newData.save();

        if (createdData) {
          resolve(createdData._doc);
        }
      } catch (err) {
        reject(err);
      }
    });
  }

  async getData(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, size } = payload;

        const limit = parseInt(size);
        const skip = (page - 1) * size;

        let query = {
          isDeleted: false,
        };

        // * If search string passed in the payload
        if (payload?.searchString) {
          query = {
            ...query,
            $text: { $search: new RegExp(payload?.searchString, "i") },
          };
        }

        const foundDatas = await DataModel.find(query).limit(limit).skip(skip);
        const count = await DataModel.countDocuments(query);

        if (!foundDatas || foundDatas.length < 1) {
          reject(
            new Error("No Recors found", {
              cause: { indicator: "db", status: 404 },
            })
          );
        }

        resolve({ dataList: foundDatas, count });
      } catch (error) {
        console.log(error);
      }
    });
  }

  async deleteData(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email } = payload;

        // * Checking a single data from Database
        const foundData = await DataModel.findOne({
          email,
        });

        // * If no students are found reject
        if (!foundData || foundData.isDeleted === true) {
          reject(
            new Error("No data found", {
              indicator: "DB",
              status: 404,
            })
          );
          return;
        }
        // As the data is present now setting isDeleted to true
        foundData.isDeleted = true;

        const setUpdateDetails = await foundData.save();
        resolve(setUpdateDetails);
      } catch (error) {
        reject(error);
      }
    });
  }
}

export default new AdminService();
