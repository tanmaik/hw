import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
export const ourFileRouter = {
  fileUploader: f({
    pdf: { maxFileCount: 1, maxFileSize: "16MB" },
    image: { maxFileCount: 1, maxFileSize: "16MB" },
  })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) {
        throw new UploadThingError("Unauthorized");
      }
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      await db.file.create({
        data: {
          url: file.url,
          userId: metadata.userId,
        },
      });
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
