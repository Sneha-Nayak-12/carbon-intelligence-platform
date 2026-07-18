import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface LoginFormInputs {
  email: string;
  organizationId: string;
}

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    // Simply simulate authentication and redirect to Home
    console.log('Authenticating organization:', data);
    await new Promise((resolve) => setTimeout(resolve, 800));
    navigate('/dashboard');
  };

  return (
    <div className="flex min-h-screen flex-col justify-center bg-[#F8FAFC] py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Brand Logo */}
        <div className="flex justify-center items-center gap-2">
          <img src="/green_asha_logo.png" alt="GreenASHA Logo" className="h-12 w-auto object-contain" />
        </div>
        <h2 className="mt-6 text-center text-2xl font-bold tracking-tight text-slate-950 font-heading">
          Sign in to your platform
        </h2>
        <p className="mt-1.5 text-center text-sm text-slate-500 font-light">
          Access compliance offsets ledger.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white px-8 py-10 shadow-soft border border-slate-100 rounded-2xl space-y-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Corporate Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="s.jenkins@acme-global.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 transition-all ${
                  errors.email
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-200 focus:border-[#0F766E] focus:ring-[#0F766E]'
                }`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Organization Identifier */}
            <div>
              <label htmlFor="org" className="block text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Organization Registry ID
              </label>
              <input
                id="org"
                type="text"
                placeholder="US-REG-88290-ACME"
                {...register('organizationId', { required: 'Registry ID is required' })}
                className={`mt-1.5 w-full rounded-lg border px-3 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 transition-all ${
                  errors.organizationId
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500'
                    : 'border-slate-200 focus:border-[#0F766E] focus:ring-[#0F766E]'
                }`}
              />
              {errors.organizationId && (
                <p className="mt-1 text-xs text-red-500 font-medium">{errors.organizationId.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center rounded-lg bg-[#0F766E] py-2.5 text-sm font-semibold text-white shadow-soft transition-all hover:bg-[#0F766E]/95 active:scale-[0.98] disabled:opacity-50"
            >
              {isSubmitting ? 'Authenticating...' : 'Sign In'}
              <ArrowRight className="ml-1.5 h-4 w-4" />
            </button>
          </form>

          <div className="border-t border-slate-100 pt-5 text-center">
            <span className="text-xs text-slate-400 font-light">
              Need assistance? contact verifier network node.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
