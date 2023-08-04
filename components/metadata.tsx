import React from 'react';

interface HeaderProps {
  pageTitle: string;
  pageDescription: string;
  ogImage: string;
}

const Header: React.FC<HeaderProps> = ({ pageTitle, pageDescription, ogImage }) => {
  return (
    <>
      <meta name="description" content={pageDescription} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={ogImage} />
      <title>{pageTitle}</title>
    </>
  );
};

export default Header;
