import { db } from '@/lib/db';
import Link from 'next/link';
import { Course } from '@prisma/client';
import { Suspense } from 'react';
import { generateText } from 'ai';
import { google } from "@ai-sdk/google"

async function WeatherGreeting() {
  async function getLocation() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
      }
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  }

  async function getWeather() {
    let lat = 38.0293;
    let lon = -78.4767;

    try {
      const position = await getLocation();
      lat = position.coords.latitude;
      lon = position.coords.longitude;
    } catch (error) {
      console.log('using default UVA coordinates:', error);
    }

    const weatherres = await fetch(
      `https://api.weather.gov/points/${lat},${lon}`
    );
    const weatherdata = await weatherres.json();
    const forecasturl = weatherdata.properties.forecast;
    
    const forecastres = await fetch(forecasturl);
    const forecastdata = await forecastres.json();
    const currentperiod = forecastdata.properties.periods[0];
    
    return {
      ...currentperiod,
      city: weatherdata.properties.relativeLocation.properties.city,
      state: weatherdata.properties.relativeLocation.properties.state
    };
  }

  const currentperiod = await getWeather();
  const prompt = 'generate a short info greeting for tanmai based on the following information: ' +
    `it's ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}. ` +
    `the weather right now is ${JSON.stringify(currentperiod)} at your location.`;

  const {text} = await generateText({
    model: google('gemini-1.5-flash'),
    prompt
  });

  return <p className="mt-10">{text.toLowerCase()}</p>;
}

async function CourseList() {
  const courses: Course[] = await db.course.findMany();
  
  return (
    <>
      <p className='mt-4'>currently tracking {courses.length} courses:</p>
      <ul className='mt-1'>
        {courses.map((course) => (
          <li key={course.id}><Link className='underline' href={`/courses/${course.id}`}>{course.name}</Link></li>
        ))}
      </ul>
    </>
  );
}

export default function Home() {
  return (
    <div>
      <nav>
        <p><span className="text-black/50">BELCH</span>,{" "}
        <Link href="/courses/new">NEW COURSE</Link></p>
      </nav>
      
      <Suspense fallback={<p className="mt-10">making coffee...</p>}>
        <WeatherGreeting />
      </Suspense>

      <Suspense fallback={<p className="mt-4">rummaging through the courses...</p>}>
        <CourseList />
      </Suspense>
    </div>
  );
}
