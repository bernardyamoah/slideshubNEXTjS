import { formatTime } from '@/lib/functions';
import { Card, CardContent } from './ui/card';
import { CourseEdit } from './course-edit';


const CoursesCard: React.FC<CourseCardData> = ({
  name,
  timePosted,
  id,
  lecturer,
  year,
  credit,
  semester,
  courseCode,
  user_id,


}) => {
  const formattedTime = formatTime(timePosted);

  return (



    <Card

      className="relative block p-4 overflow-hidden border rounded-lg shadow-md sm:p-6 lg:p-8"
    >
      <span
        className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-emerald-600 to-emerald-700"
      ></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold capitalize sm:text-xl">
            {name}
          </h3>
          <div className="absolute flex justify-end flex-1 gap-1 text-xs text-gray-500 right-1 top-2 dark:text-gray-500/90">
            <CourseEdit name={name} id={id} />
          </div>
          <p className="mt-1 text-xs font-medium text-gray-600">Posted by  <span className=" text-accent-foreground">{user_id}</span></p>
        </div>

        {/* <div className="hidden sm:block sm:shrink-0">
          <img
            alt="Paul Clapton"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1180&q=80"
            className="object-cover w-16 h-16 rounded-lg shadow-sm"
          />
        </div> */}
      </div>


      <CardContent className='p-0'>
        <dl className="flex flex-wrap gap-4 mt-6 sm:gap-6 ">

          <div className="flex flex-col-reverse justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Semester</dt>
            <dd className="text-xs text-gray-500 capitalize">{semester}</dd>
          </div>
          <div className="flex flex-col-reverse justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Course Code</dt>
            <dd className="text-xs text-gray-500">{courseCode}</dd>
          </div>
          <div className="flex flex-col-reverse justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Lecturer</dt>
            <dd className="text-xs text-gray-500">{lecturer}</dd>
          </div>
          <div className="flex flex-col-reverse justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Year</dt>
            <dd className="text-xs text-gray-500">{year}</dd>
          </div>
          <div className="flex flex-col-reverse justify-between">
            <dt className="text-xs font-medium text-foreground-accent">Credit Hours</dt>
            <dd className="text-xs text-gray-500">{credit}</dd>
          </div>
        </dl>
      </CardContent>

    </Card>
  );
};

export default CoursesCard;
