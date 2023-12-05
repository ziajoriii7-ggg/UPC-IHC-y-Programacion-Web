import React, { useState } from 'react';
import Product from '../models/Product';
import Order from '../models/Order';

import './PedidoPage.css'; 

const predefinedProducts = [
  new Product('Pizza', 41),
  new Product('Burger', 15)
];

const PedidoPage = () => {
    const [productos, setProductos] = useState([]);
    const [direccion, setDireccion] = useState('');
    const [preferencias, setPreferencias] = useState('');
    const [total, setTotal] = useState(0);
    const [pedidos, setPedidos] = useState([]);
    const [filtroDireccion, setFiltroDireccion] = useState('');

    const agregarProducto = (producto) => {
        setProductos([...productos, producto]);
        calcularTotal(producto.price);
    };
    

    const calcularTotal = (precio) => {
        setTotal(total + precio);
    };

    const confirmarPedido = () => {
        if (!direccion) {
            alert('Por favor, ingrese una dirección de entrega.');
            return;
        }    
        const nuevoPedido = new Order(productos, direccion, preferencias, total);
        setPedidos([...pedidos, nuevoPedido]);
        alert(`¡Pedido confirmado! Dirección: ${direccion}. Preferencias: ${preferencias}. Total a pagar: S/${total}`);
        limpiarPedido();
    };
    

    const limpiarPedido = () => {
        setProductos([]);
        setDireccion('');
        setPreferencias('');
        setTotal(0);
    };

    const pedidosFiltrados = pedidos.filter(pedido =>
        pedido.deliveryAddress.toLowerCase().includes(filtroDireccion.toLowerCase())
    );

    return (
        <div className="container">
            <div className="product-list">
                <h1>Productos Disponibles</h1>
                {predefinedProducts.map((producto, index) => (
                    <div key={index} className="product-item">
                        {producto.name} - S/{producto.price} <br />
                        <button onClick={() => agregarProducto(producto)}>Añadir Producto</button><p/>
                    </div>
                ))}
            </div>
            <div className="order-summary">
                <h2>Tu Pedido</h2>
                {productos.map((producto, index) => (
                    <div key={index} className="order-item">
                        {producto.name} - S/{producto.price}
                    </div>
                ))}
                <div className="total-amount">Total a Pagar: S/{total}</div>
            </div>
            <div className="order-form">
                <input
                    type="text"
                    placeholder="Dirección de Entrega"
                    value={direccion}
                    onChange={e => setDireccion(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Preferencias Especiales"
                    value={preferencias}
                    onChange={e => setPreferencias(e.target.value)}
                />
                <button onClick={confirmarPedido}>Confirmar Pedido</button><p/>
            </div>
            <div className="confirmed-orders">

            <input
            
                type="text"
                placeholder="Filtrar por Dirección"
                value={filtroDireccion}
                onChange={e => setFiltroDireccion(e.target.value)}
            />



                <h2>Pedidos Confirmados</h2>
                {pedidosFiltrados.map((pedido, index) => ( 
                <div key={index} className="confirmed-order-item">
                    <div>Dirección: {pedido.deliveryAddress}</div>
                    <div>Preferencias: {pedido.specialPreferences}</div>
                    <div>Total: S/{pedido.totalCost}<p/></div>
                    </div>
                ))}


            </div>
        </div>
    );
};

export default PedidoPage;
