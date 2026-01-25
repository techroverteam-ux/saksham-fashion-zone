import fs from 'fs';
import path from 'path';

const DB_PATH = path.join(process.cwd(), 'data', 'database.json');

export class DatabaseManager {
  static readDB() {
    try {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      return { products: [], users: [], categories: [], orders: [] };
    }
  }

  static writeDB(data) {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
      return true;
    } catch (error) {
      console.error('Database write error:', error);
      return false;
    }
  }

  static getProducts() {
    const db = this.readDB();
    return db.products || [];
  }

  static saveProduct(product) {
    const db = this.readDB();
    if (!db.products) db.products = [];
    
    const existingIndex = db.products.findIndex(p => p.id === product.id);
    if (existingIndex >= 0) {
      db.products[existingIndex] = product;
    } else {
      db.products.push(product);
    }
    
    return this.writeDB(db);
  }

  static deleteProduct(id) {
    const db = this.readDB();
    db.products = db.products.filter(p => p.id !== id);
    return this.writeDB(db);
  }

  static getCategories() {
    const db = this.readDB();
    return db.categories || [];
  }

  static saveCategory(category) {
    const db = this.readDB();
    if (!db.categories) db.categories = [];
    db.categories.push(category);
    return this.writeDB(db);
  }

  static getOrders() {
    const db = this.readDB();
    return db.orders || [];
  }

  static saveOrder(order) {
    const db = this.readDB();
    if (!db.orders) db.orders = [];
    db.orders.push(order);
    return this.writeDB(db);
  }
}

export default DatabaseManager;