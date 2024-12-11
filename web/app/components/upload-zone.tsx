"use client";
import { UploadDropzone } from "@/utils/uploadthing";
export default function UploadZone() {
  return (
    <UploadDropzone
      endpoint="pdfUploader"
      onClientUploadComplete={(res) => {
        console.log("Files: ", res);
        alert("Upload Completed");
      }}
      onUploadError={(error: Error) => {
        // Do something with the error.
        alert(`ERROR! ${error.message}`);
      }}
    />
  );
}
