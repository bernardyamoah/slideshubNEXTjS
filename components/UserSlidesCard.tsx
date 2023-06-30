import { deleteSlide, formatTime } from '@/lib/functions';


import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

import { Clock, FolderOpen, ShieldCheck, Trash, View } from 'lucide-react';
import Link from 'next/link';
import { PresetActions } from '@/app/dashboard/components/preset-actions';
import { Separator } from './ui/separator';



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
  <CardTitle className=" font-medium capitalize text-sm">
  {name} 
  </CardTitle>
  <PresetActions name={name} id={id} filetype={fileType}/>

</CardHeader>
<CardContent >

<div className='flex items-center mb-4 gap-4'>

<aside className='flex gap-1 justify-between w-full '>
<div className="text-xs text-muted-foreground flex gap-1">
<FolderOpen className='h-4 w-4 text-muted-foreground'/>  {size}
</div>

<div className='text-xs text-muted-foreground flex gap-1'> <ShieldCheck className='h-4 w-4 text-muted-foreground'/><span className='text-xs'>{fileType}</span></div>
</aside>
{/* <Link href={previewUrl} className='text-muted-foreground flex gap-1 items-center text-xs'><View className='w-4 h-4 text-muted-foreground'/>Preview</Link> */}
</div>
<Separator/>
<div className="justify-end text-xs text-muted-foreground pt-2 flex gap-1 bottom-0 relative right-0 text-blue-700">
<Clock className='h-4 w-4 text-muted-foreground text-amber-700'/>  {formattedTime}
</div>

</CardContent>
</Card>
  );
};

export default UserSlidesCard;
