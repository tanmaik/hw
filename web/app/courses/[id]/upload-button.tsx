"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function UploadClassContextButton({
  attachContext,
}: {
  attachContext: (fileUrl: string) => void;
}) {
  return (
    <div className="mt-2">
      <UploadButton
        endpoint="contextUploader"
        onClientUploadComplete={async (res) => {
          await attachContext(res[0].url);
        }}
        onUploadError={(error: Error) => {
          alert(`ERROR! ${error.message}`);
        }}
        content={{
          button({ ready }) {
            if (ready) return <div>pick the file</div>;
            return "getting ready...";
          },
          allowedContent: "pdf (1 file at a time) ",
        }}
        appearance={{
          button: {
            borderRadius: "0px",
            background: "none",
            color: "black",

            border: "1px solid black",
          },
          container: {
            display: "inline",
            margin: 0,

            padding: 0,
            justifyContent: "flex-start",
            width: "100%",
          },
        }}
      />
    </div>
  );
}
