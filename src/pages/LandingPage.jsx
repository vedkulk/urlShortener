import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
  const [longUrl, setlongUrl] = useState();
  const navigate = useNavigate()
  const handleShortURL = (e) => {
    e.preventDefault();
    if(longUrl) navigate(`/auth?=createNew=${longUrl}`)
  }
  return (
    <div className='flex flex-col items-center'>
      <h2 className='my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold'>The only URL shortener you will ever need! 👇</h2>
      <form onSubmit={handleShortURL} className='sm:h-14 flex flex-col sm:flex-row w-full md:w-2/4 gap-2'>
        <Input value={longUrl} onChange={(e)=>{setlongUrl(e.target.value)}} type="url" placeholder="Enter your URL" className="h-full flex-1 py-4 px-4"/>
        <Button className="h-full" type="submit"variant="destructive">Shorten!</Button>
      </form>
      <Accordion type="multiple" collapsible className='w-full p-20'>
        <AccordionItem value="item-1">
          <AccordionTrigger>How does it work?</AccordionTrigger>
          <AccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
    
  )
}

export default LandingPage