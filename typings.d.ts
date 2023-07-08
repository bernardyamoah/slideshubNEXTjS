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
	user_id:string | undefined;
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
	previewUrl:URL;
	user_id:string | undefined;
	
}

interface BooksData {
	name: string;
	user_id:string | undefined;
	bookcategory:string;
	size:string;
fileType:string;


}

interface Slides {
	$id: string;
	name: string;
	fileUrl: string;
	fileType:string;
	size:string
	courseId:string;
	user_id:string | undefined;
	previewUrl:URL;
	
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
	email: string;
	// Other user properties
  }

  interface SlidesCardProps {
	name: string;
  fileUrl:string
  user_id:string
	timePosted: string;
  }
  interface UserSlidesCardProps {
	name: string;
  fileUrl:string
  user_id:string
	timePosted: string;
	id:string;
	fileUrl: string;
	fileType:string;
	size:string;
	courseId:string;
	user_id:string | undefined;
	previewUrl:URL;
	
  }
  
  interface AuthNavProps {
	user: User | null;
  }
  interface UserNavProps {
	user: User | null;
  }
  interface User<Preferences> {
	$id: string;
	name: string;
	email: string;
	// Add any other properties specific to the User type
  }
  interface Preferences {
	theme: string;
	language: string;
	// Add any other preferences properties
  }
  type UserWithId = User<Preferences> & { id: string };

  interface SlideResponse {
	slides: Models.Document[];
	totalCount: number;
  }