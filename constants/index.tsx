import { CaretUpIcon, UpdateIcon } from "@radix-ui/react-icons";
import {
	Book,
	BookCopy,
	BookMarked,
	ClockIcon,
	File,
	FileStackIcon,
	GraduationCap,
	Home,
	LayoutDashboard,
	School,
	UserIcon,
} from "lucide-react";

//Page Size

// FEATURES SECTION
export const FEATURES = [
	{
		title: "Reliable",
		icon: <ClockIcon className="w-6 h-6 lg:w-8 lg:h-8 " />,
		description: "Uploaded files are virus-checked, ensuring safe downloads.",
	},
	{
		title: "Brief",
		icon: <UpdateIcon className="w-6 h-6 lg:w-8 lg:h-8 " />,
		description:
			"Books and lecture slides by lecturers will be uploaded here weekly.",
	},
	{
		title: "Structured",
		icon: <FileStackIcon className="w-6 h-6 lg:w-8 lg:h-8 " />,

		description:
			"Essential books and slides are organized by program and year of study.",
	},
	{
		title: "Intuitive",
		icon: <UserIcon className="w-6 h-6 lg:w-8 lg:h-8 " />,
		description:
			"Easily locate and download what you need hassle-free from Slideshub.",
	},
];

export const tabTriggers = [
	{
		value: "slide",
		className: "relative ",
		label: "Slides",
	},
	{
		value: "book",
		className: "relative  ",
		label: "Books",
	},
	{
		value: "program",
		className: "relative ",
		label: "Programs",
		disabled: false,
	},
	{
		value: "course",
		className: "relative ",
		label: "Courses",
	},
];
export const AdmintabRoutes = [
	{ label: "Slide", path: "/dashboard/add-slide", icon: <File /> },
	{ label: "Book", path: "/dashboard/add-book", icon: <BookMarked /> },
	{ label: "Program", path: "/dashboard/add-program", icon: <GraduationCap /> },
	{ label: "Course", path: "/dashboard/add-course", icon: <CaretUpIcon /> },
	{ label: "Campus", path: "/dashboard/add-campus", icon: <School /> },
];
export const UsertabRoutes = [
	{ label: "Slide", path: "/dashboard/add-slide", icon: <File /> },
	{ label: "Book", path: "/dashboard/add-book", icon: <Book /> },
];
export const sidebarRoutes = [
	{ name: "Home", link: "/", icon: <Home /> },
	{ name: "Campus", link: "/campus", icon: <School /> },
	{ name: "Books", link: "/books", icon: <BookCopy /> },
];
export const UserSidebarRoutes = [
	{ name: "Home", link: "/", icon: <Home /> },
	{ name: "Dashboard", link: "/dashboard", icon: <LayoutDashboard /> },
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

export const EmptyUI: EmptyStateType = [
	{
		title: "Slides",
		label: "slides",
		image: "/undraw_empty_re_opql.svg",
	},
	{
		title: "Books",
		label: "books",
		image: "/no books.svg",
	},
	{
		title: "Courses",
		label: "courses",
		image: "/undraw_empty_re_opql.svg",
	},
	{
		title: "Programs",
		label: "programs",
		image: "/undraw_no_data_re_kwbl.svg",
	},
];
export const Category = [
	{ id: "computer-science", label: "Computer Science" },
	{ id: "engineering", label: "Engineering" },
	{ id: "mathematics", label: "Mathematics" },
	{ id: "biology", label: "Biology" },
	{ id: "physics", label: "Physics" },
	{ id: "chemistry", label: "Chemistry" },
	{ id: "history", label: "History" },
	{ id: "literature", label: "Literature" },
	{ id: "art", label: "Art" },
	{ id: "psychology", label: "Psychology" },
	{ id: "business", label: "Business" },
	{ id: "medicine", label: "Medicine" },
	{ id: "law", label: "Law" },
	{ id: "environmental-science", label: "Environmental Science" },
	{ id: "economics", label: "Economics" },
	{ id: "political-science", label: "Political Science" },
	{ id: "sociology", label: "Sociology" },
	{ id: "philosophy", label: "Philosophy" },
	{ id: "geology", label: "Geology" },
	{ id: "astronomy", label: "Astronomy" },
	{ id: "languages", label: "Languages" },
	{ id: "music", label: "Music" },
	{ id: "education", label: "Education" },
	{ id: "social-work", label: "Social Work" },
	{ id: "nursing", label: "Nursing" },
	{ id: "architecture", label: "Architecture" },
	{ id: "design", label: "Design" },
	{ id: "anthropology", label: "Anthropology" },
	{ id: "public-health", label: "Public Health" },
	{ id: "statistics", label: "Statistics" },
	{ id: "finance", label: "Finance" },
	{ id: "marketing", label: "Marketing" },
	{ id: "management", label: "Management" },
	{ id: "chemical-engineering", label: "Chemical Engineering" },
	{ id: "electrical-engineering", label: "Electrical Engineering" },
	{ id: "mechanical-engineering", label: "Mechanical Engineering" },
	{ id: "civil-engineering", label: "Civil Engineering" },
	{ id: "environmental-engineering", label: "Environmental Engineering" },
	{ id: "robotics", label: "Robotics" },
	{ id: "data-science", label: "Data Science" },
	{ id: "graphic-design", label: "Graphic Design" },
	{ id: "environmental-studies", label: "Environmental Studies" },
	{ id: "criminal-justice", label: "Criminal Justice" },
	{ id: "biochemistry", label: "Biochemistry" },
	{ id: "religious-studies", label: "Religious Studies" },
	{ id: "theater", label: "Theater" },
	{ id: "urban-planning", label: "Urban Planning" },
	{ id: "health-sciences", label: "Health Sciences" },
	{ id: "nutrition", label: "Nutrition" },
	{ id: "oceanography", label: "Oceanography" },
	{ id: "sports-science", label: "Sports Science" },
];

export const TestimonialsData = [
	{
		name: "Vicentia Stephen",
		image:
			"https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		testimonial:
			"Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit delectus laudantium magnam totam accusantium officia cupiditate sit fuga nihil explicabo, quos s",
	},
	{
		name: "John Doe",
		image:
			"https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		testimonial: "This is a testimonial from John Doe.",
	},
	{
		name: "Jane Smith",
		image:
			"https://images.unsplash.com/photo-1488508872907-592763824245?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
		testimonial: "This is a testimonial from Jane Smith.",
	},
];

export const creditHours = [
	{
		id: "1",
		hour: "1",
	},
	{
		id: "2",
		hour: "2",
	},
	{
		id: "3",
		hour: "3",
	},
	{
		id: "4",
		hour: "4",
	},
];
export const Years = [
	{
		id: "level 100",
		level: "Level 100",
	},
	{
		id: "level 200",
		level: "Level 200",
	},
	{
		id: "level 300",
		level: "Level 300",
	},
	{
		id: "level 400",
		level: "Level 400",
	},
];

export const Semesters = [
	{
		id: "first semester",
		semester: "First Semester",
	},
	{
		id: "second semester",
		semester: "Second Semester",
	},
];
