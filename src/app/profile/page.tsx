'use client';

import { useState, ChangeEvent } from 'react';
import Image from 'next/image';
import { Pencil, Trash2, Upload } from 'lucide-react';

export default function ProfilePage() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImageUrl(url);
    }
  };

  const handleRemove = () => {
    setImageUrl(null);
  };

  return (
    <main className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm text-center space-y-6">
        <h1 className="text-2xl font-bold text-gray-800">Profile Picture</h1>

        <div className="relative inline-block">
          <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mx-auto relative shadow-md">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt="Profile"
                width={160}
                height={160}
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-200 text-xl">
                No Photo
              </div>
            )}
          </div>

          {imageUrl && (
            <div className="absolute top-0 right-0 flex gap-2 p-1">
              <label className="bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition">
                <Pencil size={16} />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <button
                onClick={handleRemove}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
              >
                <Trash2 size={16} />
              </button>
            </div>
          )}
        </div>

        {!imageUrl && (
          <label className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-full cursor-pointer hover:bg-green-700 transition">
            <Upload size={16} />
            Add Photo
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        )}
      </div>
    </main>
  );
}
