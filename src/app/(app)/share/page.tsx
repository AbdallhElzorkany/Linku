"use client";
import { useProfile } from "@/components/ProfileProvider";
import {
  ExternalLink,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Copy,
  Check,
} from "lucide-react";
import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
export default function Share() {
  const {
    profile: { username,plan },
  } = useProfile();
  const [copied, setCopied] = useState(false);
  const shareUrl = `https://linku.app/@${username}`;

  const handleCopyClick = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const socialShares = [
    {
      name: "Facebook",
      icon: Facebook,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      color: "from-blue-600 to-blue-700",
    },
    {
      name: "Twitter",
      icon: Twitter,
      url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=Check out my Linku!`,
      color: "from-sky-500 to-sky-600",
    },

    {
      name: "WhatsApp",
      icon: MessageCircle,
      url: `https://wa.me/?text=${encodeURIComponent(`Check out my Linku! ${shareUrl}`)}`,
      color: "from-green-500 to-green-600",
    },
    {
      name: "Email",
      icon: Mail,
      url: `mailto:?subject=Check out my Linku!&body=${encodeURIComponent(shareUrl)}`,
      color: "from-neutral-600 to-neutral-700",
    },
  ];

  return (
    <div className="lg:p-10 not-sm:p-2 sm:p-3">
      <div
        className={`bg-white rounded-3xl  not-md:mb-10 mx-auto shadow-2xl not-sm:p-4 p-10 not-md:max-w-2xl md:max-w-4xl ${plan === "free" ? "mt-40" : "lg:mt-20 not-md:mt-20"}`}
      >
        <div className="mb-8">
          <h2 className="text-3xl mb-2">Share Your Linku</h2>
          <p className="text-gray-600">Share your profile with the world</p>
        </div>

        <div
          className={`grid ${plan === "premium" ? "lg:grid-cols-2" : ""} gap-8`}
        >
          {plan === "premium" && (
            <div className="space-y-4">
              <div className="bg-linear-to-br from-neutral-50 to-gray-50 rounded-2xl p-6 border-2 border-neutral-200">
                <div className="flex justify-center mb-4">
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    {username ? (
                      <QRCodeSVG
                        value={shareUrl}
                        size={275}
                        level="H"
                        marginSize={1}
                        bgColor="white"
                        fgColor="#262626"
                        className="not-sm:w-[215px]"
                      />
                    ) : (
                      <div className="w-[280px] h-[280px] flex items-center justify-center bg-gray-100 rounded-lg">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-600"></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
              <label className="block text-sm mb-2 text-gray-700">
                Your Link
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-2.5 bg-white border border-gray-300 rounded-xl text-sm text-gray-700"
                />
                <button
                  onClick={handleCopyClick}
                  className="px-4 py-2.5 cursor-pointer bg-linear-to-r from-neutral-600 to-gray-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 flex items-center gap-2 whitespace-nowrap"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span className="hidden sm:inline">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span className="hidden sm:inline">Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Social Buttons */}
            <div>
              <label className="block text-sm mb-3 text-gray-700">
                Share on Social Media
              </label>
              <div
                className={`grid not-sm:grid-cols-1 sm:grid-cols-2  ${plan === "free" ? "lg:grid-cols-2" : "lg:grid-cols-1"} gap-2`}
              >
                {socialShares.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full flex items-center gap-3 px-4 py-3 bg-linear-to-r ${social.color} text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 group`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>Share on {social.name}</span>
                      <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
