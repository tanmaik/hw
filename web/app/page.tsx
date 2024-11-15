import { db } from "@/lib/db";
import Link from "next/link";
import { Course } from "@prisma/client";
import { Suspense } from "react";
import { generateText } from "ai";
import { google } from "@ai-sdk/google";
async function WeatherGreeting({ firstName }: { firstName: string }) {
  async function getLocation() {
    return new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
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
      console.log("using default UVA coordinates:", error);
    }

    const weatherres = await fetch(
      `https://api.weather.gov/points/${lat},${lon}`,
      { next: { revalidate: 3600 } }
    );
    const weatherdata = await weatherres.json();
    const forecasturl = weatherdata.properties.forecast;

    const forecastres = await fetch(forecasturl, {
      next: { revalidate: 3600 },
    });
    const forecastdata = await forecastres.json();
    const currentperiod = forecastdata.properties.periods[0];

    return {
      ...currentperiod,
      city: weatherdata.properties.relativeLocation.properties.city,
      state: weatherdata.properties.relativeLocation.properties.state,
    };
  }

  const currentperiod = await getWeather();
  const prompt =
    `generate a short info and fun greeting for ${firstName} based on the following information: ` +
    `it's ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()} (never mention the exact time, this is just so you can know the time of day). ` +
    `the weather right now is ${JSON.stringify(
      currentperiod
    )} (you may sometimes roughly mention the temperature, e.g. low 40s, high 80s) at ${
      currentperiod.city
    }, ${currentperiod.state}.`;

  const { text } = await generateText({
    model: google("gemini-1.5-flash"),
    prompt,
  });

  return <p className="mt-10">{text.toLowerCase()}</p>;
}

async function CourseList({ userId }: { userId: string }) {
  const courses: Course[] = await db.course.findMany({
    where: { userId },
  });

  return (
    <>
      <p className="mt-4">currently tracking {courses.length} courses:</p>
      <ul className="mt-1">
        {courses.map((course) => (
          <li key={course.id}>
            <Link className="underline" href={`/courses/${course.id}`}>
              {course.name}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}

import { auth, currentUser } from "@clerk/nextjs/server";

export default async function Home() {
  const { userId } = await auth();
  let user;
  if (userId) {
    user = await db.user.findFirst({
      where: { id: userId },
    });
    if (!user) {
      user = await db.user.create({
        data: {
          id: userId,
          phone: (await currentUser())?.phoneNumbers[0]?.phoneNumber ?? "",
          firstName: (await currentUser())?.firstName ?? "",
          lastName: (await currentUser())?.lastName ?? "",
        },
      });
    }
  } else {
    return;
  }

  return (
    <div>
      <nav>
        <p>
          <span className="text-black/50">BELCH</span>,{" "}
          <Link href="/courses/new">NEW COURSE</Link>
        </p>
      </nav>

      <Suspense fallback={<p className="mt-10">making coffee...</p>}>
        <WeatherGreeting firstName={user.firstName || ""} />
      </Suspense>

      <Suspense
        fallback={<p className="mt-4">rummaging through the courses...</p>}
      >
        <CourseList userId={userId} />
      </Suspense>
    </div>
  );
}
