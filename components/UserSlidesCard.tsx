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
      <CardHeader className="flex flex-row items-start justify-center px-4 pb-2 space-y-0 ">
        <CardTitle className=" leading-2 tracking-wider capitalize text-sm  sm:max-w-[90%] ">
          {name.replace(/_/g, ' ').toLocaleLowerCase()}
        </CardTitle>
        <div className="flex justify-end flex-1 gap-1 text-xs text-gray-500 dark:text-gray-500/90">

          <PresetActions name={name} id={id} />
        </div>

      </CardHeader>
      <CardContent >

        <div className='flex items-center gap-4 mb-4'>

          <span className='text-xs text-muted-foreground'>  {formattedTime}</span>
          {/* <Link href={previewUrl} className='flex items-center gap-1 text-xs text-muted-foreground'><View className='w-4 h-4 text-muted-foreground'/>Preview</Link> */}
        </div>

        <div className="absolute bottom-0 flex items-center gap-1 p-2 text-xs rounded-sm text-gray-400/90 right-6 dark:text-gray-500/90 ">

          <aside className='flex justify-between gap-3 '>
            <div className="flex gap-1 text-xs text-muted-foreground">
              <FolderOpen className='w-4 h-4 text-muted-foreground' />  {size}
            </div>

            <div className='flex gap-1 text-xs text-muted-foreground'> <ShieldCheck className='w-4 h-4 text-muted-foreground' /><span className='text-xs text-muted-background'>{fileType}</span></div>
          </aside>
        </div>

      </CardContent>
    </Card>
  );
};

export default UserSlidesCard;
