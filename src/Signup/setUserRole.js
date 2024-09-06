// src/utils/setUserRole.js

import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase'; 

const setUserRole = async (user, role) => {
  try {
    const userRef = doc(db, 'users', user.uid);

    await setDoc(userRef, { role }, { merge: true });

    console.log(`Role ${role} assigned to user ${user.email}`);
  } catch (error) {
    console.error('Error setting user role:', error);
  }
};

export default setUserRole;
