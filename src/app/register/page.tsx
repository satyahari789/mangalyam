'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation'; // App Router

export default function RegisterPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    dob: '',
    gender: '',
    education: '',
    idType: '',
    idFile: null as File | null,
  });

  const [showIdType, setShowIdType] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (name === 'idFile' && files) {
      setFormData((prev) => ({ ...prev, idFile: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        data.append(key, value);
      } else if (typeof value === 'string') {
        data.append(key, value);
      }
    });

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        router.push('/upload-photo'); // ✅ Redirect to Upload Photo page
      } else {
        const resData = await res.json();
        setError(resData?.error || 'Registration failed');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-2">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-md w-full max-w-xl space-y-6"
      >
        <Image
          src="/images/logo.png"
          width={90}
          height={90}
          alt="App Logo"
          className="mx-auto"
        />
        <h1 className="text-2xl font-semibold text-center">Registration Form</h1>
        <p className="text-center text-gray-600">
          Join us and discover something amazing.
        </p>

        {error && (
          <p className="text-red-600 text-sm text-center font-medium">{error}</p>
        )}

        <div>
          <label className="block text-sm font-medium">Full Name :</label>
          <input
            type="text"
            name="firstName"
            placeholder="Enter Your FullName"
            className="w-full border rounded-full px-4 py-2"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Phone Number :</label>
          <input
            type="text"
            name="phone"
            placeholder="Enter Your PhoneNumber"
            className="w-full border rounded-full px-4 py-2"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Date of Birth :</label>
          <input
            type="date"
            name="dob"
            className="w-full border rounded-full px-4 py-2"
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gender :</label>
          <div className="flex gap-4">
            {['male', 'female', 'others'].map((g) => (
              <label key={g}>
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  onChange={handleChange}
                  required
                />{' '}
                {g.charAt(0).toUpperCase() + g.slice(1)}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Education :</label>
          <div className="flex gap-4">
            {['educated', 'non-educated'].map((e) => (
              <label key={e}>
                <input
                  type="radio"
                  name="education"
                  value={e}
                  onChange={handleChange}
                  required
                />{' '}
                {e}
              </label>
            ))}
          </div>
        </div>

        <div>
          <button
            type="button"
            onClick={() => setShowIdType(true)}
            className="text-blue-500 underline"
          >
            Add ID Type
          </button>
        </div>

        {showIdType && (
          <>
            <div>
              <label className="block text-sm font-medium">ID Type</label>
              <select
                name="idType"
                className="w-full border rounded-full px-4 py-2"
                onChange={handleChange}
              >
                <option value="">Select ID</option>
                <option value="pan">PAN Card</option>
                <option value="aadhar">Aadhar Card</option>
                <option value="passport">Passport</option>
                <option value="driving">Driving License</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium">Upload ID File</label>
              <input
                type="file"
                name="idFile"
                accept=".jpg,.png,.pdf"
                onChange={handleChange}
                className="w-full border rounded-full px-4 py-2"
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 border rounded-full hover:bg-blue-700"
        >
          Register
        </button>

        <p className="text-center text-gray-600 mt-6">
          Already have an account?{' '}
          <Link href="/log" className="text-blue-600 hover:underline">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
}
