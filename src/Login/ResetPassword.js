import React, { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-hot-toast';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isSent, setIsSent] = useState(false);

    const handlePasswordReset = async (e) => {
        e.preventDefault();
        try {
            await sendPasswordResetEmail(auth, email);
            setIsSent(true);
            toast.success('Password reset email sent. Check your inbox.');
        } catch (error) {
            toast.error('Failed to send password reset email. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-indigo-600">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg space-y-6">
                <h2 className="text-3xl font-bold text-center text-indigo-600">Reset Password</h2>
                {isSent ? (
                    <p className="text-green-500 text-center">
                        A password reset email has been sent to your email address.
                    </p>
                ) : (
                    <form onSubmit={handlePasswordReset} className="space-y-4">
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input input-bordered w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-primary w-full mt-4"
                        >
                            Send Reset Email
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
