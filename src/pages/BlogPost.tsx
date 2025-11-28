import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, User, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { blogPosts } from '../data/mockData';
import { Button } from '../components/ui/Button';

export const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Post not found</h2>
        <Link to="/blog">
          <Button>Back to Blog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white pb-20">
      {/* Header */}
      <div className="relative h-[400px] md:h-[500px]">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="container mx-auto px-4 text-center text-white max-w-4xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-sm font-medium mb-6 border border-white/30">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            <div className="flex items-center justify-center gap-6 text-sm md:text-base text-gray-200">
              <div className="flex items-center gap-2">
                <User size={18} />
                {post.author}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={18} />
                {new Date(post.date).toLocaleDateString()}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl p-8 md:p-12">
          <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-8 transition-colors">
            <ArrowLeft size={16} className="mr-2" /> Back to Blog
          </Link>

          <div className="prose prose-lg max-w-none text-gray-600">
            <p className="lead text-xl text-gray-900 font-medium mb-8">
              {post.excerpt}
            </p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Why Sleep Matters</h3>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <blockquote className="border-l-4 border-gray-900 pl-6 italic my-8 text-gray-800 bg-gray-50 py-4 pr-4 rounded-r-lg">
              "Sleep is the best meditation." - Dalai Lama
            </blockquote>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
            <ul className="list-disc pl-6 space-y-2 my-6">
              <li>Consistent sleep schedule</li>
              <li>Optimized bedroom environment</li>
              <li>Comfortable mattress and pillows</li>
              <li>Relaxing pre-sleep routine</li>
            </ul>
            <p>
              Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
            </p>
          </div>

          <div className="border-t border-gray-100 mt-12 pt-8 flex items-center justify-between">
            <div className="font-medium text-gray-900">Share this article:</div>
            <div className="flex gap-4">
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                <Facebook size={20} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-400 transition-colors">
                <Twitter size={20} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors">
                <Linkedin size={20} />
              </button>
              <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
