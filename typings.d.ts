interface CourseData {
	name: string;
	semester: string;
	courseCode: string;
	credit: string;
	lecturer?: string;
	programId: string;
	year: string;
	user_id: string | undefined;
}

interface ProgramData {
	name: string;
	duration: string;
	image?: string;
	campusId: string;
}

interface CampusData {
	name: string;
	location: string;
	image?: string;
}

interface Image {
	bucketId: string;
	fileId: string;
}

interface SlidesData {
	fileUrl: string;
	name: string;
	size: string;
	fileType: string;
	previewUrl: URL;
	user_id: string | undefined;
}

interface BooksData {
	title: string;
	size: string;
	categories: string[];
	authors: string[];
	thumbnail: string;
	description: string;
	publisher: string;
	previewLink: string;
	downloadLink: string;
	pageCount: number;
	publishedDate: string;
	fileType: string;
	userId: string;
	uploadedBy: string;
	name: string;
}
interface Book {
	title: string;
	size?: string;
	categories: string[];
	authors: string[];
	thumbnail: string;
	description: string;
	publisher: string;
	previewLink: string;
	downloadLink?: string;
	pageCount: number;
	publishedDate: string;
	fileType?: string;
}

interface Slides {
	$id: string;
	$createdAt: string;
	name: string;
	fileUrl: string;
	fileType: string;
	size: string;
	courseId: string;
	user_id?: string | undefined;
	previewUrl: URL;
	programme?: string;
}

interface SlidesCardProps {
	name: string;
	fileUrl: string;
	user_id: string | undefined;
	timePosted: string | undefined;
	fileType: string;
	previewUrl: URL;
	fileType: string;
	size: string;
}

interface ProgramCardProps {
	$id: string;
	name: string;
	image: string;
	campusId: string;
	$createdAt: string;
	duration: string;
}
interface UserSlidesCardProps {
	name: string;
	timePosted: string;
	id: string;
	fileUrl: string;
	fileType: string;
	size: string;
	courseId: string;
	user_id?: string | undefined;
	previewUrl: URL;
}

type User<T> = {
	$id: string;
	name: string;
	email: string;
	labels?: string[];
	prefs: {};
	status: boolean;
	registration: string;
	emailVerification: boolean;
};
interface User extends Preferences {
	bio: string;
	avatarUrl: string;
	coverPhotoUrl: string;
	phoneNumber: string;
	country: string;
	countryFlagEmoji: string;
	profileImage: string;
	profileImageId: string;
}

interface UserProps {
	user: User | null | undefined;
}

interface UserNavProps {
	user: User | null;
}

interface SlideResponse {
	slides: Models.Document[];
	totalCount: number;
}
interface UserData {
	id?: string;
	name: string;
	email: string;
	labels?: string[];
	prefs: {
		bio: string;
		avatarUrl: string;
		coverPhotoUrl: string;
		phoneNumber: string;
		country: string;
		countryFlagEmoji: string; // Pass the countryIcon to the prefs object
		profileImage: string;
		profileImageId: string;
	};
	status: boolean;
	registration?: string;
	emailVerification: boolean;
}

interface ProfileData {
	id: string;
	name: string;
	email: string;

	prefs: {
		bio: string;
		avatarUrl: string;
		coverPhotoUrl: string;
		country: string;
		phoneNumber: string;
		countryFlagEmoji: string;
		profileImage: string;
		profileImageId: string;
		// Pass the countryIcon to the prefs object
		// Add more prefs properties as needed
	};
	status?: boolean;
	registration?: string;
	emailVerification?: boolean;
}

interface Campus {
	$id: string;
	name: string;
	location: string;
	image: string;
}

interface Program {
	$id: string;
	name: string;
	campusId: string;
	image: string;
	description: string;
	duration: string;
	$createdAt: string;
	$updatedAt: string;
	id?: string;
}

interface Course {
	$id: string;
	name: string;
	semester: string;
	courseCode: string;
	credit: string;
	lecturer: string;
	programId: string;
	year: string;
	user_id: string;
	$createdAt: string;
	campusId?: string;
}
interface CourseCardProps {
	course: Course;
	courses: Course[];
	setCourses: React.Dispatch<React.SetStateAction<Course[]>>;
}
interface CourseCardProps {
	course: {
		$id: string;
		name: string;
		semester: string;
		courseCode: string;
		credit: string;
		lecturer: string;
		programId: string;
		year: string;
		user_id: string;
		campusId?: string;
		courseId?: string;
		$createdAt: string;
	};
}
type CourseListProps = {
	programName: string;
	programId: string;
};

type CourseCardData = {
	id: string;
	name: string;
	semester: string;
	courseCode: string;
	credit: string;
	lecturer: string;
	programId: string;
	year: string;
	level: string;
	user_id: string | null;
	timePosted: string;
};
interface User {
	$id: string;
	name: string;
	email: string;
	labels?: string[];
	prefs: {};
	status: boolean;
	registration: string;
	emailVerification: boolean;
}
type EmptyStateType = {
	title: string;
	label: string;
	image: string;
}[];
