"use client"

import * as React from "react"

import { Edit, MoreHorizontal, Trash } from "lucide-react"

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


import { toast } from "@/components/ui/use-toast"
import { deleteSlide } from "@/lib/functions"
// import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"

import { Card } from "@/components/ui/card"
import AddSlides from "@/components/AddSlides"
import { Button, CardBody, CardHeader, Checkbox, Input, Typography,Dialog, DialogFooter, DialogHeader, CardFooter,  } from "@material-tailwind/react"
import { DialogContent, DialogTitle } from "@/components/ui/dialog"
interface PresetActionsProps {
    name: string;
    id: string;
    filetype:string;
  }
  
export function PresetActions({name, id,filetype}:PresetActionsProps) {






  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);
  
  // const [open, setIsOpen] = React.useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false)
  const [showUpdateDialog, setShowUpdateDialog] = React.useState(false)
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="border-none p-2 h-2">
            <span className="sr-only ">Actions</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={handleOpen}
          >
            <Edit className="mr-2 h-4 w-4" />
          Update File
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onSelect={() => setShowDeleteDialog(true)}
            className="!text-red-600 hover:!bg-red-200/10"
          >
            <Trash className="mr-2 h-4 w-4" />
            Delete File
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog
        
        open={open}
        handler={handleOpen}
        className="bg-transparent shadow-none w-full max-w-4xl p-2"
      >
        <Card className="mx-auto w-full !max-w-[24rem]">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign In
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input label="Email" size="lg" />
            <Input label="Password" size="lg" />
            <div className="-ml-2.5">
              <Checkbox label="Remember Me" />
            </div>
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="gradient" onClick={handleOpen} fullWidth>
              Sign In
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="#signup"
                variant="small"
                color="blue"
                className="ml-1 font-bold"
                onClick={handleOpen}
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </Dialog>























      {/* <Dialog open={open} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Content filter preferences</DialogTitle>
            <DialogDescription>
              The content filter flags text that may violate our content policy.
              It&apos;s powered by our moderation endpoint which is free to use
              to moderate your OpenAI API traffic. Learn more.
            </DialogDescription>
          </DialogHeader>
        <AddSlides/>
          <DialogFooter>
            <Button variant="secondary" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This file <span className="font-bold text-emerald-600">({name}.{filetype.toLocaleLowerCase()})</span> will no longer be
              accessible by you or others you&apos;ve shared it with.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Button
            
              onClick={() => {
                setShowDeleteDialog(false)
                deleteSlide(id)
                toast({
                  description: "This preset has been deleted.",
                })
              }}
            >
                
                    
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}