"use client";

import {
  ChangeEvent,
  useRef,
  useState,
} from "react";

import {
  Camera,
  Check,
  Loader2,
  Upload,
  Video,
  X,
} from "lucide-react";

import {
  createPublicSupabaseClient,
} from "@/lib/supabase/public-client";

type UploadMomentProps = {
  eventId?: string | null;
};

function getExtension(
  file: File,
) {
  const fromName =
    file.name
      .split(".")
      .pop()
      ?.toLowerCase();

  if (
    fromName &&
    fromName.length <= 5
  ) {
    return fromName;
  }

  if (
    file.type ===
    "image/jpeg"
  ) {
    return "jpg";
  }

  if (
    file.type ===
    "image/png"
  ) {
    return "png";
  }

  if (
    file.type ===
    "image/webp"
  ) {
    return "webp";
  }

  if (
    file.type ===
    "video/mp4"
  ) {
    return "mp4";
  }

  return "bin";
}

export default function UploadMoment({
  eventId,
}: UploadMomentProps) {
  const inputRef =
    useRef<HTMLInputElement>(
      null,
    );

  const [file, setFile] =
    useState<File | null>(
      null,
    );

  const [previewUrl, setPreviewUrl] =
    useState<string | null>(
      null,
    );

  const [guestName, setGuestName] =
    useState("");

  const [caption, setCaption] =
    useState("");

  const [uploading, setUploading] =
    useState(false);

  const [submitted, setSubmitted] =
    useState(false);

  const [error, setError] =
    useState<string | null>(
      null,
    );

  function resetFile() {
    if (previewUrl) {
      URL.revokeObjectURL(
        previewUrl,
      );
    }

    setFile(null);
    setPreviewUrl(null);

    if (inputRef.current) {
      inputRef.current.value =
        "";
    }
  }

  function chooseFile(
    event: ChangeEvent<HTMLInputElement>,
  ) {
    const selected =
      event.target.files?.[0];

    if (!selected) {
      return;
    }

    setError(null);
    setSubmitted(false);

    const isImage =
      selected.type.startsWith(
        "image/",
      );

    const isVideo =
      selected.type.startsWith(
        "video/",
      );

    if (
      !isImage &&
      !isVideo
    ) {
      setError(
        "Please choose a photo or video.",
      );
      return;
    }

    const maxSize =
      isVideo
        ? 50 * 1024 * 1024
        : 12 * 1024 * 1024;

    if (
      selected.size >
      maxSize
    ) {
      setError(
        isVideo
          ? "Videos can be up to 50 MB."
          : "Photos can be up to 12 MB.",
      );

      return;
    }

    resetFile();

    setFile(selected);

    setPreviewUrl(
      URL.createObjectURL(
        selected,
      ),
    );
  }

  async function submit() {
    if (!file) {
      setError(
        "Choose a photo or video first.",
      );
      return;
    }

    setUploading(true);
    setError(null);

    try {
      const supabase =
        createPublicSupabaseClient();

      const mediaType =
        file.type.startsWith(
          "video/",
        )
          ? "video"
          : "photo";

      const extension =
        getExtension(file);

      const fileId =
        crypto.randomUUID();

      const directory =
        eventId ??
        "general";

      const storagePath =
        `guest/${directory}/` +
        `${Date.now()}-${fileId}.${extension}`;

      const {
        error:
          uploadError,
      } = await supabase.storage
        .from(
          "wedding-media",
        )
        .upload(
          storagePath,
          file,
          {
            contentType:
              file.type,
            cacheControl:
              "3600",
            upsert: false,
          },
        );

      if (uploadError) {
        console.error(
          uploadError,
        );

        throw new Error(
          "Upload failed. Please try again.",
        );
      }

      const {
        data:
          publicUrlData,
      } = supabase.storage
        .from(
          "wedding-media",
        )
        .getPublicUrl(
          storagePath,
        );

      const response =
        await fetch(
          "/api/live/media",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body:
              JSON.stringify({
                eventId:
                  eventId ??
                  null,

                mediaType,

                mediaUrl:
                  publicUrlData
                    .publicUrl,

                guestName:
                  guestName.trim() ||
                  null,

                caption:
                  caption.trim() ||
                  null,
              }),
          },
        );

      const data =
        await response.json();

      if (!response.ok) {
        throw new Error(
          data.error ??
            "Unable to submit your moment.",
        );
      }

      setSubmitted(true);

      setGuestName("");
      setCaption("");

      resetFile();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Unable to upload your moment.",
      );
    } finally {
      setUploading(false);
    }
  }

  if (submitted) {
    return (
      <section className="px-5 py-8 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-xl border-y border-[#35151c]/10 py-12 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-[#b99155]/40">
            <Check
              size={20}
              className="text-[#8e4438]"
            />
          </div>

          <h2 className="font-display mt-6 text-3xl tracking-[-0.04em] text-[#35151c]">
            Moment received.
          </h2>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#76686a]">
            It will appear on the
            wedding wall once the
            family approves it.
          </p>

          <button
            type="button"
            onClick={() =>
              setSubmitted(
                false,
              )
            }
            className="mt-7 min-h-11 rounded-full border border-[#35151c]/20 px-6 text-sm text-[#35151c]"
          >
            Share another moment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-5 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-xl">
        <p className="text-center text-[9px] uppercase tracking-[0.28em] text-[#b45e43]">
          From your camera roll
        </p>

        <h2 className="font-display mt-4 text-center text-4xl tracking-[-0.045em] text-[#35151c] sm:text-5xl">
          Add your moment.
        </h2>

        <p className="mx-auto mt-4 max-w-sm text-center text-sm leading-6 text-[#76686a]">
          Share a photo or video
          from the celebration.
        </p>

        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          onChange={
            chooseFile
          }
          className="hidden"
        />

        {!file ? (
          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            className="mt-8 flex min-h-40 w-full flex-col items-center justify-center rounded-[26px] border border-dashed border-[#b99155]/60 bg-white/40 px-6 transition hover:bg-white/70"
          >
            <div className="flex gap-3 text-[#8e4438]">
              <Camera
                size={22}
              />

              <Video
                size={22}
              />
            </div>

            <span className="mt-4 text-sm font-medium text-[#35151c]">
              Choose photo or video
            </span>

            <span className="mt-2 text-xs text-[#76686a]">
              Photos up to 12 MB ·
              Videos up to 50 MB
            </span>
          </button>
        ) : (
          <div className="relative mt-8 overflow-hidden rounded-[26px] bg-[#261b1d]">
            {file.type.startsWith(
              "video/",
            ) ? (
              <video
                src={
                  previewUrl ??
                  undefined
                }
                controls
                playsInline
                className="max-h-[520px] w-full object-contain"
              />
            ) : (
              // blob preview, so regular img is intentional.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={
                  previewUrl ??
                  undefined
                }
                alt="Selected wedding moment"
                className="max-h-[520px] w-full object-contain"
              />
            )}

            <button
              type="button"
              onClick={
                resetFile
              }
              aria-label="Remove selected file"
              className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur"
            >
              <X
                size={18}
              />
            </button>
          </div>
        )}

        <div className="mt-7 space-y-5">
          <div>
            <label
              htmlFor="guestName"
              className="text-xs font-medium text-[#35151c]"
            >
              Your name
            </label>

            <input
              id="guestName"
              value={
                guestName
              }
              onChange={(
                event,
              ) =>
                setGuestName(
                  event.target
                    .value,
                )
              }
              maxLength={120}
              placeholder="Optional"
              className="mt-2 w-full rounded-xl border border-[#35151c]/15 bg-white/50 px-4 py-3 outline-none focus:border-[#b99155]"
            />
          </div>

          <div>
            <label
              htmlFor="caption"
              className="text-xs font-medium text-[#35151c]"
            >
              Say something
            </label>

            <textarea
              id="caption"
              rows={3}
              value={caption}
              maxLength={500}
              onChange={(
                event,
              ) =>
                setCaption(
                  event.target
                    .value,
                )
              }
              placeholder="Optional"
              className="mt-2 w-full resize-none rounded-xl border border-[#35151c]/15 bg-white/50 px-4 py-3 outline-none focus:border-[#b99155]"
            />
          </div>

          {error && (
            <p className="text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="button"
            disabled={
              !file ||
              uploading
            }
            onClick={submit}
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-[#35151c] px-6 text-sm font-medium text-[#f8efe7] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {uploading ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />

                Uploading
              </>
            ) : (
              <>
                <Upload
                  size={17}
                />

                Share moment
              </>
            )}
          </button>

          <p className="text-center text-[11px] leading-5 text-[#8d7c7e]">
            Guest submissions are
            reviewed before they
            appear publicly.
          </p>
        </div>
      </div>
    </section>
  );
}