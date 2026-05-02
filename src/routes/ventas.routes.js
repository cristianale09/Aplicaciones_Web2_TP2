import { Router } from "express";
import { readFile, writeFile } from "fs/promises";

/*RUTAS DE USUARIOS*/
const fileUsers = await readFile('../data/users.json', 'utf-8');
const userdata = JSON.parse(fileUsers);

//Obtener venta por id_venta
app.get('/sales/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const sale = sales.find(s => s.id === id);

    if (sale) {
        return res.status(200).json(sale);
    } else {
        return res.status(404).json({ message: 'Venta no encontrada' });
    }
});

//Obtener ventas por vendedor
app.get('/sales/seller/:seller', (req, res) => {
    const seller = req.params.seller.toLowerCase();

    const result = sales.filter(s =>
        s.seller.toLowerCase() === seller
    );

    if (result.length > 0) {
        return res.status(200).json(result);
    } else {
        return res.status(404).json({ message: 'No hay ventas de ese vendedor' });
    }
});

//crear nueva venta
app.post('/sales', (req, res) => {
    const { product, seller, price, date } = req.body;

    if (!product || !seller || !price || !date) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const newSale = {
        id: sales.length + 1,
        product,
        seller,
        price,
        date
    };

    sales.push(newSale);

    res.status(201).json({
        message: 'Venta creada',
        sale: newSale
    });
});

//buscar venta por rango de precios
app.post('/sales/filter', (req, res) => {
    const { min, max } = req.body;

    if (min == null || max == null) {
        return res.status(400).json({ message: 'Faltan rangos de precio' });
    }

    const result = sales.filter(s =>
        s.price >= min && s.price <= max
    );

    res.status(200).json(result);
});

//actualizar venta por id_venta
app.put('/sales/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { product, seller, price, date } = req.body;

    const index = sales.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Venta no encontrada' });
    }

    if (product) sales[index].product = product;
    if (seller) sales[index].seller = seller;
    if (price) sales[index].price = price;
    if (date) sales[index].date = date;

    res.status(200).json({
        message: 'Venta actualizada',
        sale: sales[index]
    });
});

//eliminar venta por id_venta
app.delete('/sales/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = sales.findIndex(s => s.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Venta no encontrada' });
    }

    const deleted = sales.splice(index, 1);

    res.status(200).json({
        message: 'Venta eliminada',
        sale: deleted[0]
    });
});

//exportamos el router para poder usarlo en el index.js
export default router;