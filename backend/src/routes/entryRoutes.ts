import express from "express";
import controller = require("../controller/entryController");

const router = express.Router();

router.route("/").get(controller.getAllEntry).post(controller.postAllEntry);

router
  .route("/:id")
  .patch(controller.patchAllEntry)
  .delete(controller.deleteAllEntry);

  export default router;