'use client';

import React, { useState } from "react";
import { User, Phone, Mail, Building } from 'lucide-react';

interface OnboardingFormProps {
  form: {
    fullName: string;
    phone: string;
    email: string;
    company: string;
  };
  setForm: React.Dispatch<React.SetStateAction<{
    fullName: string;
    phone: string;
    email: string;
    company: string;
  }>>;
  onContinue?: () => void;
}

const OnboardingForm: React.FC<OnboardingFormProps> = ({ form, setForm, onContinue }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.fullName) errs.fullName = "Required";
    if (!form.phone) {
      errs.phone = "Required";
    } else {
      // Simple phone validation: at least 7 digits, allows spaces, dashes, parentheses
      const phonePattern = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
      const digits = form.phone.replace(/\D/g, "");
      if (!phonePattern.test(form.phone) || digits.length < 7) {
        errs.phone = "Please enter a valid phone number.";
      }
    }
    if (!form.email) {
      errs.email = "Required";
    } else {
      // Simple email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(form.email)) {
        errs.email = "Please enter a valid email address.";
      }
    }
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length === 0 && onContinue) {
      onContinue();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-sm px-4 sm:px-8 md:px-12 py-8 sm:py-10 md:py-12 w-full max-w-2xl mx-auto flex flex-col gap-6"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-black">Let&apos;s Get Started</h2>
      <p className="text-black mb-6 text-base sm:text-lg font-medium">Share your project details with us through this streamlined onboarding process. We&apos;ll gather everything needed to deliver exceptional creative solutions.</p>
      <div className="flex flex-col gap-4">
        <label className="font-semibold text-black text-sm sm:text-base flex items-center gap-2" htmlFor="fullName">
          <User size={18} className="text-gray-500" /> Full Name
        </label>
        <input
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600 text-base"
          type="text"
          name="fullName"
          id="fullName"
          value={form.fullName}
          onChange={handleChange}
        />
        {errors.fullName && <span className="text-red-500 text-xs mt-1">{errors.fullName}</span>}
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-semibold text-black text-sm sm:text-base flex items-center gap-2" htmlFor="phone">
          <Phone size={18} className="text-gray-500" /> Phone
        </label>
        <input
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600 text-base"
          type="tel"
          name="phone"
          id="phone"
          value={form.phone}
          onChange={handleChange}
        />
        {errors.phone && <span className="text-red-500 text-xs mt-1">{errors.phone}</span>}
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-semibold text-black text-sm sm:text-base flex items-center gap-2" htmlFor="email">
          <Mail size={18} className="text-gray-500" /> Email
        </label>
        <input
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600 text-base"
          type="email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleChange}
        />
        {errors.email && <span className="text-red-500 text-xs mt-1">{errors.email}</span>}
      </div>
      <div className="flex flex-col gap-4">
        <label className="font-semibold text-black text-sm sm:text-base flex items-center gap-2" htmlFor="company">
          <Building size={18} className="text-gray-500" /> Company (optional)
        </label>
        <input
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600 text-base"
          type="text"
          name="company"
          id="company"
          value={form.company}
          onChange={handleChange}
        />
      </div>
      <button
        type="submit"
        className="btn btn-primary mt-6"
      >
        Continue
      </button>
    </form>
  );
};

export default OnboardingForm; 