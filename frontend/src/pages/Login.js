import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock,faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
function Login() {

    const navigate = useNavigate(); // Ganti useHistory dengan useNavigate

    const navigateTo = (path) => {
        navigate(path); // Ganti history.push dengan navigate
    };

    const [forgotPassword, setForgotPassword] = useState(false);
    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        setForgotPassword(true);
    };

    const handleSendCode = () => {
        alert(`Kode dikirim ke: ${email}`);
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                fontWeight: "500",
                background: "linear-gradient(#0561EB, #ffffff, #FFD700)",
                padding: "20px",
                borderRadius: "10px",
            }}
        >
            <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "300px",
                background: "white",
                borderRadius: "8px",
                padding: "30px",
            }}>
                <h1>Login</h1>

                <div style={{ marginBottom: "20px", display: "flex", alignItems: "center", marginTop: "100px" }}>
                    <FontAwesomeIcon icon={faUser} style={{ marginRight: "15px" }} size="15px" />
                    <label htmlFor="Username"></label>
                    <input
                        type={"text"}
                        id=""
                        placeholder="Username"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid gray',
                        }}
                    />
                </div>
                <div style={{ marginBottom: "35px", display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon icon={faLock} style={{ marginRight: "15px" }} size="15px" />
                    <label htmlFor="Password"></label>
                    <input
                        type={"password"}
                        id=""
                        placeholder="Password"
                        style={{
                            border: 'none',
                            borderBottom: '1px solid gray',
                        }}
                    />
                </div>
                {forgotPassword ? (
                    <>
                        <div style={{ marginBottom: "30px" }}>
                        <FontAwesomeIcon icon={faEnvelope} style={{ marginRight: "15px" }} size="15px" />
                            <label htmlFor="email"></label>
                            <input
                                type={"email"}
                                id="email"
                                placeholder="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                style={{
                                    border: 'none',
                                    borderBottom: '1px solid gray',
                                }}
                            />
                            <button
                                style={{
                                    backgroundColor: "white",
                                    color: "#f1c40f",
                                    marginLeft: "30px",
                                    marginBottom: "20px",
                                    border: 'none'
                                    
                                }}
                                onClick={handleSendCode}
                            >
                                Kirim Kode via Email
                            </button>
                        </div>
                        <button style={{ marginBottom: "10px", border: 'none', }} onClick={() => setForgotPassword(false)}>Kembali ke Login</button>
                    </>
                ) : (
                    <>
                        <div style={{ marginBottom: "20px", border:'none', }}>
                            <button style={{ border: 'none',}} onClick={handleForgotPassword}>Lupa Password</button>
                        </div>
                        <button
                            style={{
                                backgroundColor: "#4169E1",
                                color: "#f1c40f",
                                marginBottom: "30px",
                                borderRadius: "6px",
                                border: 'none',
                                width: "40%"
                            }}
                            onClick={() => navigateTo("/")}
                        >
                            LOGIN
                        </button>
                    </>
                )}
                <div>
                    <span>Belum punya akun? </span>
                    <a href="/signup">Daftar</a>
                </div>
            </div>
        </div>
    );
}

export default Login;
