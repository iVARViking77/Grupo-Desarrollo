const pool = require("../database/index")

const serviciosController = {

    getAll: async (req, res) => {
        try {
            const [rows, fileds ] = await pool.query("SELECT * FROM servicios")
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
                Servicio,
                Precio,
                IdFactura
            } = req.body;
    
            const sql = "INSERT INTO servicios (Servicio, Precio, IdFactura) VALUES (?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [
                Servicio,
                Precio,
                IdFactura
            ]);
    
            res.json({
                message: 'Servicio creado correctamente'
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
                Servicio,
                Precio,
                IdFactura
            } = req.body
            const {id} = req.params
            const sql = "UPDATE servicios SET Servicio = ?, Precio = ?, IdFactura = ? WHERE id = ?"
            const [rows, fileds] = await pool.query(sql, [
                Servicio,
                Precio,
                IdFactura,
                id])
            res.json({
                message: 'Servicio actualizado correctamente'
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
            const [rows, fileds] = await pool.query("DELETE FROM servicios WHERE id = ?", [id])
            res.json({
                message: 'Servicio eliminado correctamente'
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

module.exports = serviciosController