// components/LayloSmsForm.js
import { useState } from 'react';

const COUNTRY_CODES = [
    { code: '+1', label: 'USA/Canada (+1)' },
    { code: '+44', label: 'UK (+44)' },
    { code: '+61', label: 'Australia (+61)' },
    { code: '+91', label: 'India (+91)' },
    { code: '+49', label: 'Germany (+49)' },
    // add more as needed
];

export default function LayloSmsForm() {
    const [country, setCountry] = useState(COUNTRY_CODES[0].code);
    const [area, setArea] = useState('');
    const [number, setNumber] = useState('');
    const [status, setStatus] = useState('idle');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMsg('');

        const fullPhone = `${country}${area}${number}`;
        const base = process.env.NEXT_PUBLIC_SERVER_URL || '';
        const url = `${base}/laylo/sms?phone=${encodeURIComponent(fullPhone)}`;

        try {
            const res = await fetch(url);
            const payload = await res.json();

            if (res.ok && payload.ok) {
                setStatus('success');
            } else {
                setStatus('error');
                setErrorMsg(
                    payload.error ||
                    JSON.stringify(payload.errors) ||
                    'Unknown error'
                );
            }
        } catch (err) {
            setStatus('error');
            setErrorMsg(err.message);
        }
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-md mx-auto p-6 bg-white rounded-lg shadow"
        >
            <h2 className="text-lg font-semibold mb-4 text-gray-800 text-center">
                Join our SMS list
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div>
                    <label htmlFor="country" className="block mb-1 text-sm text-gray-700">
                        Country
                    </label>
                    <select
                        id="country"
                        value={country}
                        onChange={e => setCountry(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        {COUNTRY_CODES.map(({ code, label }) => (
                            <option key={code} value={code}>{label}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="area" className="block mb-1 text-sm text-gray-700">
                        Area code
                    </label>
                    <input
                        type="text"
                        id="area"
                        value={area}
                        onChange={e => setArea(e.target.value.replace(/\D/, ''))}
                        placeholder="e.g. 415"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label htmlFor="number" className="block mb-1 text-sm text-gray-700">
                        Phone number
                    </label>
                    <input
                        type="text"
                        id="number"
                        value={number}
                        onChange={e => setNumber(e.target.value.replace(/\D/, ''))}
                        placeholder="e.g. 5551234"
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {status === 'loading' ? 'Submitting…' : 'Get Updates'}
            </button>

            {status === 'success' && (
                <p className="mt-4 text-green-600 font-medium text-center">
                    ✅ You’re signed up!
                </p>
            )}
            {status === 'error' && (
                <p className="mt-4 text-red-600 font-medium text-center">
                    ❌ {errorMsg}
                </p>
            )}
        </form>
    );
}
