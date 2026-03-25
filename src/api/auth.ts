import { apiClient } from "./index";

interface RequestOTPBody {
  emailOrMobile: string;
}

interface VerifyOTPBody {
  emailOrMobile: string;
  otp: string;
}

export const authApi = {
  requestOTP: (data: RequestOTPBody) =>
    apiClient.post<{ message: string }>("/auth/request-otp", data),
  verifyOTP: (data: VerifyOTPBody) =>
    apiClient.post<{ token: string; message: string }>(
      "/auth/verify-otp",
      data,
    ),
};
