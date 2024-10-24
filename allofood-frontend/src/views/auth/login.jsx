import React from "react";
import { Alert, AlertDescription } from "../../components/shared/alert";
import { useLoginForm } from "../../hooks/useLoginForm";
import { LoginForm } from "../../components/auth/LoginForm";

const Login = () => {
  const {
    formData,
    errors,
    isLoading,
    touchedFields,
    loginAttempts,
    alert,
    handleChange,
    handleBlur,
    handleSubmit
  } = useLoginForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-[1.75rem] font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Welcome back! Please enter your details
          </p>
        </div>

        {alert.message && (
          <Alert variant={alert.variant}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <LoginForm
          formData={formData}
          errors={errors}
          touchedFields={touchedFields}
          isLoading={isLoading}
          loginAttempts={loginAttempts}
          handleChange={handleChange}
          handleBlur={handleBlur}
          handleSubmit={handleSubmit}
        />

      </div>
    </div>
  );
};

export default Login;