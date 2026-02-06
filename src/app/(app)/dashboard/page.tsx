"use client";
import { useProfile } from "@/components/ProfileProvider";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";
import {
  Link2,
  Plus,
  ExternalLink,
  Trash2,
  Eye,
  BarChart3,
  TrendingUp,
  Edit3,
} from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { Link as LinkType } from "@/lib/types/link";

export default function Dashboard() {
  const { profile } = useProfile();
  const [links, setLinks] = useState<LinkType[]>(profile.links || []);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<LinkType>({
    defaultValues: {
      clicks: 0,
      url: "",
      title: "",
      id: 0,
    },
  });

  const [showModals, setShowModals] = useState<{
    modalType: "add" | "edit";
    openModal: boolean;
  }>({
    modalType: "add",
    openModal: false,
  });

  const handleEditLink: SubmitHandler<LinkType> = async (data: LinkType) => {
    setLinks((links) => {
      return links.map((link) => (link.id === data.id ? { ...data } : link));
    });
    const { error } = await supabase
      .from("profiles")
      .update({
        links: links.map((link) => (link.id === data.id ? { ...data } : link)),
      })
      .eq("id", profile.id);
    if (error) {
      setError("root", { type: "server", message: error.message });
    }
    setShowModals({ ...showModals, openModal: false });
    reset();
  };

  const openEditModal = (link: LinkType) => {
    setValue("id", link.id);
    setValue("title", link.title);
    setValue("url", link.url);
    setValue("clicks", link.clicks);
    setShowModals({ ...showModals, modalType: "edit", openModal: true });
  };

  const handleAddLink: SubmitHandler<LinkType> = async (data: LinkType) => {
    const link = {
      ...data,
      id: links[links.length - 1]?.id + 1 || 0,
      clicks: 0,
    };
    const { error } = await supabase
      .from("profiles")
      .update({ links: [...links, link] })
      .eq("id", profile.id);
    if (error) {
      setError("root", { type: "server", message: error.message });
    }
    setLinks((prev) => [...prev, link]);
    setShowModals({ ...showModals, openModal: false });
    reset();
  };

  const handleDeleteLink = async (id: number) => {
    setLinks(links.filter((link) => link.id !== id));
    await supabase
      .from("profiles")
      .update({ links: links.filter((link) => link.id !== id) })
      .eq("id", profile.id);
  };

  const totalClicks = links.reduce((sum, link) => sum + link.clicks, 0);
  const clickRate = Math.round((totalClicks / profile.views) * 100);
  return (
    <div className="not-md:mt-10 py-10 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Welcome Banner */}
        <div className="relative overflow-hidden bg-linear-to-br from-neutral-800 via-neutral-800 to-gray-800 rounded-3xl p-8 lg:p-10 text-white shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gray-800/20 rounded-full blur-3xl" />

          <div className="relative z-10">
            <h1 className="text-3xl lg:text-4xl mb-3">
              Welcome back, {profile.display_name}! 👋
            </h1>
            <p className="text-neutral-100 mb-6 text-lg">
              Your linku is live and ready to share
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        {profile.plan === "premium" && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="size-12 mb-4 bg-linear-to-br from-neutral-500 to-neutral-800 rounded-xl flex items-center justify-center shadow-lg shadow-neutral-500/30 group-hover:scale-110 transition-transform">
                <Link2 className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-sm mb-1">Total Links</p>
              <p className="text-4xl">{links.length}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="size-12 mb-4 bg-linear-to-br from-gray-500 to-gray-800 rounded-xl flex items-center justify-center shadow-lg shadow-gray-500/30 group-hover:scale-110 transition-transform">
                <BarChart3 className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-sm mb-1">Total Clicks</p>
              <p className="text-4xl">{totalClicks}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="size-12 mb-4 bg-linear-to-br from-green-500 to-green-800 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-sm mb-1">Profile Views</p>
              <p className="text-4xl">{profile.views}</p>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-lg hover:shadow-xl transition-all group">
              <div className="size-12 mb-4 bg-linear-to-br from-orange-500 to-orange-800 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-800 text-sm mb-1">click Rate</p>
              <p className="text-4xl">{clickRate}%</p>
            </div>
          </div>
        )}

        {/* Links Section */}
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xl">
          <div className="p-6 lg:p-8 border-b border-gray-200 bg-linear-to-r from-gray-50 to-white">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-3xl mb-2">Your Links</h2>
                <p className="text-gray-800">Manage and organize your links</p>
              </div>
              <button
                onClick={() =>
                  setShowModals({ modalType: "add", openModal: true })
                }
                className="flex items-center gap-2 px-6 py-3 bg-linear-to-r from-neutral-800 to-gray-800 text-white rounded-xl hover:shadow-lg hover:shadow-neutral-500/40 transition-all hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                <span>Add Link</span>
              </button>
            </div>
          </div>

          <div className="divide-y divide-gray-200">
            {links.length === 0 ? (
              <div className="p-16 text-center text-gray-500">
                <div className="w-20 h-20 bg-linear-to-br from-neutral-100 to-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Link2 className="w-10 h-10 text-neutral-400" />
                </div>
                <h3 className="text-xl mb-2">No links yet</h3>
                <p className="text-gray-500 mb-6">
                  Add your first link to get started!
                </p>
                <button
                  onClick={() =>
                    setShowModals({ modalType: "add", openModal: true })
                  }
                  className="inline-flex items-center gap-2 px-6 py-3 bg-linear-to-r from-neutral-800 to-gray-800 text-white rounded-xl hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Your First Link</span>
                </button>
              </div>
            ) : (
              links.map((link) => (
                <div
                  key={link.id}
                  className="p-6 hover:bg-linear-to-r hover:from-neutral-50/50 hover:to-gray-50/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="mb-1.5 text-lg">{link.title}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <ExternalLink className="w-4 h-4" />
                        <span className="truncate">{link.url}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 not-sm:gap-1 ">
                      <div className="flex not-md:flex-col gap-1 items-center">
                        <button
                          className="p-3 hover:scale-110 hover:cursor-pointer text-gray-400 hover:text-gray-800 hover:bg-gray-50 rounded-xl  transition-all"
                          title="Edit link"
                          onClick={() => openEditModal(link)}
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>

                        <button
                          className="p-3 text-gray-400 hover:scale-110 hover:cursor-pointer hover:text-red-800 hover:bg-red-50 rounded-xl  transition-all"
                          title="Delete link"
                          onClick={() => handleDeleteLink(link.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                      {profile.plan === "premium" && (
                        <div className="text-center px-4 py-2 bg-neutral-50 rounded-xl">
                          <p className="text-xl text-neutral-800">
                            {link.clicks}
                          </p>
                          <p className="text-xs text-gray-800">clicks</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {showModals.openModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-3xl p-8 lg:p-10 max-w-md w-full shadow-2xl">
            <h2 className="text-3xl mb-3">
              {showModals.modalType === "add"
                ? "Add Link"
                : showModals.modalType === "edit"
                  ? "Edit Link"
                  : ""}
            </h2>
            <p className="text-gray-800 mb-8">
              {showModals.modalType === "add"
                ? "Share another link with your audience"
                : "Update your link details"}
            </p>

            <form
              onSubmit={handleSubmit(
                showModals.modalType === "add" ? handleAddLink : handleEditLink,
              )}
              className="space-y-4"
            >
              {errors.root?.message && (
                <div className="bg-red-50 text-center border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {errors.root.message}
                </div>
              )}
              <div>
                <label className="block text-sm mb-2.5 text-gray-800">
                  Link title
                </label>
                <input
                  type="text"
                  {...register("title", {
                    required: "Title is required",
                  })}
                  placeholder="My Awesome Link"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                />
                <p className="text-sm text-red-500">{errors.title?.message}</p>
              </div>

              <div>
                <label className="block text-sm mb-2.5 text-gray-800">
                  Destination URL
                </label>
                <input
                  type="text"
                  {...register("url", {
                    required: "URL is required",
                    pattern: {
                      value:
                        /^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?:\/[^\s]*)?$/,
                      message: "URL is invalid",
                    },
                  })}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all"
                />
                <p className="text-sm text-red-500">{errors.url?.message}</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => {
                    reset();
                    setShowModals({ ...showModals, openModal: false });
                  }}
                  className="disabled:cursor-not-allowed cursor-pointer flex-1 py-3.5 border-2 border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  disabled={isSubmitting}
                  type="submit"
                  className="disabled:cursor-not-allowed cursor-pointer flex-1 py-3.5 bg-linear-to-r from-neutral-800 to-gray-800 text-white rounded-xl hover:shadow-lg hover:shadow-neutral-500/40 transition-all hover:scale-105"
                >
                  {isSubmitting ? (
                    <Spinner className="size-5 mx-auto" />
                  ) : showModals.modalType === "add" ? (
                    "Add Link"
                  ) : (
                    "Edit Link"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
