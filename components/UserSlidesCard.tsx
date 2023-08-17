import { formatTime } from '@/lib/functions';


import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { FolderOpen, ShieldCheck, } from 'lucide-react';

import { PresetActions } from '@/app/dashboard/components/preset-actions';




const UserSlidesCard: React.FC<UserSlidesCardProps> = ({
  name,
  id,
  timePosted,
  previewUrl,
  size,
  fileType

}) => {
  const formattedTime = formatTime(timePosted);

  return (


    <Card className='relative ' >
      <CardHeader className="flex flex-row items-start justify-center space-y-0 pb-2 px-4 ">
        <CardTitle className=" leading-2 tracking-wider capitalize text-sm max-w-[58%] sm:max-w-[65%] ">
          {name.replace(/_/g, ' ').toLocaleLowerCase()}
        </CardTitle>
        <div className="text-gray-500   text-xs flex-1  flex gap-1  dark:text-gray-500/90 justify-end">
          <span className=' bg-gray-400/90 text-base w-1 h-1 rounded-full dark:bg-gray-500/90 inline-flex self-center'></span>
          {formattedTime}
          <PresetActions name={name} id={id} />
        </div>

      </CardHeader>
      <CardContent >

        <div className='flex items-center mb-4 gap-4'>


          {/* <Link href={previewUrl} className='text-muted-foreground flex gap-1 items-center text-xs'><View className='w-4 h-4 text-muted-foreground'/>Preview</Link> */}
        </div>

        <div className="text-gray-400/90  items-center text-xs  p-2 flex gap-1 bottom-0 absolute right-6 rounded-sm dark:text-gray-500/90 ">

          <aside className='flex gap-3 justify-between  '>
            <div className="text-xs text-muted-foreground flex gap-1">
              <FolderOpen className='h-4 w-4 text-muted-foreground' />  {size}
            </div>

            <div className='text-xs text-muted-foreground flex gap-1'> <ShieldCheck className='h-4 w-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{fileType}</span></div>
          </aside>
        </div>

      </CardContent>
    </Card>
  );
};

export default UserSlidesCard;
