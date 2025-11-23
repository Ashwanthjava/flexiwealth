'use server';

import { db } from './firebase';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';

export interface Stat {
    id: string;
    label: string;
    value: number;
    icon: string;
    order: number;
    unit?: string;
    prefix?: string;
}

export async function getStats(): Promise<Stat[]> {
    try {
        const statsCollection = collection(db, 'stats');
        const q = query(statsCollection, orderBy('order'));
        const statsSnapshot = await getDocs(q);
        
        const stats: Stat[] = statsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                label: data.label,
                value: data.value,
                icon: data.icon,
                order: data.order,
                unit: data.unit,
                prefix: data.prefix,
            };
        });

        return stats;
    } catch (error) {
        console.error("Error fetching stats from Firestore: ", error);
        // Return an empty array or throw the error, depending on desired error handling
        return [];
    }
}
