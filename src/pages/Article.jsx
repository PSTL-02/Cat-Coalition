import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PageHeader from '../components/PageHeader';
import Seo from '../components/Seo';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Article = () => {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams(); // Fetch the article ID from the URL params

  useEffect(() => {
    // Fetch the article by ID
    axios
      .get(`${baseUrl}/articles/${id}?_embed`)
      .then((response) => {
        setPost(response.data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching article:", error));
  }, [id]);

  // Function to retrieve featured image
  const getFeaturedImage = (article) => {
    if (
      article &&
      article._embedded &&
      article._embedded['wp:featuredmedia'] &&
      article._embedded['wp:featuredmedia'][0]?.source_url
    ) {
      return article._embedded['wp:featuredmedia'][0].source_url;
    } else {
      return 'https://via.placeholder.com/150'; // Fallback placeholder image
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!post) {
    return <p>Article not found.</p>;
  }

  return (
    <>
      {/* SEO Component for Meta Tags */}
      <Seo
        title={post.yoast_head_json?.title || `${post.title.rendered} - Community Cat Coalition`}
        description={post.yoast_head_json?.description || "Learn more about this topic."}
        image={post.yoast_head_json?.og_image?.[0]?.url || getFeaturedImage(post)}
        url={window.location.href}
      />

      {/* Page Header */}
      <PageHeader title={post.title.rendered} image_url="/Header/Artical-header.png" />

      {/* Article Content */}
      <div className="single-container">
        <img src={getFeaturedImage(post)} alt={post.title.rendered} className="featured-image"/>
        <div key={post.slug} className="single-post-container">
          <div className="content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
        </div>
      </div>
    </>
  );
};

export default Article;
