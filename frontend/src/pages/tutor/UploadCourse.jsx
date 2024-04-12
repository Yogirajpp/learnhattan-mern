import React from 'react'
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select } from "@/components/ui/select"
const UploadCourse = () => {
  return (
    <div className='flex justify-center'>
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-2xl">Upload your course</CardTitle>
          <CardDescription>Fill in the information below to upload your course.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="course-name">Course Name</Label>
            <Input className="w-full max-w-sm" id="course-name" placeholder="Course Name" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course-tagline">Course Tagline</Label>
            <Input className="w-full max-w-sm" id="course-tagline" placeholder="Course Tagline" />
          </div>
          <div className="grid gap-2">
            <Label>Course Image</Label>
            <div className="flex items-center gap-4">

              <div className="grid gap-2">
                <Input placeholder="Enter Lighthouse Image Url"></Input>
                <p className="text-xs text-gray-500">Recommended image size is 1080x720 pixels.</p>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="course-description">Course Description</Label>
            <Textarea className="w-full max-w-sm" id="course-description" placeholder="Course Description" />
          </div>
          <div className="grid gap-2">
            <Label>Course Category</Label>
            <Select className="min-w-[200px]" defaultValue="web-dev" id="course-category">
              <Input className="w-full max-w-sm" placeholder='Enter category' />
            </Select>
          </div>
          <div className="grid gap-2">
            <Label className="text-base font-medium">Course Videos</Label>
            <div className="space-y-2">
              <div className="grid gap-2">
                <Label htmlFor="video-title-1">Video Title</Label>
                <Input id="video-title-1" placeholder="Introduction to the Course" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="video-link-1">Video Link</Label>
                <Input id="video-link-1" placeholder="Video Link" type="url" />
              </div>
            </div>
            <Button size="sm" variant="outline">
              Add Video
            </Button>
          </div>
        </CardContent>
        <CardFooter className="justify-end">
          <Button>Submit</Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default UploadCourse