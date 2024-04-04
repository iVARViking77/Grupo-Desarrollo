const pool = require("../database/index");

const entidadController = {
  create: async (req, res) => {
    try {
      const {
        nombre_entidad,
        organismo_subordinado,
        domicilio_legal,
        codigo_reeup,
        codigo_nit,
        numero_cuenta_bancaria,
        sucursal_bancaria,
        numero_sucursal,
        titular_cuenta,
        representada_por,
        caracter_de,
        formato_contrato,
        formato_factura,
        personal_contratos,
        personal_facturas
      } = req.body;

      const sql =
        "INSERT INTO entidad (nombre_entidad, organismo_subordinado, domicilio_legal, codigo_reeup, codigo_nit, numero_cuenta_bancaria, sucursal_bancaria, numero_sucursal, titular_cuenta, representada_por, caracter_de, formato_contrato, formato_factura, personal_contratos, personal_facturas) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
      const [rows, fields] = await pool.query(sql, [
        nombre_entidad,
        organismo_subordinado,
        domicilio_legal,
        codigo_reeup,
        codigo_nit,
        numero_cuenta_bancaria,
        sucursal_bancaria,
        numero_sucursal,
        titular_cuenta,
        representada_por,
        caracter_de,
        formato_contrato,
        formato_factura,
        personal_contratos,
        personal_facturas
      ]);

      res.json({
        message: "Entidad creada correctamente",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error al crear los datos de la entidad" });
    }
  },
  getEntidad: async (req, res) => {
    try {
        const [rows, fileds ] = await pool.query("SELECT * FROM entidad")
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
  update: async (req, res) => {
    try {
        const {
            nombre_entidad,
            organismo_subordinado,
            domicilio_legal,
            codigo_reeup,
            codigo_nit,
            numero_cuenta_bancaria,
            sucursal_bancaria,
            numero_sucursal,
            titular_cuenta,
            representada_por,
            caracter_de,
            formato_contrato,
            formato_factura,
            personal_contratos,
          personal_facturas
          } = req.body;
        const {id} = req.params
        const sql = "UPDATE entidad SET nombre_entidad = ?, organismo_subordinado = ?, domicilio_legal = ?, codigo_reeup = ?, codigo_nit = ?, numero_cuenta_bancaria = ?, sucursal_bancaria = ?, numero_sucursal = ?, titular_cuenta = ?, representada_por = ?, caracter_de = ?, formato_contrato = ?, formato_factura = ?, personal_contratos = ?, personal_facturas = ? WHERE id = ?"
        const [rows, fileds] = await pool.query(sql, [
            nombre_entidad,
            organismo_subordinado,
            domicilio_legal,
            codigo_reeup,
            codigo_nit,
            numero_cuenta_bancaria,
            sucursal_bancaria,
            numero_sucursal,
            titular_cuenta,
            representada_por,
            caracter_de,
            formato_contrato,
            formato_factura,
            personal_contratos,
            personal_facturas,
            id])
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
}
};

module.exports = entidadController;
