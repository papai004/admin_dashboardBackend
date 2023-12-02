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

        if(createdData) {
            resolve(createdData._doc);
        }
      } catch (err) {
        reject(err);
      }
    });
  }
}

export default new AdminService();
