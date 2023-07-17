import Image from 'next/image';
import React from 'react';
import logodark from '@/assets/img/logo-icon-dark.png';
import logolight from '@/assets/img/logo-icon-light.png';
const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
    <Image src={logolight} height={200} width={200} alt='loading' className='dark:hidden object-center object-cover animate-pulse duration-700'/>
    <Image src={logodark} height={200} width={200} alt='loading' className='hidden dark:block object-center object-cover animate-pulse duration-700'/>
    </div>
  );
};

export default LoadingScreen;