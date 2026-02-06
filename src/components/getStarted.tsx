"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Link2, User, Check, Sparkles, X } from "lucide-react";
import { supabase } from "@/lib/supabase/client";

export default function GetStarted({ id }: { id: string | undefined }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    displayName: "",
    username: {
      value: "",
      unique: false,
    },
    bio: "",
    step: 1,
  });

  const completeSetup = async () => {
    if (!id) return;
    await supabase
      .from("profiles")
      .update({
        display_name: formData.displayName,
        username: formData.username.value,
        bio: formData.bio,
      })
      .eq("id", id);
    router.push("/dashboard");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.step === 1 && formData.displayName.trim()) {
      setFormData({ ...formData, step: 2 });
    } else if (
      formData.step === 2 &&
      formData.username.value &&
      formData.username.unique
    ) {
      setFormData({ ...formData, step: 3 });
    } else if (formData.step === 3) {
      completeSetup();
    }
  };

  useEffect(() => {
    const checkUsername = async () => {
      const { data } = await supabase
        .from("profiles")
        .select("username")
        .eq("username", formData.username.value)
        .maybeSingle();

      if (data) {
        setFormData((prev) => ({
          ...prev,
          username: { ...prev.username, unique: false },
        }));
      } else {
        setFormData((prev) => ({
          ...prev,
          username: { ...prev.username, unique: true },
        }));
      }
    };
    checkUsername();
  }, [formData.username.value]);

  const handleBack = () => {
    if (formData.step > 1) {
      setFormData({ ...formData, step: formData.step - 1 });
    }
  };

  const progress = (formData.step / 3) * 100;

  return (
    <div className="min-h-screen bg-linear-to-br from-neutral-50 via-gray-50 to-white flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-xl">
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center gap-2 mb-8">
          <div className="w-10 h-10 bg-linear-to-br from-neutral-800 to-gray-800 rounded-xl flex items-center justify-center shadow-lg shadow-neutral-500/20">
            <Link2 className="w-6 h-6 text-white" />
          </div>
          <span className="text-3xl bg-linear-to-r from-neutral-800 to-gray-800 bg-clip-text text-transparent">
            linku
          </span>
        </Link>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm text-gray-800">
              Step {formData.step} of 3
            </span>
            <span className="text-sm text-gray-800">
              {Math.round(progress)}% complete
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-neutral-800 to-gray-800 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Setup Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-10 border border-gray-100">
          <form onSubmit={handleSubmit} className="space-y-6">
            {formData.step === 1 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-linear-to-br from-neutral-100 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <User className="w-8 h-8 text-neutral-800" />
                  </div>
                  <h1 className="text-4xl mb-3">What&apos;s your name?</h1>
                  <p className="text-gray-800">
                    This will be displayed on your linku page
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2.5 text-gray-700">
                    Display name
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={formData.displayName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          displayName: e.target.value,
                        })
                      }
                      placeholder="John Doe"
                      className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                      required
                      autoFocus
                    />
                  </div>
                </div>
              </>
            )}

            {formData.step === 2 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-linear-to-br from-gray-100 to-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-gray-800" />
                  </div>
                  <h1 className="text-4xl mb-3">Choose your username</h1>
                  <p className="text-gray-800">
                    This will be your unique linku URL
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2.5 text-gray-700">
                    Username
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                      @
                    </span>
                    <input
                      type="text"
                      value={formData.username.value}
                      onChange={async (e) => {
                        setFormData({
                          ...formData,
                          username: {
                            ...formData.username,
                            value: e.target.value
                              .toLowerCase()
                              .replace(/[^a-z0-9_]/g, ""),
                          },
                        });
                      }}
                      placeholder="Username"
                      className="w-full pl-10 pr-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                      required
                      autoFocus
                    />
                  </div>
                  <p className="text-sm text-gray-500 mt-1 ml-1">
                    only lowercase letters, numbers, and underscores
                  </p>
                  {formData.username.value && (
                    <div
                      className={`mt-3 flex items-center justify-between p-3 ${formData.username.unique ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"} border rounded-xl`}
                    >
                      <div className="flex items-center gap-2">
                        {formData.username.unique ? (
                          <Check className="w-4 h-4 text-green-800" />
                        ) : (
                          <X className="w-4 h-4 text-red-800" />
                        )}
                        <span
                          className={
                            formData.username.unique
                              ? "text-green-800"
                              : "text-red-800"
                          }
                        >
                          {formData.username.unique
                            ? "Available"
                            : "Not available!"}
                        </span>
                      </div>
                      <span className="text-sm text-neutral-800">
                        https://linku-app.vercel.app/@{formData.username.value}
                      </span>
                    </div>
                  )}
                </div>
              </>
            )}

            {formData.step === 3 && (
              <>
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-linear-to-br from-green-100 to-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-green-800" />
                  </div>
                  <h1 className="text-4xl mb-3">Add your bio</h1>
                  <p className="text-gray-800">
                    Tell visitors a bit about yourself
                  </p>
                </div>

                <div>
                  <label className="block text-sm mb-2.5 text-gray-700">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) =>
                      setFormData({ ...formData, bio: e.target.value })
                    }
                    rows={4}
                    maxLength={150}
                    className="w-full px-4 py-4 text-lg border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent resize-none transition-all"
                    placeholder="Welcome to my linku! 👋"
                    autoFocus
                  />
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-xs text-gray-500">
                      {formData.bio.length}/150 characters
                    </p>
                    <span className="text-xs text-gray-400">
                      ✨ Make it memorable!
                    </span>
                  </div>
                </div>

                <div className="bg-linear-to-br from-neutral-50 to-gray-50 rounded-2xl p-6 border border-neutral-100">
                  <h3 className="text-lg mb-3 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-neutral-800" />
                    Your linku preview
                  </h3>
                  <div className="bg-white rounded-xl p-6 text-center">
                    <div className="w-20 h-20 bg-linear-to-br from-neutral-500 to-gray-800 rounded-full mx-auto mb-3" />
                    <h4 className="text-xl mb-1">
                      {formData.displayName || "Your Name"}
                    </h4>
                    <p className="text-sm text-gray-800 mb-2">
                      @{formData.username.value || "username"}
                    </p>
                    {formData.bio && (
                      <p className="text-sm text-gray-500">{formData.bio}</p>
                    )}
                  </div>
                </div>
              </>
            )}

            <div className="flex gap-3 pt-4">
              {formData.step > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 cursor-pointer py-4 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all text-lg"
                >
                  Back
                </button>
              )}
              <button
                type="submit"
                className="flex-1 py-4 bg-linear-to-r from-neutral-800 to-gray-800 text-white rounded-xl hover:shadow-lg hover:shadow-neutral-500/30 transition-all hover:scale-[1.02] text-lg"
              >
                {formData.step === 3 ? "Complete Setup" : "Continue"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
