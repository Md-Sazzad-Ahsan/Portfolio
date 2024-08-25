import { useRouter } from 'next/router';

const BlogPost = () => {
  const router = useRouter();
  const { category, blogName } = router.query;

  return (
    <div>
      <h1>{blogName}</h1>
      <p>Category: {category}</p>
      {/* Render the blog content here */}
    </div>
  );
};

export default BlogPost;
