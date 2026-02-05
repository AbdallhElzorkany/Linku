"use client";
import { Profile } from "@/lib/types/profile";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import Image from "next/image";
import { User, Mail, Upload, Save, Check, X, AlertCircle } from "lucide-react";
import { Spinner } from "./ui/spinner";
import { supabase } from "@/lib/supabase/client";
import { DeleteAccountDialog } from "./DeleteAccountDialog";
type FormData = {
  email: string;
  username: string;
  bio: string;
  display_name: string;
  avatar_url: string;
};
export default function ProfileComponent({ profile }: { profile: Profile }) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    setError,
    formState: { errors, isSubmitting, isSubmitted },
  } = useForm<FormData>({
    defaultValues: {
      email: profile.email,
      username: profile.username,
      bio: profile.bio,
      display_name: profile.display_name,
      avatar_url: profile.avatar_url,
    },
  });
  const bio = watch("bio");

  const [pic, setPic] = useState<{
    file: File | null;
    uploading: boolean;
    error: string;
  }>({
    file: null,
    uploading: false,
    error: "",
  });
  const ref = useRef<HTMLInputElement>(null);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const [, { error }] = await Promise.all([
      supabase.storage
        .from("Profile Picture")
        .remove([
          `${profile.username}/${profile.avatar_url?.split("/").pop()}`,
        ]),

      supabase
        .from("profiles")
        .update({
          bio: data.bio,
          display_name: data.display_name,
          avatar_url: data.avatar_url,
        })
        .eq("id", profile.id),
    ]);
    if (error) {
      setError("root", { type: "server", message: error.message });
    }
  };
  useEffect(() => {
    const picUpload = async () => {
      if (!pic.file) return;
      setPic((prev) => ({ ...prev, uploading: true, error: "" }));
      const { data, error } = await supabase.storage
        .from("Profile Picture")
        .upload(`${profile.username}/${pic.file.name}`, pic.file, {
          upsert: true,
        });

      setValue(
        "avatar_url",
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${data?.fullPath}`,
      );
      setPic((prev) => ({
        ...prev,
        uploading: false,
        error: error?.message || "",
      }));
    };
    picUpload();
  }, [pic.file, profile.username, profile.avatar_url, setValue]);
  return (
    <div className=" not-md:mt-10 py-10 px-6   not-md:max-w-2xl lg:max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="text-4xl mb-2">Profile Settings</h1>
        <p className="text-gray-600 text-lg">
          Customize your linku profile and appearance
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-neutral-800 to-gray-800 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            Profile Picture
          </h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="relative">
              <Image
                src={
                  pic.file
                    ? URL.createObjectURL(pic.file)
                    : profile.avatar_url
                      ? profile.avatar_url
                      : "/pic.jpg"
                }
                alt="Profile Picture"
                width={128}
                height={128}
                className="size-32 aspect-square object-cover rounded-full border-2 border-neutral-800 shadow-2xl"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              {pic.error && (
                <p className="text-sm text-red-500 mb-1">{pic.error}</p>
              )}
              <input
                type="file"
                ref={ref}
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    setPic((prev) => ({
                      ...prev,
                      file: file,
                    }));
                }}
                accept="image/*"
              />
              <button
                type="button"
                onClick={() => ref.current?.click()}
                disabled={pic.uploading || isSubmitting}
                className="flex items-center disabled:cursor-not-allowed gap-2 cursor-pointer px-6 py-3 bg-linear-to-r from-neutral-800 to-gray-800 text-white rounded-xl hover:shadow-lg hover:shadow-neutral-500/40 transition-all hover:scale-105 mb-3"
              >
                {pic.uploading ? (
                  <>
                    <Spinner className="w-4 h-4" />
                    Uploading
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Change Photo
                  </>
                )}
              </button>
              <p className="text-sm text-gray-500">JPG, PNG or GIF</p>
            </div>
          </div>
        </div>

        {/* Basic Info */}
        <div className="bg-white rounded-3xl p-8 border border-gray-200 shadow-lg hover:shadow-xl transition-all">
          <h2 className="text-2xl mb-6 flex items-center gap-3">
            Basic Information
            <span className="text-sm text-gray-500">
              Created at {format(profile.created_at, "MMM dd, yyyy")}
            </span>
          </h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm mb-2.5 text-gray-700">
                Display Name{" "}
                <span className="text-sm text-red-500">
                  {errors.display_name?.message}
                </span>
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("display_name", {
                    required: " is required",
                  })}
                  className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2.5 text-gray-700">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                  @
                </span>
                <input
                  type="text"
                  {...register("username", { disabled: true })}
                  className="w-full pl-10 pr-4 py-3.5 border-2 text-gray-500 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                />
              </div>
              <p className="text-sm text-neutral-600  mt-2">
                linku.app/@{profile.username}
              </p>
            </div>

            <div>
              <label className="block text-sm mb-2.5 text-gray-700 ">
                Bio
                <span className="text-sm text-red-500">
                  {errors.bio?.message}
                </span>
              </label>
              <textarea
                {...register("bio", {
                  maxLength: 150,
                  required: " is required",
                })}
                className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none transition-all"
                placeholder="Tell people about yourself..."
              />
              <div className="flex justify-between items-center mt-2">
                <p className="text-xs text-gray-500">
                  {bio.length}/150 characters{" "}
                </p>
                <span className="text-xs text-gray-400">
                  ✨ Make it memorable!
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm mb-2.5 text-gray-700">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  {...register("email", { disabled: true })}
                  className="w-full pl-12 pr-4 py-3.5 border-2 text-gray-500 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-3 pt-4">
          {isSubmitted && (
            <div className="text-green-700 bg-green-50 flex items-center gap-2 px-4 py-3 rounded-lg border border-green-200">
              <Check className="size-5" />
              <span> Saved!</span>
            </div>
          )}
          {errors?.root?.message && (
            <div className="flex items-center gap-2 bg-red-50 text-center border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <X className="size-5" /> {errors.root?.message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSubmitting || pic.uploading}
            className="flex cursor-pointer disabled:cursor-not-allowed items-center gap-2 px-8 py-4 bg-linear-to-r from-neutral-800 to-gray-800 text-white rounded-xl hover:shadow-xl hover:shadow-neutral-500/40 transition-all hover:scale-105 overflow-hidden"
          >
            {isSubmitting ? (
              <>
                <Spinner className="size-5" />
                <span> Saving</span>
              </>
            ) : (
              <>
                <Save className="size-5" />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
      <div className="pt-6 border-t border-gray-200">
        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
          <div className="flex-1">
            <h3 className="text-sm text-red-900 mb-1">Danger Zone</h3>
            <p className="text-xs text-red-700 mb-3">
              Once you delete your account, there is no going back. Please be
              certain.
            </p>
            <DeleteAccountDialog id={profile.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
