import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,

  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import { logOut } from '@/lib/functions'
import { useRouter } from "next/navigation";
export default function SideBar() {
  const router = useRouter();
  return (
    <Card className="fixed top-16 left-0 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 dark:bg-gray-900">
      <div className="mb-2 p-4 dark:text-white">
        <Typography variant="h5" color="blue-gray">
          Sidebar
        </Typography>
      </div>
      <List>
        <ListItem>
          <ListItemPrefix>
            <PresentationChartBarIcon className="h-5 w-5" />
          </ListItemPrefix>
          Dashboard
        </ListItem>


        
        <ListItem onClick={() => logOut(router)}>
          <ListItemPrefix>
            <PowerIcon className="h-5 w-5" />
          </ListItemPrefix>
          Log Out
        </ListItem>
      </List>
    </Card>
  );
}