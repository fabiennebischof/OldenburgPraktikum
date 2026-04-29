import { useState } from "react";
import { api } from "../api";
import './LightController.css';

function LightController() {

    //all off
    const handlePutEverythingOut = async () => {
        try {
            const res = await api.put("/values/a02k", {

                value: 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    //get config
    const handleGet = async () => {
        try {
            const res = await api.get("/uiconfig");
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    //light 1 on/off toggle
    const [checked, setChecked] = useState(false);
    const handleLight1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setChecked(isChecked);

        try {
            const res = await api.put("/values/a001", {
                value: isChecked ? 1 : 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <p>Light 1</p>

            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={handleLight1}
                />
                <span className="slider"></span>
            </label>

            <br
            />

            <button className="button" onClick={handlePutEverythingOut}>
                PUT EVERYTHING OUT
            </button>

            <button className="button" onClick={handleGet}>
                GET
            </button>
        </div>
    );
}

export default LightController;
