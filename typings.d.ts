interface CourseData {
	courseName: string;
	description: string;
	semester: string;
	courseCode: string;
	credit: string;
	lecturer: string;
	fileId: string;
	programId: string;
}
interface ProgramData {
	name: string;
	description: string;
	duration: string;
	image: string;
}
interface CampusData {
	name: string;
	location: string;
	image: string;
}

interface Image {
	bucketId: string;
	fileId: string;
}
