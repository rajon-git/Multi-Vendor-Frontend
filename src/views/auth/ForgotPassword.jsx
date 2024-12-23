import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import apiInstance from '../../utils/axios';
import Swal from 'sweetalert2';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const axios = apiInstance;
    const [searchParams] = useSearchParams();
    const otp = searchParams.get('otp');
    const uuid = searchParams.get('uuid');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handleEmailSubmit = () => {
        if (!email) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Please enter an email address.',
            });
            return;
        }

        setIsLoading(true); // Start loading
        axios.get(`user/password-reset/${email}/`)
            .then((res) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Password Reset Email Sent!',
                });
            })
            .catch((err) => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: err.response?.data?.message || 'Something went wrong. Please try again.',
                });
            })
            .finally(() => {
                setIsLoading(false); // Stop loading
            });
    };

    return (
        <section>
            <main className="" style={{ marginBottom: 100, marginTop: 50 }}>
                <div className="container">
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card rounded-5">
                                    <div className="card-body p-4">
                                        <h3 className="text-center">Forgot Password</h3>
                                        <br />

                                        <div className="tab-content">
                                            <div
                                                className="tab-pane fade show active"
                                                id="pills-login"
                                                role="tabpanel"
                                                aria-labelledby="tab-login"
                                            >
                                                <div>
                                                    {/* Email input */}
                                                    <div className="form-outline mb-4">
                                                        <label className="form-label" htmlFor="email">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            id="email"
                                                            name="email"
                                                            className="form-control"
                                                            value={email}
                                                            onChange={handleEmailChange}
                                                        />
                                                    </div>

                                                    {isLoading ? (
                                                        <div className="text-center">
                                                            <button
                                                                disabled
                                                                type="button"
                                                                className="btn btn-primary w-100"
                                                            >
                                                                Processing <i className="fas fa-spinner fa-spin"></i>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="text-center">
                                                            <button
                                                                onClick={handleEmailSubmit}
                                                                className="btn btn-primary w-100"
                                                            >
                                                                Send Email <i className="fas fa-paper-plane"></i>
                                                            </button>
                                                        </div>
                                                    )}
                                                    <div className="text-center">
                                                        <p className="mt-4">
                                                            Want to sign in? <Link to="/login">Sign In</Link>
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </section>
    );
}

export default ForgotPassword;
