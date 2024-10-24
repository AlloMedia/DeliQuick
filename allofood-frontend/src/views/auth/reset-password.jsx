import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/AuthContext';
import { Alert, AlertDescription } from "../../components/shared/alert";
import Button from "../../components/shared/button";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [formData, setFormData] = useState({ password: '', confirmPassword: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate('/forgot-password');
    }
  }, [token, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setAlert({ variant: "destructive", message: "Passwords do not match" });
      return;
    }

    try {
      const result = await resetPassword(token, formData);
      if (result.success) {
        setAlert({ variant: "success", message: "Password reset successfully. You can now log in with your new password." });
        setTimeout(() => navigate('/login'), 3000);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      setAlert({ variant: "destructive", message: error.message });
    }
  };

  return (
    <div className="h-[35rem] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
        <div>
          <h2 className="mt-6 text-center text-2xl font-extrabold text-gray-900">
            Reset Your Password
          </h2>
        </div>

        {alert && (
          <Alert variant={alert.variant}>
            <AlertDescription>{alert.message}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            <div className='mb-3'>
              <label htmlFor="password" className="sr-only">New Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="New Password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm New Password</label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-black focus:border-black focus:z-10 sm:text-sm"
                placeholder="Confirm New Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
          </div>

          <Button
            type="submit"
            fullWidth
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;