
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { blogPosts } from '../data/mockData';

const BlogPostPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const post = blogPosts.find(p => p.id === parseInt(id || ''));

    if (!post) {
        return <div className="text-center py-20">Blog post not found.</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-8">
                <Link to="/blog" className="text-gray-400 hover:text-white">&larr; Back to Blog</Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <p className="text-gray-400 mb-6">{post.date} by {post.author}</p>
            <div className="aspect-video rounded-lg overflow-hidden mb-8">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover"/>
            </div>
            <div className="prose prose-invert prose-lg max-w-none">
                <p>This is the full content of the blog post. In a real application, this would be rich text or Markdown content.</p>
                <p>{post.content}</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat.</p>
            </div>
        </div>
    );
};

export default BlogPostPage;
