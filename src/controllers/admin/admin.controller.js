import AdminService from "../../services/admin.service.js";

class AdminController {
  constructor() {}

  /**
   * Controller to create a new data
   * @param {req.body} contains the following properties
   * @param {name}
   * @param {email}
   * @param {role}
   */
  async createNewData(req, res, next) {
    try {
      // * Creating a new data with the given payload
      const savedDetails = await AdminService.createNewData(req.body);

      res.status(201).json({
        status: "success",
        message: "Data added successfully",
        data: {
          name: savedDetails?.name,
          id: savedDetails?._id,
          email: savedDetails?.email,
          role: savedDetails?.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async getData(req, res, next) {
    try {
      // * Creating a new data with the given payload
      const savedDetails = await AdminService.getData(req.body);
      console.log(savedDetails);

      res.status(201).json({
        status: "success",
        message: "Data found successfully",
        data: {
          name: savedDetails?.name,
          id: savedDetails?._id,
          email: savedDetails?.email,
          role: savedDetails?.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }

  async deleteData(req, res, next) {
    try {
      // * Creating a new data with the given payload
      const savedDetails = await AdminService.deleteData(req.body);
      console.log(savedDetails);

      res.status(201).json({
        status: "success",
        message: "Data deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
