'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function SharePage() {
  const { id } = useParams();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [fileId, setFileId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleAccess = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`/api/share/${id}/access`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: password || undefined }),
      });

      const data = await response.json();

      if (response.ok) {
        setFileId(data.fileId);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (fileId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-center mb-4">File Shared</h1>
          <p className="text-center text-gray-600">File ID: {fileId}</p>
          {/* Here you would implement file download/decryption logic */}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Access Shared File</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password (if required)
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <button
          onClick={handleAccess}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {loading ? 'Accessing...' : 'Access File'}
        </button>
      </div>
    </div>
  );
}
