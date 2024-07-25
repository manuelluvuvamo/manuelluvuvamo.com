import { compareDesc } from 'date-fns';
import { allPosts } from 'contentlayer/generated';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PostCard from '@/components/posts';
import { WEBSITE_HOST_URL } from '@/lib/constants';
import { Metadata } from 'next';

const meta = {
  title: 'Blog',
  description: 'Read my articles',
  url: `${WEBSITE_HOST_URL}/about`,
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: meta.url,
  },
  twitter: {
    title: meta.title,
    description: meta.description,
  },
  alternates: {
    canonical: meta.url,
  },
}

export default function Home() {
  const posts = allPosts.sort((a, b) =>
    compareDesc(new Date(a.date), new Date(b.date))
  );

  return (
    <main className="min-h-screen">
      <Navbar />
      <section className="mb-20  flex flex-col items-center justify-between pt-5 lg:pt-20">
        <div className="max-w-4xl w-full container">
          <h2 className={`mb-1 text-3xl font-semibold text-left lg`}>Blog</h2>
          <div className="mt-10 flex flex-col text-left justify-start items-start lg:max-w-4xl lg:w-full lg:mb-0 lg:text-left p-0">
            {posts.map((post, idx) => (
              <PostCard key={idx} {...post} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
