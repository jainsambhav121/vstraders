
import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/mockData';

const BlogPage: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center mb-12">VSTRADERS Blog</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogPosts.map(post => (
                    <div key={post.id} className="bg-white/5 backdrop-blur-md rounded-lg overflow-hidden border border-white/10 flex flex-col group">
                        <div className="aspect-video overflow-hidden">
                           <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                            <p className="text-sm text-gray-400">{post.date} by {post.author}</p>
                            <h2 className="text-2xl font-bold mt-2 mb-4 flex-grow">{post.title}</h2>
                            <p className="text-gray-300 mb-6">{post.excerpt}</p>
                            <Link to={`/blog/${post.id}`} className="mt-auto self-start bg-white text-black font-bold py-2 px-6 rounded-full hover:bg-gray-200 transition-colors">
                                Read More
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogPage;
