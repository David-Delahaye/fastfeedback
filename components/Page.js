import { NextSeo } from 'next-seo';

const Page = ({ children }) => {
  let path = '';
  if (typeof window !== 'undefined') path = window.location.pathname;
  const name = path.charAt(1).toUpperCase() + path.slice(2);
  const title = `Fast Feedback - ${name}`;
  const url = `https://https://fastfeedback-blush.vercel.app${path}`;
  return (
    <>
      <NextSeo title={title} canonical={url} openGraph={{ url, title }} />
      {children}
    </>
  );
};

export default Page;
