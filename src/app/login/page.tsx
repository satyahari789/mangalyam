 // app/login/page.tsx
"use client";
import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { PhoneIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

export default function LoginPage() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState("+91");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputsRef = useRef<HTMLInputElement[]>([]);

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number) => {
    const val = e.target.value.replace(/\D/, "").slice(-1);
    const newOtp = [...otp];
    newOtp[idx] = val;
    setOtp(newOtp);
    if (val && idx < otp.length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const sendOtp = () => {
    console.log("Sending OTP to:", countryCode + phone);
    setOtpSent(true);
  };

  const verifyOtp = () => {
    console.log("Verifying OTP:", otp.join(""));
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-[#fff7eb] flex flex-col md:flex-row items-center justify-center py-12 px-4 space-y-8 md:space-y-0 md:space-x-12">
      {/* Info Panel */}
      <div className="max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome to Your <span className="text-red-600">Matrimony</span> Journey
        </h1>
        <p className="text-gray-700">
          Sign in with your phone number for a personalized experience in finding your perfect match.
        </p>
        <ul className="space-y-4">
          {[
            "Simple and secure login with OTP",
            "Access to verified profiles only",
            "Your data is kept private and secure",
          ].map((text) => (
            <li key={text} className="flex items-start space-x-2">
              <CheckCircleIcon className="w-6 h-6 text-red-500 mt-1" />
              <span className="text-gray-700">{text}</span>
            </li>
          ))}
        </ul>
        <p className="text-gray-700">
          Don't have an account yet?{" "}
          <a href="/signup" className="text-red-600 font-semibold hover:underline">
            Register now
          </a>
        </p>
      </div>

      {/* OTP Form Card */}
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <PhoneIcon className="w-6 h-6 text-red-900 mr-2" />
          <h2 className="text-xl font-semibold text-red-900">Phone Verification</h2>
        </div>

        {!otpSent && (
          <>
            <div className="flex gap-2 mb-6">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="border rounded-lg bg-gray-50 p-2"
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
              </select>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/, ""))}
                placeholder="Enter phone number"
                className="flex-1 border rounded-lg bg-gray-50 p-2"
              />
            </div>
            <button
              onClick={sendOtp}
              disabled={!phone}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition disabled:opacity-50"
            >
              Send OTP
            </button>
          </>
        )}

        {otpSent && (
          <>
            <div className="flex gap-2 mb-6">
              {otp.map((_, idx) => (
                <input
                  key={idx}
                  maxLength={1}
                  type="text"
                  className="w-12 h-12 text-center text-xl border rounded"
                  ref={(el) => {
                    if (el) inputsRef.current[idx] = el;
                    // No return → void
                  }}
                  onChange={(e) => handleOtpChange(e, idx)}
                />
              ))}
            </div>
            <button
              onClick={verifyOtp}
              disabled={otp.some((d) => !d)}
              className="w-full py-3 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold rounded-lg transition disabled:opacity-50"
            >
              Verify OTP
            </button>
          </>
        )}
      </div>
    </main>
  );
}