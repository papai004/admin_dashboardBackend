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

        let query = {
          isDeleted: false,
        };

        // * If search string passed in the payload
        if (payload?.searchString) {
          query = {
            ...query,
            $text: { $search: payload.searchString },
          };
        }

        const foundDatas = await DataModel.find(query);
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

  async editData(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { email, nameToUpdate, emailToUpdate, roleToUpdate } = payload;

        // * Checking a single data from Database
        const foundData = await DataModel.findOne({
          email,
        });

        // * If no datas are found reject
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
        foundData.name = nameToUpdate;
        foundData.email = emailToUpdate;
        foundData.role = roleToUpdate;

        const setUpdateDetails = await foundData.save();
        resolve(setUpdateDetails);
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteData(payload) {
    return new Promise(async (resolve, reject) => {
      try {
        const { _id } = payload;

        // * Checking a single data from Database
        const foundData = await DataModel.findOne({
          _id,
        });

        // * If no datas are found reject
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
