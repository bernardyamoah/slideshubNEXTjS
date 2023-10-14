import { UpdateIcon } from "@radix-ui/react-icons";
import { BookCopy, ClockIcon, FileStackIcon, Home, LayoutDashboard, School, UserIcon } from "lucide-react";
// NAVIGATION
// export const NAV_LINKS = [
//     { href: '/', key: 'home', label: 'Home' },
//     { href: '/', key: 'how_hilink_work', label: 'How Hilink Work?' },
//     { href: '/', key: 'services', label: 'Services' },
//     { href: '/', key: 'pricing ', label: 'Pricing ' },
//     { href: '/', key: 'contact_us', label: 'Contact Us' },
//   ];
  

  
  // FEATURES SECTION
  export const FEATURES = [
    {
      title: 'Reliable',
      icon: <ClockIcon className="w-8 h-8 text-white " />,
      variant: 'green',
      description:
        'Uploaded files are virus-checked, ensuring safe downloads.',
    },
    {
      title: "Brief",
            icon: <UpdateIcon className="w-8 h-8 text-white " />,
            description: "Books and lecture slides by lecturers will be uploaded here weekly.",
      variant: 'green',
    },
    {
     
      title: "Structured",
      icon: <FileStackIcon className="w-8 h-8 text-white " />,
      variant: 'green',
      description: "Essential books and slides are organized by program and year of study.",
    },
    {
      variant: 'orange',
     
      title: "Intuitive",
      icon: <UserIcon className="w-8 h-8 text-white " />,
      description: "Easily locate and download what you need hassle-free from Slideshub.",
    },
  ];
 
  export const FOOTER_CONTACT_INFO = {
    title: 'Contact Us',
    links: [
      { label: 'Admin Officer', value: '123-456-7890' },
      { label: 'Email Officer', value: 'hilink@akinthil.com' },
    ],
  };
  

  export const tabTriggers = [
      { value: 'slide', className: 'relative', label: 'Slides' },
      { value: 'book', className: 'relative', label: 'Books' },
      { value: 'program', className: 'relative', label: 'Programs', disabled: false },
      { value: 'course', className: 'relative', label: 'Courses' },
    ]
    export const AdmintabRoutes = [
      { label: 'Slide', path: '/dashboard/add-slide' },
      { label: 'Book', path: '/dashboard/add-book' },
      { label: 'Program', path: '/dashboard/add-program' },
      { label: 'Course', path: '/dashboard/add-course' },
      {label:'Campus', path:'/dashboard/add-campus'}
    ];
    export const UsertabRoutes = [
      { label: 'Slide', path: '/dashboard/add-slide' },
      { label: 'Book', path: '/dashboard/add-book' },
  
    ];
    export const sidebarRoutes = [
      { name: "Home", link: "/", icon: <Home /> },
      // {name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard />},
      { name: "Campus", link: "/campus", icon: <School /> },
      { name: "Books", link: "/books", icon: <BookCopy /> },
  
  
    ];
    export const UserSidebarRoutes = [
      { name: "Home", link: "/", icon: <Home /> },
      {name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard />},
      { name: "Campus", link: "/campus", icon: <School /> },
      { name: "Books", link: "/books", icon: <BookCopy /> },
  
  
    ];
   
    export const LevelTabItems = [
      {
        label: "Level 100",
        value: "Level 100",
      },
      {
        label: "Level 200",
        value: "Level 200",
      },
      {
        label: "Level 300",
        value: "Level 300",
      },
      {
        label: "Level 400",
        value: "Level 400",
      },
    ];