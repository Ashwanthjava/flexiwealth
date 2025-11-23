'use server';

import { db } from './firebase';
import { collection, getDocs, query } from 'firebase/firestore';

export interface StatValue {
    id: string;
    value: number;
}

// This function now fetches only the ID and value for each stat.
export async function getStatValues(): Promise<Map<string, number>> {
    try {
        const statsCollection = collection(db, 'stats');
        const q = query(statsCollection);
        const statsSnapshot = await getDocs(q);
        
        const statValues = new Map<string, number>();
        statsSnapshot.docs.forEach(doc => {
            const data = doc.data();
            // We use the document ID (e.g., 'families-served') as the key
            statValues.set(doc.id, data.value);
        });

        return statValues;
    } catch (error) {
        console.error("Error fetching stat values from Firestore: ", error);
        // Return an empty map in case of an error
        return new Map<string, number>();
    }
}
