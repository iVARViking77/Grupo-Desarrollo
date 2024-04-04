const bcrypt = require('bcrypt');
const pool = require("../database/index")
const jwt = require('jsonwebtoken');

const usuariosController = {

    create: async (req, res) => {
        try {
            const { NombreApellido, CarnetIdentidad, Telefono, Cargo, Rol, NombreUsuario, Email, Contraseña } = req.body;
            
            // Encriptar la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await bcrypt.hash(Contraseña, 10);
    
            const sql = "INSERT INTO usuarios (NombreApellido, CarnetIdentidad, Telefono, Cargo, Rol, NombreUsuario, Email, Contraseña) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
            const [rows, fields] = await pool.query(sql, [NombreApellido, CarnetIdentidad, Telefono, Cargo, Rol, NombreUsuario, Email, hashedPassword]);
    
            res.json({
                message: 'Usuario creado correctamente'
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error al crear el usuario' });
        }
    },
    signIn: async (req, res) => {
        try {
            const { NombreUsuario, Contraseña } = req.body;
            const [user] = await pool.query('SELECT * FROM usuarios WHERE NombreUsuario = ?', [NombreUsuario]);
            if (user.length === 0) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }
            
            // Desencriptar la contraseña almacenada en la base de datos
            const hashedPassword = await bcrypt.hash(Contraseña, 10);
            const passwordMatch = await bcrypt.compare(Contraseña, hashedPassword);
            
            if (!passwordMatch) {
                // Contraseña incorrecta
                return res.status(401).json({ error: 'Contraseña incorrecta', hashedPassword, Contraseña });
            }
            
            // Define el tiempo de expiración del token (por ejemplo, 1 hora)
            const expiresIn = 3600; // 1 hora en segundos
            const token = jwt.sign({ userId: user[0].id }, 'secretKey', { expiresIn });
            
            res.json({
                message: 'Inicio de sesión exitoso',
                token: token,
                expiresIn: expiresIn,
                rol: user[0].Rol
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error en el inicio de sesión' });
        }
    },
    getUsersByRolContratista: async (req, res) => {
        try {
            const rol = "Contratista"
    
            const [users] = await pool.query('SELECT NombreApellido, CarnetIdentidad, Cargo FROM usuarios WHERE NombreUsuario = ?', [rol]);
    
            res.json({
                data: users
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error' });
        }
    },
    getUsersByRolFacturador: async (req, res) => {
        try {
            const rol = "Facturador"
    
            const [users] = await pool.query('SELECT NombreApellido, CarnetIdentidad, Cargo FROM usuarios WHERE NombreUsuario = ?', [rol]);
    
            res.json({
                data: users
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Error' });
        }
    },
    getAll: async (req, res) => {
        try {
            const [rows, fileds ] = await pool.query("SELECT * FROM usuarios")
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
                NombreApellido, 
                CarnetIdentidad, 
                Telefono, 
                Cargo, 
                Rol, 
                NombreUsuario,
                Email,
                Contraseña 
            } = req.body;
            const {id} = req.params

            // Encriptar la contraseña antes de almacenarla en la base de datos
            const hashedPassword = await bcrypt.hash(Contraseña, 10);

            const sql = "UPDATE usuarios SET NombreApellido = ?, CarnetIdentidad = ?, Telefono = ?, Cargo = ?, Rol = ?, NombreUsuario = ?, Email = ?, Contraseña = ? WHERE id = ?"
            const [rows, fileds] = await pool.query(sql, [
                NombreApellido, 
                CarnetIdentidad, 
                Telefono, 
                Cargo, 
                Rol, 
                NombreUsuario,
                Email, 
                hashedPassword,
                id])
            res.json({
                message: 'Usuario actualizado correctamente'
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
            const [rows, fileds] = await pool.query("DELETE FROM usuarios WHERE id = ?", [id])
            res.json({
                message: 'Usuario eliminado correctamente'
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

module.exports = usuariosController