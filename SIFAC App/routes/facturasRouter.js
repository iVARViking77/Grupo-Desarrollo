const express = require("express")
const router = express.Router()

const facturasController = require("../controllers/facturasController")

router.get("/", facturasController.getAll)
router.get("/:id", facturasController.getById)
router.get("/:id/servicios", facturasController.getServicosByFactura)
router.post("/", facturasController.create)
router.put("/:id", facturasController.update)
router.delete("/:id", facturasController.delete)

module.exports = router