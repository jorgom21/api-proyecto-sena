import {condb} from '../db.js' //importamos la conexion a la base de datos

//funcion para obtener todos
export const getallproveedores = async(req, res) => {
    const [proveedores] = await condb.query('SELECT * FROM proveedores;')
    res.json(proveedores)
}

//funcion para obtener uno
export const getproveedor = async (req, res) => {
    try {
      const { idproveedores } = req.body;
      const [proveedor] = await condb.query("SELECT * FROM proveedores WHERE idproveedores = ?", [
        idproveedores,
      ]);
  
      if (proveedor.length <= 0) {
        return res.status(404).json({ message: "No se encontro el proveedor" });
      }
  
      res.json(proveedor[0]);
    } catch (error) {
      return res.status(500).json({ message: "algo salio mal" });
    }
  };

  //funcion para crear
export const createproveedor = async(req, res) => {
    const {nitproveedor, nombres, telefono, email} =req.body
    const [proveedores] = await condb.query('INSERT INTO proveedores(nitproveedor, nombres, telefono, email) VALUES (?, ?, ?, ?)',[nitproveedor, nombres, telefono, email])
    res.send({
        idproveedores: proveedores.insertId,
        nitproveedor,
        nombres,
        telefono,
        email
    })
    console.log('proveedor agregado')
}

//funcion para modificar
export const updateproveedor =  async (req, res) => {
    
    try {
        const { id } = req.params;
        const {idproveedores, nitproveedor, nombres, telefono, email } = req.body;
    
        const [proveedor] = await condb.query(
            "UPDATE proveedores SET nitproveedor = IFNULL(?, nitproveedor), nombres = IFNULL(?, nombres), telefono = IFNULL(?, telefono), email =IFNULL(?, email) WHERE idproveedores = ?;",
            [nitproveedor, nombres, telefono, email, idproveedores]
            );
        
        if (proveedor.affectedRows === 0)
          return res.status(404).json({ message: "no encontrado" });
    
        const [rows] = await condb.query("SELECT * FROM proveedores WHERE idproveedores = ?",[idproveedores]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
    }
   
    
}
//funcion para eliminar
export const deleteproveedor = async (req, res) => {
    try {
        const { idproveedores } = req.body;
        const [rows] =  await condb.query("DELETE FROM proveedores WHERE idproveedores = ?", [idproveedores]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "proveedor no encontrado" });
        }

        res.sendStatus(204);
    } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};
