const express = require("express")
const app = express()
const cors = require('cors');
const cookieParser = require('cookie-parser');

require('dotenv').config()

const contratosRouter = require('./routes/contratosRouter')
const facturasRouter = require('./routes/facturasRouter')
const usuariosRouter = require('./routes/usuariosRouter')
const entidadRouter = require('./routes/entidadRouter')
const serviciosRouter = require('./routes/serviciosRouter')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(cors());
app.use(cookieParser());

app.use("/api/v1/contratos", contratosRouter)
app.use("/api/v1/facturas", facturasRouter)
app.use("/api/v1/usuarios", usuariosRouter)
app.use("/api/v1/entidad", entidadRouter)
app.use("/api/v1/servicios", serviciosRouter)

// Middleware para manejo de errores
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const PORT = 3000

app.listen(PORT, () => {
    console.log('Server running.......')
})