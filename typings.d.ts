interface CourseData {
	name: string;
	semester: string;
	courseCode: string;
	credit: string;
	lecturer: string;
	fileId: string;
	programId: string;
}

interface ProgramData {
	name: string;

	duration: string;
	image: string;
	campusId:string;

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
