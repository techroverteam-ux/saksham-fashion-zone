import DatabaseManager from '../../utils/DatabaseManager';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const products = DatabaseManager.getProducts();
        res.status(200).json(products);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
      }
      break;

    case 'POST':
      try {
        const product = req.body;
        const success = DatabaseManager.saveProduct(product);
        if (success) {
          res.status(200).json({ success: true });
        } else {
          res.status(500).json({ error: 'Failed to save product' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to save product' });
      }
      break;

    case 'DELETE':
      try {
        const { id } = req.query;
        const success = DatabaseManager.deleteProduct(parseInt(id));
        if (success) {
          res.status(200).json({ success: true });
        } else {
          res.status(500).json({ error: 'Failed to delete product' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete product' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}