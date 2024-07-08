// idb.js
import { openDB } from 'idb';

const DB_NAME = 'my-database';
const STORE_NAME = 'polygons';

export const initDB = async () => {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id_poligono' });
      }
    },
  });
};

export const savePolygonData = async (polygonData) => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.store.put(polygonData);
  await tx.done;
};

export const getPolygonData = async (id_poligono) => {
  const db = await initDB();
  return await db.get(STORE_NAME, id_poligono);
};

export const getAllPolygonData = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};
