/** global: localStorage */
import base from '../config/api.js';
const api = base.api();

const auth = {
    isactive: async function() {
        let token = "";

        if (localStorage.getItem("activeUser")) {
            token = localStorage.getItem("token");
            token = JSON.parse(token);
        }

        let res = await fetch(api + "/auth", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        });

        let data = await res.json();

        return data;
    }
};

export default auth;
