interface CourseData {
	name: string;
	semester: string;
	courseCode: string;
	credit: string;
	lecturer: string;
	fileId: string;
	image:string;
	programId: string;
	year:string
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

interface SlidesData {
	fileUrl:string;
	name:string;
	size:string;
	fileType:string;

	
}

interface BooksData {
	name: string;
	
	fileId: string;
	image:string;


}

interface Slides {
	$id: string;
	name: string;
	fileUrl: string;
	fileType:string;
	size:string
  }