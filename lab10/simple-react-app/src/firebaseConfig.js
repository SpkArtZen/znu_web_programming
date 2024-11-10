import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const expensesCollection = collection(db, 'expenses');

const addExpense = async (expense) => {
  try {
    const docRef = await addDoc(expensesCollection, expense);
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const getExpenses = async () => {
  const querySnapshot = await getDocs(expensesCollection);
  return querySnapshot.docs.map(doc => {
    const data = doc.data();
    return { id: doc.id, ...data, date: new Date(data.date) };
  });
};

const updateExpense = async (id, updatedExpense) => {
  const expenseDoc = doc(db, 'expenses', id);
  try {
    await updateDoc(expenseDoc, updatedExpense);
  } catch (e) {
    console.error("Error updating document: ", e);
  }
};

const deleteExpense = async (id) => {
  const expenseDoc = doc(db, 'expenses', id);
  try {
    await deleteDoc(expenseDoc);
  } catch (e) {
    console.error("Error deleting document: ", e);
  }
};

export { db, addExpense, getExpenses, updateExpense, deleteExpense };