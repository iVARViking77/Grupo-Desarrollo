const pool = require("../database/index")

const contratosController = {

    getAll: async (req, res) => {
        try {
            const [rows, fileds ] = await pool.query("SELECT * FROM facturas")
            res.json({
                data: rows
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getById: async (req, res) => {
        try {
            const {id} = req.params
            const [rows, fileds] = await pool.query("SELECT * FROM facturas WHERE id = ?", [id])
            res.json({
                data: rows
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    getServicosByFactura: async (req, res) => {
        try {
            const {id} = req.params
            const [rows, fileds] = await pool.query("SELECT * FROM servicios WHERE id = ?", [id])
            res.json({
                data: rows
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    create: async (req, res) => {
        try {
            const {
                NumeroFactura,
                EntidadContrato,
                Entidad,
                Servicios,
                TotalPagar,
                Observaciones,
                PersonalAutorizado,
                Fecha,
                Estado,
                IdContrato
            } = req.body;
    
            const sql = "INSERT INTO facturas (NumeroFactura, EntidadContrato, Entidad, Servicios, TotalPagar, Observaciones, PersonalAutorizado, Fecha, Estado, IdContrato) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [
                NumeroFactura,
                EntidadContrato,
                Entidad,
                Servicios,
                TotalPagar,
                Observaciones,
                PersonalAutorizado,
                Fecha,
                Estado,
                IdContrato
            ]);
    
            res.json({
                message: 'Factura creada correctamente'
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    update: async (req, res) => {
        try {
            const {
                NumeroFactura,
                EntidadContrato,
                Entidad,
                Servicios,
                TotalPagar,
                Observaciones,
                PersonalAutorizado,
                Fecha,
                Estado,
                IdContrato
            } = req.body
            const {id} = req.params
            const sql = "UPDATE facturas SET NumeroFactura = ?, EntidadContrato = ?, Entidad = ?, Servicios = ?, TotalPagar = ?, Observaciones = ?, PersonalAutorizado = ?, Fecha = ?, Estado = ?, IdContrato = ? WHERE id = ?"
            const [rows, fileds] = await pool.query(sql, [
                NumeroFactura,
                EntidadContrato,
                Entidad,
                Servicios,
                TotalPagar,
                Observaciones,
                PersonalAutorizado,
                Fecha,
                Estado,
                IdContrato,
                id])
            res.json({
                message: 'Factura actualizada correctamente'
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params
            const [rows, fileds] = await pool.query("DELETE FROM facturas WHERE id = ?", [id])
            res.json({
                message: 'Factura eliminada correctamente'
            })
        }
        catch (error) {
            console.log(error)
            res.json({
                status: "error"
            })
        }
    }
}

module.exports = contratosController