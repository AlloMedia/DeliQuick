import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PinInput from "react-pin-input";
import Button from "../../components/shared/button";
import { Alert, AlertDescription } from "../../components/shared/alert";
import { useAuth } from "../../context/auth/AuthContext";

const OtpVerification = () => {
  const navigate = useNavigate();
  const { verifyOTP, sendOTP } = useAuth();
  const [otp, setOtp] = useState("");
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleComplete = (value) => {
    setOtp(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (otp.length !== 6) {
      setAlert({ type: "error", message: "Please enter a valid 6-digit OTP" });
      return;
    }

    try {
      setIsVerifying(true);
      const result = await verifyOTP(otp);
      if (result.success) {
        setAlert({ type: "success", message: result.success });
        setTimeout(() => { navigate("/"); }, 2000);
      } else {
        setAlert({ type: "error", message: result.error || "OTP verification failed" });
      }
    } catch (error) {
      setAlert({ type: "error", message: error.message || "An error occurred during verification" });
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    try {
      setIsResending(true);
      const email =  localStorage.getItem("tempUserEmail");
      if (!email) {
        setAlert({ type: "error", message: "Failed to resend OTP please relogin" });
        return;
      }

      const result = await sendOTP(email);

      if (result.success) {
        setAlert({ type: "success", message: "OTP resent successfully" });
      } else {
        setAlert({ type: "error", message: result.error || "Failed to resend OTP" });
      }
    } catch (error) {
      setAlert({ type: "error", message: error.message || "An error occurred while resending OTP" });
    } finally {
      setIsResending(false);
    }
  };

  return (
    <div className="h-[35rem] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Enter OTP
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Please enter the OTP sent to your email
          </p>
        </div>

        {alert.message && (
          <Alert variant={alert.type === "error" ? "destructive" : "success"}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <PinInput
              length={6}
              initialValue=""
              onChange={handleChange}
              onComplete={handleComplete}
              type="numeric"
              inputMode="number"
              style={{ padding: '10px' }}
              inputStyle={{ borderColor: 'gray', borderWidth: '1px' , borderRadius: '8px' }}
              inputFocusStyle={{ borderColor: '#333', borderWidth: '2px' }}
              autoSelect={true}
              regexCriteria={/^[0-9]*$/}
              allowPaste
            />
          </div>

          <div className="flex space-x-3">
            <Button
              type="submit"
              fullWidth
              isLoading={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify OTP"}
            </Button>

            <Button
              type="button"
              fullWidth
              variant="secondary"
              isLoading={isResending}
              onClick={handleResendOTP}
            >
              {isResending ? "Resending..." : "Resend OTP"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;