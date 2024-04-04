const pool = require("../database/index")

const contratosController = {

    getAll: async (req, res) => {
        try {
            const [rows, fileds ] = await pool.query("SELECT * FROM contratos")
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
            const [rows, fileds] = await pool.query("SELECT * FROM contratos WHERE id = ?", [id])
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
    getFacturasByContratos: async (req, res) => {
        try {
            const { id } = req.params;
            const query = `
                SELECT f.*
                FROM facturas f
                WHERE f.IdContrato = ?
            `;
            const [rows, fields] = await pool.query(query, [id]);
            res.json({ 
                data: rows
            });
        } catch (error) {
            console.log(error);
            res.json({
                status: "error"
            });
        }
    },
    create: async (req, res) => {
        try {
            const {
                NumeroContrato,
                NombreEntidad,
                OrganismoSubordina,
                DomicilioLegal,
                CodigoReeup,
                CodigoNIT,
                NumeroCuentaBancaria,
                SucursalBancaria,
                NumeroSucursal,
                TitularCuenta,
                RepresentadaPor,
                EnSuCaracterDe,
                FechaFirma,
                FechaFinContrato,
                ObjetoContrato,
                PersonalAutorizadoFirmarFacturas
            } = req.body;
    
            const sql = "INSERT INTO contratos (NumeroContrato, NombreEntidad, OrganismoSubordina, DomicilioLegal, CodigoReeup, CodigoNIT, NumeroCuentaBancaria, SucursalBancaria, NumeroSucursal, TitularCuenta, RepresentadaPor, EnSuCaracterDe, FechaFirma, FechaFinContrato, ObjetoContrato, PersonalAutorizadoFirmarFacturas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [
                NumeroContrato,
                NombreEntidad,
                OrganismoSubordina,
                DomicilioLegal,
                CodigoReeup,
                CodigoNIT,
                NumeroCuentaBancaria,
                SucursalBancaria,
                NumeroSucursal,
                TitularCuenta,
                RepresentadaPor,
                EnSuCaracterDe,
                FechaFirma,
                FechaFinContrato,
                ObjetoContrato,
                PersonalAutorizadoFirmarFacturas
            ]);
    
            res.json({
                message: 'Contrato creado correctamente'
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
                NumeroContrato,
                NombreEntidad,
                OrganismoSubordina,
                DomicilioLegal,
                CodigoReeup,
                CodigoNIT,
                NumeroCuentaBancaria,
                SucursalBancaria,
                NumeroSucursal,
                TitularCuenta,
                RepresentadaPor,
                EnSuCaracterDe,
                FechaFirma,
                FechaFinContrato,
                ObjetoContrato,
                PersonalAutorizadoFirmarFacturas
            } = req.body
            const {id} = req.params
            const sql = "UPDATE contratos SET NumeroContrato = ?, NombreEntidad = ?, OrganismoSubordina = ?, DomicilioLegal = ?, CodigoReeup = ?, CodigoNIT = ?, NumeroCuentaBancaria = ?, SucursalBancaria = ?, NumeroSucursal = ?, TitularCuenta = ?, RepresentadaPor = ?, EnSuCaracterDe = ?, FechaFirma = ?, FechaFinContrato = ?, ObjetoContrato = ?, PersonalAutorizadoFirmarFacturas = ? WHERE id = ?"
            const [rows, fileds] = await pool.query(sql, [
                NumeroContrato,
                NombreEntidad,
                OrganismoSubordina,
                DomicilioLegal,
                CodigoReeup,
                CodigoNIT,
                NumeroCuentaBancaria,
                SucursalBancaria,
                NumeroSucursal,
                TitularCuenta,
                RepresentadaPor,
                EnSuCaracterDe,
                FechaFirma,
                FechaFinContrato,
                ObjetoContrato,
                PersonalAutorizadoFirmarFacturas,
                id])
            res.json({
                message: 'Contrato actualizado correctamente'
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
            const [rows, fileds] = await pool.query("DELETE FROM contratos WHERE id = ?", [id])
            res.json({
                message: 'Contrato eliminado correctamente'
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