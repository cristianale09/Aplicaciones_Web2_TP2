import { Router } from "express";
import { readFile } from "fs/promises";

const router = Router();

const fileSales = await readFile('./src/data/ventas.json', 'utf-8');
const sales = JSON.parse(fileSales);

// ✅ Obtener ventas por vendedor
router.get('/seller/:vendedor', (req, res) => {
    const vendedor = parseInt(req.params.vendedor, 10);

    const result = sales.filter(s => s.vendedor === vendedor);

    if (result.length > 0) {
        return res.json(result);
    }

    return res.status(404).json({ message: 'No hay ventas de ese vendedor' });
});

// ✅ Obtener venta por ID
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const sale = sales.find(s => s.id_venta === id);

    if (sale) return res.json(sale);

    return res.status(404).json({ message: 'Venta no encontrada' });
});

// ✅ Filtrar por rango de precios
router.post('/filter', (req, res) => {
    const { min, max } = req.body;

    if (min == null || max == null) {
        return res.status(400).json({ message: 'Faltan rangos de precio' });
    }

    const result = sales.filter(s =>
        s.total >= min && s.total <= max
    );

    res.json(result);
});

// ✅ Crear venta
router.post('/', (req, res) => {
    const { id_libro, vendedor, total, fecha } = req.body;

    if (!id_libro || !vendedor || !total || !fecha) {
        return res.status(400).json({ message: 'Faltan datos' });
    }

    const newSale = {
        id_venta: sales.length + 1,
        id_libro,
        vendedor,
        total,
        fecha
    };

    sales.push(newSale);

    res.status(201).json({
        message: 'Venta creada',
        sale: newSale
    });
});

// ✅ Actualizar venta
router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = sales.findIndex(s => s.id_venta === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Venta no encontrada' });
    }

    const { id_libro, vendedor, total, fecha } = req.body;

    if (id_libro) sales[index].id_libro = id_libro;
    if (vendedor) sales[index].vendedor = vendedor;
    if (total) sales[index].total = total;
    if (fecha) sales[index].fecha = fecha;

    res.json({
        message: 'Venta actualizada',
        sale: sales[index]
    });
});

// ✅ Eliminar venta
router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);

    const index = sales.findIndex(s => s.id_venta === id);

    if (index === -1) {
        return res.status(404).json({ message: 'Venta no encontrada' });
    }

    const deleted = sales.splice(index, 1);

    res.json({
        message: 'Venta eliminada',
        sale: deleted[0]
    });
});

export default router;