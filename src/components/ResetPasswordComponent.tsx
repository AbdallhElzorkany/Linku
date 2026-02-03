"use client";
import { Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import Form from "next/form";
import { useState, useActionState } from "react";
import { resetPassword } from "@/lib/actions/reset-password";
import { resetPasswordFormState } from "@/lib/types/reset-password-types";

export default function ResetPassword({ code }: { code: string }) {
  const initialState: resetPasswordFormState = {
    errors: {},
    inputs: { code: "", password: "", confirmPassword: "" },
  };
  const [state, formAction, isPending] = useActionState(
    resetPassword,
    initialState,
  );
  const [showPasswords, setShowPasswords] = useState({
    password: false,
    confirmPassword: false,
  });
  return (
    <Form action={formAction} className="space-y-3">
      <input type="hidden" name="code" value={code} />
      {state?.errors?.message && (
        <div className="bg-red-50 text-center border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {state.errors.message}
        </div>
      )}
      <div>
        <label
          className={`block text-sm mb-2.5 text-gray-700 ${
            state.errors?.password ? "text-red-600" : ""
          }`}
        >
          Password
        </label>
        <div className="relative">
          <Lock
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${
              state.errors?.password ? "text-red-600" : ""
            }`}
          />
          <input
            type={showPasswords.password ? "text" : "password"}
            defaultValue={state.inputs?.password}
            name="password"
            placeholder="Create a strong password"
            className={`w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all ${
              state.errors?.password ? "border-red-600" : ""
            }`}
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({
                ...showPasswords,
                password: !showPasswords.password,
              })
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.password ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>

        <p
          className={`transition-all  text-xs mt-2 ml-1 ${
            state.errors?.password ? "text-red-600" : "text-gray-600"
          }`}
        >
          Password must be at least 8 characters long, include one lowercase
          letter, one uppercase letter, one number, and one special character
        </p>
      </div>

      <div>
        <label
          className={`block text-sm mb-2.5 text-gray-700 ${
            state.errors?.confirmPassword ? "text-red-600" : ""
          }`}
        >
          Confirm password
        </label>
        <div className="relative">
          <Lock
            className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 ${
              state.errors?.confirmPassword ? "text-red-600" : ""
            }`}
          />
          <input
            type={showPasswords.confirmPassword ? "text" : "password"}
            defaultValue={state.inputs?.confirmPassword}
            name="confirmPassword"
            placeholder="Re-enter your password"
            className={`w-full pl-12 pr-12 py-3.5 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:border-transparent transition-all ${
              state.errors?.confirmPassword ? "border-red-600" : ""
            }`}
          />
          <button
            type="button"
            onClick={() =>
              setShowPasswords({
                ...showPasswords,
                confirmPassword: !showPasswords.confirmPassword,
              })
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPasswords.confirmPassword ? (
              <EyeOff className="w-5 h-5" />
            ) : (
              <Eye className="w-5 h-5" />
            )}
          </button>
        </div>
        {state.errors?.confirmPassword && (
          <p className={`text-xs mt-2 text-red-600 ml-1 `}>
            {state.errors.confirmPassword}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full cursor-pointer py-3.5 bg-neutral-800 text-white rounded-xl hover:shadow-lg hover:shadow-neutral-500/30 transition-all hover:scale-[1.02] mt-6"
      >
        {isPending ? <Loader2 className="animate-spin mx-auto" /> : "Save"}
      </button>
    </Form>
  );
}
