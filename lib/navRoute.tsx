import { BookCopy, Home, LayoutDashboard, School } from "lucide-react";

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
 