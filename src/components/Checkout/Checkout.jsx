import { useState } from "react"
import { useCart } from "../../hooks/useCart";
import "./Checkout.css"
import { addDoc, collection, documentId, getDocs, query, where, writeBatch } from "firebase/firestore";
import {db} from "../../services/firebase"
function Checkout() {



  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [direccion, setDireccion] = useState("");

  const [loading, setLoading] = useState(false);
  const [orderCreated, setOrderCreated] = useState(false)

  const {cart, totalQuantity, getTotal, clearCart} = useCart();

  const total = getTotal()

  const createOrder = async () =>{
    setLoading(true);
    try{
    const objOrder ={
      buyer:{
        nombre: nombre ,
        apellido: apellido ,
        telefono: telefono,
        direccion: direccion,
      },
      items: cart,
      totalQuantity,
      total,
      date: new Date()
    };

    const ids = cart.map ((item)=> item.id)
    const productosRef = collection (db,"productos")
    const productsAddedFromFirestore = await getDocs(
      query(productosRef, where(documentId(), "in", ids)));

      const {docs} = productsAddedFromFirestore;

      const outOfStock = [];

      const batch = writeBatch(db);

      docs.forEach((doc)=>{
        const dataDoc = doc.data();
        const stockDb = dataDoc.stock;

        const productAddedToCart = cart.find((prod)=> prod.id === doc.id);

        const prodQuantity = productAddedToCart.quantity;

        if(stockDb >= prodQuantity){
          batch.update(doc.ref, {stock: stockDb - prodQuantity});
        }else{
          outOfStock.push({id: doc.id, ...dataDoc });
        }
      });
      if(outOfStock.length === 0){
        await batch.commit();
        const orderRef = collection(db,"orders")
        const orderAdded = await addDoc(orderRef, objOrder);
        // console.log (`el id de su orden es: ${orderAdded.id}`);
        setOrderCreated(true)
        clearCart()
      }else{
        return <h2>No hay items</h2>
      }
    }catch(error){
      return <h2>No hay items</h2>
    } finally {
      setLoading(false);
    }
    if (loading) {
      return <h1>Se esta generando la orden</h1>;
    }

    if (orderCreated) {
      return <h1>La orden fue creada correctamente</h1>;
    }
  }


return (
  <div className="formu">

    <label htmlFor="nombre">Nombre</label>
    <input onChange={(e) => setNombre(e.target.value)} value={nombre} />{" "}
    <br />
    <label htmlFor="apellido">Apellido</label>
    <input onChange={(e) => setApellido(e.target.value)} value={apellido} />
    <br />
    <label htmlFor="telefono">Telefono</label>
    <input onChange={(e) => setTelefono(e.target.value)} value={telefono} />
    <br />
    <label htmlFor="direccion">Addres</label>
    <input onChange={(e) => setDireccion(e.target.value)} value={direccion} />
    <div>
      {cart.map((item) => (
        <article key={item.id}>
          <header>
            <h2 className="text-secondary text-center m-5">
              {item.name}{" "}
              <span className="badge">Cantidad: {totalQuantity}</span>
            </h2>
          </header>
        </article>
      ))}
    </div>
    <h1 className="text-center">Checkout</h1>
    <div className="d-flex justify-content-center p-3 ">
      <button className="btn btn-primary" onClick={createOrder}>
        Generar Orden
      </button>
    </div>
  </div>
);
}







export default Checkout