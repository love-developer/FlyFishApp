"use client";
import styles from "./blogs.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { blogService } from '../../services/blog.service';


export default function Blogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => { 
          try {
            const data = await blogService.getBlogs();
            setBlogs(data);
          } catch (err) {
            console.log(err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, []);
    
      if (loading) return <div className={styles.loader}>Loading blogs...</div>;


  return (
    <main className={styles.main}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle}>BLOGS</h1>
        </div>
      </section>

      {/* Blog Sections */}
      <div className={styles.content}>
        {blogs.map((section, idx) => (
          <div key={idx} className={styles.section}>
            <h2 className={styles.sectionTitle}>{section.title}</h2>
            <div className={styles.cardsGrid}>

              {blogs.map((blog, bidx) => (
                <div
                  key={blog.id}
                  className={styles.card}
                  onClick={() => router.push(`/BlogDetails/${blog.id}`)}
                  tabIndex={0}
                  role="button"
                >
                  <img src={blog.image} alt={blog.title} className={styles.cardImg} />
                  <div className={styles.cardBody}>
                    <div className={styles.cardBlogTitle}>{blog.title}</div>
                    <div className={styles.cardDesc}>{blog.desc}</div>
                    <button className={styles.readBtn}>Read blog</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}