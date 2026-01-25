import DatabaseManager from '../../utils/DatabaseManager';

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      try {
        const categories = DatabaseManager.getCategories();
        res.status(200).json(categories);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch categories' });
      }
      break;

    case 'POST':
      try {
        const category = req.body;
        const success = DatabaseManager.saveCategory(category);
        if (success) {
          res.status(200).json({ success: true });
        } else {
          res.status(500).json({ error: 'Failed to save category' });
        }
      } catch (error) {
        res.status(500).json({ error: 'Failed to save category' });
      }
      break;

    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}