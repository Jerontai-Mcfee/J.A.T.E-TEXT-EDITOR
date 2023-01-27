import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// found in classwork 26- stu manifest file
// 
export const putDb = async (id, content) => {
 console.log('PUT to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, main: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');
   const jateDb = await openDB('jate', 1);
   const tx = jateDb.transaction('jate', 'readonly');
   const store = tx.objectStore('jate');
   const request = store.getAll();
   const result = await request;
   console.log('result.value', result);
   return result;
 };

 export const postDb = async (content) => {
  console.log('Post to the database');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ jate: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
};

initdb();
