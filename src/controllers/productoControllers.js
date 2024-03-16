
import {condb} from '../db.js' //importamos la conexion a la base de datos

//funcion para obtener todos
export const getallproductos = async(req, res) => {
    const [rows] = await condb.query('SELECT * FROM producto;')
    res.json(rows)
}

//funcion para obtener uno
export const getproducto = async (req, res) => {
    try {
      const { id } = req.params;
      const [producto] = await condb.query("SELECT * FROM producto WHERE idproducto = ?", [id]);
  
      if (producto.length <= 0) {
        return res.status(404).json({ message: "No se encontro el producto" });
      }
  
      res.json(producto[0]);
    } catch (error) {
      return res.status(500).json({ message: "algo salio mal" });
    }
  };

  //funcion para crear
export const createproducto = async(req, res) => {
    const {producto, existencia, v_unitario_venta, v_unitario_compra, idcategoria, idproveedores} =req.body
    const [respuesta] = await condb.query('INSERT INTO producto (producto, existencia, v_unitario_venta, v_unitario_compra, idcategoria, idproveedores ) VALUES (?, ?, ?, ?, ?, ?)',[producto, existencia, v_unitario_venta, v_unitario_compra, idcategoria, idproveedores])
    res.send({
        idproducto: respuesta.insertId, 
        producto,
        existencia, 
        v_unitario_venta,
        v_unitario_compra,
        idcategoria,
        idproveedores
    })
    console.log('producto registrado')
}

//funcion para modificar
export const updateproducto =  async (req, res) => {
    
    try {
        const { id } = req.params;
        const {producto, existencia, v_unitario_venta, v_unitario_compra, idcategoria, idproveedores } = req.body;
    
        const [produc] = await condb.query(
            "UPDATE producto SET producto = IFNULL(?, producto), existencia = IFNULL(?, existencia), v_unitario_venta = IFNULL(?, v_unitario_venta), v_unitario_compra = IFNULL(?, v_unitario_compra), idcategoria = IFNULL(?, idcategoria), idproveedores = IFNULL(?, idproveedores) WHERE idproducto = ?;",
            [producto, existencia, v_unitario_venta, v_unitario_compra, idcategoria, idproveedores, id]
            );
        
        if (produc.affectedRows === 0)
          return res.status(404).json({ message: "no encontrado" });
    
        const [rows] = await condb.query("SELECT * FROM producto WHERE idproducto = ?",[id,]);

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({ message: "algo salio mal" });
    }
   
    
}
//funcion para eliminar
export const deleteproducto = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] =  await condb.query("DELETE FROM producto WHERE idproducto = ?", [id]);

        if (rows.affectedRows <= 0) {
            return res.status(404).json({ message: "venta no existe" });
        }

        res.sendStatus(204);
    } catch (error) {
    return res.status(500).json({ message: "algo salio mal" });
  }
};