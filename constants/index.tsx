import { CaretUpIcon, UpdateIcon } from "@radix-ui/react-icons";
import { Book, BookCopy, BookMarked, ClockIcon, File, FileStackIcon, GraduationCap, Home, LayoutDashboard, School, UserIcon } from "lucide-react";

  
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
      { label: 'Slide', path: '/dashboard/add-slide', icon: <File /> },
      { label: 'Book', path: '/dashboard/add-book' , icon: <BookMarked />},
      { label: 'Program', path: '/dashboard/add-program' ,icon: <GraduationCap />},
      { label: 'Course', path: '/dashboard/add-course',icon: <CaretUpIcon /> },
      {label:'Campus', path:'/dashboard/add-campus',icon: <School />}
    ];
    export const UsertabRoutes = [
      { label: 'Slide', path: '/dashboard/add-slide', icon: <File/> },
      { label: 'Book', path: '/dashboard/add-book' , icon: <Book />},
      
  
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

  export const EmptyUI:EmptyStateType=[
    {
      title:'Slides',
      label: "slides",
      image: "/undraw_empty_re_opql.svg",
    },
    {
      title:'Books',
      label: "books",
      image: "/no books.svg",
    },
    {
      title:'Courses',
      label: "courses",
      image: "/undraw_empty_re_opql.svg",
    },
    {
      title:'Programs',
      label: "programs",
      image: "/undraw_no_data_re_kwbl.svg",
    }

  ]