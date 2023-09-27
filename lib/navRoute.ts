export const tabTriggers = [
    { value: 'slide', className: 'relative', label: 'Slides' },
    { value: 'book', className: 'relative', label: 'Books' },
    { value: 'program', className: 'relative', label: 'Programs', disabled: true },
    { value: 'course', className: 'relative', label: 'All Courses' },
  ]
  
//  Interface TabTriggers{

//     { value: string;
//       className: string;
//       label: string;
//       disabled: boolean;
//     }
//  }
    



  export const tabRoutes = [
    { label: 'Slide', path: '/add-slide' },
    { label: 'Book', path: '/add-book' },
    { label: 'Program', path: '/add-program' },
    { label: 'Course', path: '/add-course' },
    {label:'Campus', path:'/add-campus'}
  ];