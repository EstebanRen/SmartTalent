import {
  CollectionReference,
  DocumentData,
  QueryConstraint,
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore/lite';
import { firebaseDb } from '../config/firebase.config';
import { from, map } from 'rxjs';
import { FirebaseTables } from '../enums/firebase-tables.enum';

export class FirebaseService<T> {

  constructor(protected tableName: FirebaseTables) {}

  public db = {
    create: (data: Omit<T, 'id'>) => {
      const docRef = addDoc(collection(firebaseDb, this.tableName), {
        ...data,
      });
      return from(docRef);
    },

    delete: (id: string) => {
      const deletePromise = deleteDoc(
        doc(firebaseDb, `${this.tableName}/${id}`)
      );
      return from(deletePromise);
    },
    update: (id: string, data: T) => {
      const ref = doc(firebaseDb, `${this.tableName}/${id}`);
      const updatePromise = updateDoc(ref, {
        ...data,
        id,
      });

      return from(updatePromise);
    },

    all: (extraFilters?: QueryConstraint[]) => {
      const q = extraFilters
        ? query(collection(firebaseDb, this.tableName), ...extraFilters)
        : query(collection(firebaseDb, this.tableName));

      return from(getDocs(q)).pipe(
        map((querySnapshot) => {
          return querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as T)
          );
        })
      );
    },

    findByParam: (key: keyof T, valueToCompare: unknown) => {
      const q = query(
        collection(firebaseDb, this.tableName),
        where(key as string, '==', valueToCompare)
      );

      const dataList = from(getDocs(q)).pipe(
        map((querySnapshot) => {
          return querySnapshot.docs.map(
            (doc) =>
              ({
                id: doc.id,
                ...doc.data(),
              } as T)
          );
        })
      );

      return dataList;
    },

    findById: (id: string) => {
      const ref = doc(firebaseDb, `${this.tableName}/${id}`);

      return from(getDoc(ref)).pipe(
        map((docSnap) => {
          return { id: docSnap.id, ...docSnap.data() } as T;
        })
      );
    },
  };
}

