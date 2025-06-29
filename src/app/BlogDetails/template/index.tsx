"use client";
import { useEffect, useState } from "react";
import { blogService } from '../../services/blog.service';
import { useParams } from "next/navigation";
import styles from "../blogs.module.css";
import LoadingIndicator from '../../components/LoadingIndicator';

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


    useEffect(() => {
        const fetchData = async () => { 
          try {
            console.log(id);
            const data = await blogService.getBlogById(id);
            setBlog(data);
          } catch (err) {
            console.log(err);
            setError(err.message);
          } finally {
            setLoading(false);
          }
        };
        fetchData();
      }, );
    
      if (loading) return <LoadingIndicator text="Loading blog..." />;

  return (
    <div className={styles.blogDetailContainer}>
      <h1 className={styles.blogDetailTitle}>{blog.title}</h1>
      <img src={blog.img} alt={blog.title} className={styles.blogDetailImg} />
      <div className={styles.blogDetailContent}>
        {/* If your blog content is HTML, use dangerouslySetInnerHTML */}
        {/* <div dangerouslySetInnerHTML={{ __html: blog.content }} /> */}
        <p>{blog.content}</p>
      </div>
    </div>
  );
}