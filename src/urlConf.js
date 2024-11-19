// config.js
const isLocalhost = window.location.hostname === "localhost";

const Config = {
    BASE_URL: isLocalhost ? "http://localhost:8000" : "https://emlakbackend.necatiarman.dev",
    API_URL: isLocalhost ? "http://localhost:8000/api" : "https://emlakbackend.necatiarman.dev/api",
};

export default Config;