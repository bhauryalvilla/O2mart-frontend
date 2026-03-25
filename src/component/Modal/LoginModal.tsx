import { useEffect, useRef, useState } from "react";
import { authApi } from "../../api/auth";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [show, setShow] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [otpError, setOtpError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = "hidden";
      setEmail("");
      setError("");
      setShowOTP(false);
      setOtp(["", "", "", "", "", ""]);
    } else {
      setShow(false);
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  const validateEmail = (value: string) => {
    if (!value.trim()) return { valid: false, error: "Please enter email." };
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value))
      return { valid: false, error: "Enter valid email." };
    return { valid: true, error: "" };
  };

  const requestOTP = async () => {
    const result = validateEmail(email);
    if (!result.valid) {
      setError(result.error);
      return;
    }

    try {
      await authApi.requestOTP({ emailOrMobile: email });
      setShowOTP(true);
      otpRefs.current[0]?.focus();
    } catch (error: any) {
      setError(error.response?.data?.error || "Failed to send OTP");
    }
  };

  const verifyOTP = async () => {
    const otpCode = otp.join("");
    if (otpCode.length !== 6) return;

    setLoading(true);
    setOtpError("");
    try {
      const response = await authApi.verifyOTP({
        emailOrMobile: email,
        otp: otpCode,
      });
      console.log("Login Success:", response.data);
      onLoginSuccess(email);
      // TODO: Save token, redirect
      onClose(); // Close modal
    } catch (error: any) {
      setOtpError(error.response?.data?.error || "Invalid/expired OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (/[^0-9]/.test(value)) return; // Only numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Single digit
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    } else if (e.key === "Enter") {
      const otpCode = otp.join("");
      if (otpCode.length === 6) {
        console.log("OTP Submitted:", otpCode); // Replace with API call
        // e.g., verifyOTP(otpCode);
      }
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent, index: number) => {
    e.preventDefault();
    const pasteData = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6 - index);
    const newOtp = [...otp];
    for (let i = 0; i < pasteData.length && index + i < 6; i++) {
      newOtp[index + i] = pasteData[i];
    }
    setOtp(newOtp);
    const nextFocus = Math.min(index + pasteData.length, 5);
    otpRefs.current[nextFocus]?.focus();
  };

  useEffect(() => {
    const result = validateEmail(email);
    setError(result.error);
    setIsValid(result.valid);
  }, [email]);

  if (!isOpen && !show) return null;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      } ${isOpen ? "bg-black/30 backdrop-blur-sm" : ""}`}
      onClick={handleOverlayClick}
    >
      <div
        ref={modalRef}
        className={`w-full max-w-md transform rounded-2xl bg-white p-6 shadow-2xl transition-all duration-300 sm:p-8 ${
          show
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Header */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg">
          👤
        </div>
        <h3 className="mt-4 text-xl font-bold text-gray-900">Login</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get access to your Orders, Wishlist and Recommendations
        </p>

        {/* Form */}
        <div className="mt-6 space-y-4">
          {!showOTP ? (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter Email
                </label>
                <input
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  className={`w-full rounded-lg border px-4 py-3 text-sm placeholder-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 ${
                    error
                      ? "border-red-500 ring-2 ring-red-500/50"
                      : "border-gray-300"
                  }`}
                  placeholder="Enter Email"
                />
                {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
              </div>
              <p className="text-xs text-gray-500">
                By continuing, you agree to O<sub>2</sub> Mart Terms of Use and
                Privacy Policy
              </p>
              <button
                onClick={requestOTP}
                disabled={!isValid || !email.trim()}
                className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-all ${
                  !email.trim() || error
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                }`}
              >
                Request OTP
              </button>
            </>
          ) : (
            <>
              {/* Email input stays visible for resend */}
              <div>
                <input
                  type="text"
                  value={email}
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm bg-gray-50 focus:bg-white"
                  placeholder="Email"
                  defaultValue="user@example.com" // Mock; use state
                  readOnly
                />
              </div>
              <label className="block text-sm font-medium text-gray-700">
                Enter OTP
              </label>
              <div className="grid grid-cols-6 gap-3 mb-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      otpRefs.current[index] = el;
                    }}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    onPaste={(e) => handleOtpPaste(e, index)}
                    className="w-full h-14 text-center text-lg font-mono rounded-lg border-2 border-gray-300 focus:border-emerald-500 focus:outline-none focus:ring-4 focus:ring-emerald-500/20 bg-white shadow-sm hover:shadow-md transition-all"
                  />
                ))}
              </div>
              {otpError && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
                  <p className="text-sm font-medium text-red-700">{otpError}</p>
                </div>
              )}
              <p className="text-xs text-gray-500 text-center">
                Didn't receive OTP?{" "}
                <button
                  onClick={() => setShowOTP(false)}
                  className="text-emerald-600 hover:underline font-medium"
                >
                  Resend
                </button>
              </p>
              <button
                onClick={verifyOTP}
                disabled={otp.join("").length !== 6 || loading}
                className={`w-full rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg transition-all ${
                  otp.join("").length !== 6 || loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-emerald-500 to-teal-600 hover:shadow-xl hover:from-emerald-600 hover:to-teal-700"
                }`}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <a
            href="#"
            className="block w-full text-center text-xs text-emerald-600 hover:underline py-2"
          >
            New to O<sub>2</sub> Mart? Create an account
          </a>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default LoginModal;
