import { db } from '@/lib/db';
import Link from 'next/link';
import { Course } from '@prisma/client';


import { generateText } from 'ai';
import { google } from "@ai-sdk/google"

export default async function Home() {
  const courses: Course[] = await db.course.findMany();
  async function getWeather() {
    const weatherres = await fetch(
      'https://api.weather.gov/points/38.0293,-78.4767'
  );
  const weatherdata = await weatherres.json();
  const forecasturl = weatherdata.properties.forecast;
  
  const forecastres = await fetch(forecasturl);
  const forecastdata = await forecastres.json();
  const currentperiod = forecastdata.properties.periods[0];
  
   return currentperiod;
  }

  const currentperiod = await getWeather();
  const prompt = 'generate a short info greeting for tanmai based on the following information: ' +
    `it's ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}. ` +
    `the weather right now is ${JSON.stringify(currentperiod)} at uva.`;

  const {text} = await generateText({
    model: google('gemini-1.5-flash'),
    prompt
  });

  console.log(text.toLowerCase());
  return (
    <div>
      <nav>
        <p><span className="text-black/50">BELCH</span>,{" "}
        <Link href="/courses/manage">MANAGE COURSES</Link></p>
      </nav>
      <p className="mt-10">{text.toLowerCase()}</p>
      <p className='mt-4'>currently tracking {courses.length} courses:</p>
      <ul className='mt-1'>
        {courses.map((course) => (
          <li key={course.id}><Link className='underline' href={`/courses/${course.id}`}>{course.name}</Link></li>
        ))}
      </ul>
     
    </div>
  );
}
