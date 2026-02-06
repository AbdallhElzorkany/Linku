"use client";

import { Gift } from "lucide-react";

export default function CouponComponent() {
  return (
    <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl">
      <div className="flex items-center gap-2">
        <Gift className="w-4 h-4 text-gray-600" />
        <p className="text-sm font-medium text-gray-900">
          Use coupon code:{" "}
          <span className="font-mono bg-white px-2 py-1 rounded border">
            FREE10
          </span> to get free premium access!
        </p>
      </div>
    </div>
  );
}
