// services/blogsService.js

import { db } from '../../utils/firebase'; // make sure this exports your initialized Firestore instance
import {
    collection,
    doc,
    getDocs,
    getDoc,
  } from 'firebase/firestore';
  import {BlogModel } from '../../utils/models/blog.model';



class BlogsService {

    private ref = collection(db, 'blogs').withConverter<BlogModel>({
        fromFirestore: (snapshot) => BlogModel.fromJson({ id: snapshot.id, ...snapshot.data() }),
        toFirestore: (value: BlogModel) => value.toJson(),
      });

  // Get all blogs
  async getBlogs() {
    try {
      const snapshot = await getDocs(this.ref);
      const blogs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt ?? null,
      }));

      return blogs;
    } catch (error) {
      console.error('Error fetching blogs:', error);
      throw new Error('Error fetching blogs');
    }
  }

  // Get a single blog by ID
  async getBlogById(id) {
    try {
      const docRef = doc(this.ref, id);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        throw new Error('Blog not found');
      }

      return {
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt ?? null,
      };
    } catch (error) {
      console.error(`Error fetching blog with id ${id}:`, error);
      throw new Error('Error fetching blog');
    }
  }
}


export const blogService = new BlogsService();
