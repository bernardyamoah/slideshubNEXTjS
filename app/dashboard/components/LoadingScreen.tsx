import Image from 'next/image';
import React from 'react';
import logodark from '@/assets/logo-icon-dark.png';
import logolight from '@/assets/logo-icon-light.png';
const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen inset-0 absolute z-10 text-base">
      <Image src={logolight} height={100} width={100} alt='loading' className='dark:hidden object-center object-cover animate-pulse duration-700' />
      <Image src={logodark} height={100} width={100} alt='loading' className='hidden dark:block object-center object-cover animate-pulse duration-700' />
      Loading...
    </div>
  );
};

export default LoadingScreen;