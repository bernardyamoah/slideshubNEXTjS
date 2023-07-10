import { deleteSlide, formatTime } from '@/lib/functions';


import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { Clock, FolderOpen, ShieldCheck, Trash, View } from 'lucide-react';

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


<Card  className='relative ' >
<CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2 gap-2">
  <CardTitle className=" leading-2 tracking-wider capitalize text-sm">
  {name.replace(/_/g, ' ').toLocaleLowerCase()}
  </CardTitle>
  <PresetActions name={name} id={id} filetype={fileType}/>

</CardHeader>
<CardContent >

<div className='flex items-center mb-4 gap-4'>

<aside className='flex gap-3 justify-between  '>
<div className="text-xs text-muted-foreground flex gap-1">
<FolderOpen className='h-4 w-4 text-muted-foreground'/>  {size}
</div>

<div className='text-xs text-muted-foreground flex gap-1'> <ShieldCheck className='h-4 w-4 text-muted-foreground'/><span className='text-xs'>{fileType}</span></div>
</aside>
{/* <Link href={previewUrl} className='text-muted-foreground flex gap-1 items-center text-xs'><View className='w-4 h-4 text-muted-foreground'/>Preview</Link> */}
</div>

<div className="text-gray-400/90  items-center text-xs  p-2 flex gap-1 bottom-0 absolute right-6 rounded-sm dark:text-gray-500/90 ">
  <span className=' text-base'>&#xB7;</span> 
  {formattedTime}
</div>

</CardContent>
</Card>
  );
};

export default UserSlidesCard;
