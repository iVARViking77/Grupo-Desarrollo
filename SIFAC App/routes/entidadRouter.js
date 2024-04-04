const express = require("express")
const router = express.Router()

const entidadController = require("../controllers/entidadController")

router.get("/", entidadController.getEntidad)
router.post("/", entidadController.create)
router.put("/:id", entidadController.update)


module.exports = router