import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();
import { auth } from "@clerk/nextjs/server";

export const fileRouter = {
  contextUploader: f({
    pdf: { maxFileCount: 1, maxFileSize: "16MB" },
  })
    .middleware(async () => {
      const { userId } = await auth();
      if (!userId) {
        throw new UploadThingError("Unauthorized");
      }
      console.log("uploadthing middleware hit");
      return { userId };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("upload complete on server");
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);
      return { uploadedBy: metadata.userId };
    }),
} satisfies FileRouter;
