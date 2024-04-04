const express = require("express")
const router = express.Router()

const contratosController = require("../controllers/contratosController")

router.get("/", contratosController.getAll)
router.get("/:id", contratosController.getById)
router.get("/:id/facturas", contratosController.getFacturasByContratos)
router.post("/", contratosController.create)
router.put("/:id", contratosController.update)
router.delete("/:id", contratosController.delete)

module.exports = router