const express = require("express");
const router = express.Router();

const {
  list_trainers,
  find_trainer,
  create_trainer,
  partially_update_trainer,
  fully_update_trainer,
  delete_trainer,
  delete_trainers,
} = require("../controllers/trainerController");

router.post("/", create_trainer);
router.get("/", list_trainers);
router.get("/:id", find_trainer);
router.patch("/:id", partially_update_trainer);
router.put("/:id", fully_update_trainer);
router.delete("/:id", delete_trainer);
router.delete("/", delete_trainers);

module.exports = router;
