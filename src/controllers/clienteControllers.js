import {condb} from '../db.js' //importamos la conexion a la base de datos

//funcion para obtener todos
export const getallClientes = async(req, res) => {
    const [rows] = await condb.query('SELECT * FROM cliente;')
    res.json(rows)
}

//funcion para obtener uno
export const getCliente = async (req, res) => {
    try {
      const { id } = req.params;
      const [cliente] = await condb.query("SELECT * FROM cliente WHERE idcliente = ?", [id]);
  
      if (cliente.length <= 0) {
        return res.status(404).json({ message: "No se encontro el cliente" });
      }
  
      res.json(cliente[0]);
    } catch (error) {
      return res.status(500).json({ message: "algo salio mal" });
    }
  };

  //funcion para crear
export const createCliente = async(req, res) => {
    const { identificacion, nombres,direccion, ciudad, telefono, correo} =req.body
    const [respuesta] = await condb.query('INSERT INTO cliente (identificacion, nombres,direccion, ciudad, telefono, correo ) VALUES (?, ?, ?, ?, ?, ?)',[identificacion, nombres,direccion, ciudad, telefono, correo])
    res.send({
        idcliente: respuesta.insertId, 
        identificacion, 
        nombres,
        direccion, 
        ciudad, 
        telefono, 
        correo
    })
    console.log('cliente registrado')
}

//funcion para modificar
export const updateCliente =  async (req, res) => {
    
    try {
        const { id } = req.params;
        const {idcliente, identificacion, nombres, direccion, ciudad, telefono, correo } = req.body;
    
        const [cliente] = await condb.query(
            "UPDATE cliente SET identificacion = IFNULL(?, identificacion), nombres = IFNULL(?, nombres), direccion = IFNULL(?, direccion), ciudad = IFNULL(?, ciudad), telefono = IFNULL(?, telefono), correo = IFNULL(?, correo) WHERE idcliente = ?;",
            [identificacion, nombres ,direccion, ciudad, telefono, correo, idcliente]
            );
        
        if (cliente.affectedRows === 0)
          return res.status(404).json({ message: "no encontrado" });
    
        const [rows] = await condb.query("SELECT * FROM cliente WHERE idcliente = ?",[id]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "algo salio mal" });
    }
   
    
}
//funcion para eliminar
export const deleteCliente = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] =  await condb.query("DELETE FROM cliente WHERE idcliente = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "cliente no existe" });
        }

        res.sendStatus(204);
        console.log('cliente eliminado')
    } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};