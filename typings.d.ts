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
	user_id:string
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
	user_id:string;
	
}

interface BooksData {
	name: string;
	user_id:string;
	fileId: string;
	image:string;


}

interface Slides {
	$id: string;
	name: string;
	fileUrl: string;
	fileType:string;
	size:string
	courseId:string
	
  }

  interface Program {
	$id: string;
	campusId: string;
	image: string;
	name: string;
	description: string;
	duration: string;
  }

  interface User {
	id: string;
	name?: string;
	// Other user properties
  }

  interface SlidesCardProps {
	name: string;
  fileUrl:string
  user_id:string
	timePosted: string;
  }
  