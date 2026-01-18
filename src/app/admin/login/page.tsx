"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (res.ok) {
                router.push('/admin');
            } else {
                const data = await res.json();
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <div className="admin-login-header">
                    <i className="fas fa-user-shield"></i>
                    <h1>Admin Login</h1>
                    <p>Enter your credentials to manage the website</p>
                </div>

                <form className="admin-login-form" onSubmit={handleSubmit}>
                    {error && (
                        <div className="alert alert-error">
                            <i className="fas fa-exclamation-circle"></i>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="form-group">
                        <label htmlFor="username">
                            <i className="fas fa-user"></i> Username
                        </label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            placeholder="Username"
                            autoComplete="username"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">
                            <i className="fas fa-lock"></i> Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Password"
                            autoComplete="current-password"
                        />
                    </div>

                    <button type="submit" className="btn-admin-login" disabled={loading}>
                        {loading ? (
                            <><i className="fas fa-spinner fa-spin"></i> Logging in...</>
                        ) : (
                            <><i className="fas fa-sign-in-alt"></i> Login</>
                        )}
                    </button>

                    <div className="admin-login-footer">
                        <a href="/">
                            <i className="fas fa-arrow-left"></i> Back to Website
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
