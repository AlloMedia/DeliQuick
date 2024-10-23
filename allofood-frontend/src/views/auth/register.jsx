import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../../components/shared/input";
import Button from "../../components/shared/button";
import { validateField, validateForm } from "../../utils/validation";
import { ERROR_MESSAGES } from "../../constants";
import { Alert, AlertDescription } from "../../components/shared/alert";
import { useAuth } from "../../context/auth/AuthContext";

const Register = () => {
  const { register, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
    role: "",
  });

  useEffect(() => {
    const selectedRole = location.state?.selectedRole;
    if (!selectedRole) {
      navigate("/role-selection");
      return;
    }
    setFormData((prev) => ({
      ...prev,
      role: selectedRole,
    }));
  }, [location.state, navigate]);

  const [errors, setErrors] = useState({});
  const [touchedFields, setTouchedFields] = useState({});
  const [alert, setAlert] = useState({ variant: "", message: "" });

  const handleChange = useCallback(
    (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));

      if (errors[name]) {
        setErrors((prev) => ({
          ...prev,
          [name]: "",
        }));
      }
    },
    [errors]
  );

  const handleBlur = useCallback(
    (e) => {
      const { name, value } = e.target;
      setTouchedFields((prev) => ({
        ...prev,
        [name]: true,
      }));

      const error = validateField(name, value, formData);
      if (error) {
        setErrors((prev) => ({
          ...prev,
          [name]: error,
        }));
      }
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setTouchedFields({
        email: true,
        password: true,
      });
      return;
    }

    try {
      const result = await register(formData);

      if (result.success) {
        setAlert({
          variant: "success",
          message: result.success,
        });
      } else {
        setAlert({
          variant: "destructive",
          message: result.error || ERROR_MESSAGES.generic,
        });
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setAlert({
        variant: "destructive",
        message: ERROR_MESSAGES.generic,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Sign in
            </Link>
          </p>
        </div>

        {alert.message && (
          <Alert variant={alert.variant}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              type="text"
              name="name"
              label="Full Name"
              value={formData.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.name ? errors.name : ""}
              required
            />

            <Input
              type="email"
              name="email"
              label="Email Address"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.email ? errors.email : ""}
              required
            />

            <Input
              type="password"
              name="password"
              label="Password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.password ? errors.password : ""}
              required
            />

            <Input
              type="password"
              name="confirmPassword"
              label="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              error={
                touchedFields.confirmPassword ? errors.confirmPassword : ""
              }
              required
            />

            <Input
              type="text"
              name="address"
              label="Address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.address ? errors.address : ""}
            />

            <Input
              type="tel"
              name="phone"
              label="Phone Number (optional)"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touchedFields.phone ? errors.phone : ""}
            />
          </div>

          <Button type="submit" fullWidth isLoading={isLoading}>
            {isLoading ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        <div className="mt-4 text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="text-indigo-600 hover:text-indigo-500">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="text-indigo-600 hover:text-indigo-500">
            Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;