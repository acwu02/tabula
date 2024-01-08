import React, { useRef, useEffect, useState } from 'react';
import apiRequest from '../api/clientrequest';
import '../css/App.css';

function Form({ onLogin, loginUser }) {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        // TODO implement checking
        let [username, password] = [formData.username, formData.password];
        if (username.length === 0 || password.length === 0) {
            // TODO beautify error
            console.error("Required fields not filled");
        } else {
            let request = await apiRequest('POST', '/users/login', { username: username, password: password });
            if (request.response === "incorrectPassword") {
                alert("Incorrect password");
                return;
            }
            const user = request.response;
            onLogin(user);
        }
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    return (
        <form id="login" onSubmit={handleLoginSubmit}>
            <label for="username"></label>
            <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="username" />
            <label for="password"></label>
            <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="password" />
            <button id="loginButton">Login</button>
        </form>
    );
}

export default Form;