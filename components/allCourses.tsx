import { formatTime } from '@/lib/functions';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
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
  level,

}) => {
  const formattedTime = formatTime(timePosted);

  return (


    <Card className=' rounded-lg p-4 shadow-md relative' >
      <CardHeader className=" pb-2 px-4 relative">
        <div className="text-gray-500  absolute top-2 right-0 text-xs flex-1  flex gap-1  dark:text-gray-500/90 justify-end">
          <CourseEdit name={name} id={id} />
        </div>
        <CardTitle className=" leading-2 tracking-wider capitalize text-sm ">
          {name.replace(/_/g, ' ').toLocaleLowerCase()}
        </CardTitle>

      </CardHeader>
      <CardContent  >


        <div className="text-xs text-muted-foreground flex gap-1">

          <p>{level}</p>
          <p>{year}</p>
          <p>{ courseCode}</p>
          <p>{ user_id}</p>
          <p>{ credit}</p>
          <p>Lecturer: {lecturer}</p>
        </div>

        <div className='text-xs text-muted-foreground flex gap-1'> {semester}</div>
        <div className="absolute bottom-0 left-0 text-gray-500   text-xs flex-1  flex gap-1  dark:text-gray-500/90 justify-end">

          {formattedTime}

        </div>




      </CardContent>
    </Card>
  );
};

export default CoursesCard;
