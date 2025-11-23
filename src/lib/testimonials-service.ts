'use server';

import { db } from './firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';

export interface Testimonial {
    id: string;
    name: string;
    title: string;
    quote: string;
    avatar: string;
    imageHint: string;
}

export async function getTestimonials(): Promise<Testimonial[]> {
    try {
        const testimonialsCollection = collection(db, 'testimonials');
        const q = query(testimonialsCollection, orderBy('order', 'asc'));
        const testimonialsSnapshot = await getDocs(q);
        
        if (testimonialsSnapshot.empty) {
            return [];
        }

        return testimonialsSnapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                name: data.name || '',
                title: data.title || '',
                quote: data.quote || '',
                avatar: data.avatar || '',
                imageHint: data.imageHint || 'person portrait',
            };
        });
    } catch (error) {
        console.error("Error fetching testimonials from Firestore: ", error);
        // Return an empty array in case of an error to fallback to static data
        return [];
    }
}
