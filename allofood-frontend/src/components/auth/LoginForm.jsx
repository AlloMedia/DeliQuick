  
import { Link } from "react-router-dom";
import Button from "../shared/button";
import Input  from "../shared/input";

  export const LoginForm = ({
    formData,
    errors,
    touchedFields,
    isLoading,
    loginAttempts,
    handleChange,
    handleBlur,
    handleSubmit
  }) => (
    <form onSubmit={handleSubmit} className="mt-8 space-y-6">
      <div className="space-y-4">
        <Input
          type="email"
          name="email"
          label="Email Address"
          value={formData.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touchedFields.email ? errors.email : ""}
          required
          autoFocus
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
  
        <LoginFormFooter 
          rememberMe={formData.rememberMe}
          onChange={handleChange}
        />
      </div>
  
      <Button 
        type="submit" 
        fullWidth 
        isLoading={isLoading}
        disabled={isLoading || loginAttempts >= 5}
      >
        {isLoading ? "Signing in..." : "Sign in"}
      </Button>
  
      <SignUpPrompt />
    </form>
  );
  
  export const LoginFormFooter = ({ rememberMe, onChange }) => (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <input
          id="rememberMe"
          name="rememberMe"
          type="checkbox"
          checked={rememberMe}
          onChange={onChange}
          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
        />
        <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-900">
          Remember me
        </label>
      </div>
  
      <Link
        to="/forgot-password"
        className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
      >
        Forgot your password?
      </Link>
    </div>
  );
  
  export const SignUpPrompt = () => (
    <div className="text-center">
      <p className="text-sm text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="font-medium text-indigo-600 hover:text-indigo-500"
        >
          Sign up
        </Link>
      </p>
    </div>
  );