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
          username: savedDetails?.name,
          id: savedDetails?._id,
          email: savedDetails?.email,
          role: savedDetails?.role,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

export default AdminController;
