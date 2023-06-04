import darklogo from "/assets/img/logo-icon-dark.png";
import lightlogo from "/assets/img/logo-icon-light.png";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
    return (
        <Link className="flex items-center space-x-2" href="/">
        <Image
            width={144}
            height={144}
            src={darklogo}
            className="logo_icon_dark"
            alt="logo"
        />

        <Image
            width={140}
            height={140}
            src={lightlogo}
            className="logo_icon_light"
            alt="logo"
        />
        <span className="logo_text">SlidesHub</span>
        <span className="h-1 w-1 rounded-full bg-emerald-500"></span>
    </Link>
    );
  };

  export default Logo;