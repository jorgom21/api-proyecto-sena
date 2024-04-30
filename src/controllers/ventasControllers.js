import {condb} from '../db.js' //importamos la conexion a la base de datos

//funcion para obtener todos
export const getallventas = async(req, res) => {
    const [rows] = await condb.query('SELECT * FROM ventas;')
    res.json(rows)
}

//funcion para obtener uno
export const getventa = async (req, res) => {
    try {
      const { idventas } = req.body;
      const [venta] = await condb.query("SELECT * FROM ventas WHERE idventas = ?", [
        idventas,
      ]);
  
      if (venta.length <= 0) {
        return res.status(404).json({ message: "No se encontro la venta" });
      }
  
      res.json(venta[0]);
    } catch (error) {
      return res.status(500).json({ message: "algo salio mal" });
    }
  };

  //funcion para crear
export const createventa = async(req, res) => {
    const {fecha, hora, idcliente, idempresa, vendedor_idempleados } =req.body
    const [respuesta] = await condb.query('INSERT INTO ventas (fecha, hora, idcliente, idempresa, vendedor_idempleados ) VALUES (?, ?, ?, ?,?)',[fecha, hora, idcliente, idempresa, vendedor_idempleados])
    res.send({
        idventas: respuesta.insertId,
        fecha,
        hora,
        idcliente,
        idempresa,
        vendedor_idempleados
    })
    console.log('venta registrada')
}

//funcion para modificar
export const updateventa =  async (req, res) => {
    
    try {
        const { id } = req.params;
        const {idventas, fecha, hora, idcliente, idempresa, vendedor_idempleados } = req.body;
    
        const [venta] = await condb.query(
            "UPDATE ventas SET fecha = IFNULL(?, fecha), hora = IFNULL(?, hora), idcliente = IFNULL(?, idcliente), idempresa = IFNULL(?, idempresa), vendedor_idempleados = IFNULL(?, vendedor_idempleados) WHERE idventas = ?",[fecha, hora, idcliente, idempresa, vendedor_idempleados, idventas]
            );
        
        if (venta.affectedRows === 0)
          return res.status(404).json({ message: "no encontrado" });
    
        const [rows] = await condb.query("SELECT * FROM ventas WHERE idventas = ?",[idventas]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "algo salio mal" });
    }
   
    
}
//funcion para eliminar
export const deleteventa = async (req, res) => {
    try {
        const { idventas } = req.body;
        const [rows] =  await condb.query("DELETE FROM ventas WHERE idventas = ?", [idventas]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "venta no existe" });
        }

        res.sendStatus(204);
    } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};