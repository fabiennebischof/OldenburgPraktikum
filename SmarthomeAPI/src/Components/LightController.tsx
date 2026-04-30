import { useState } from "react";
import { api } from "../api";
import './LightController.css';
import { useEffect } from "react";

function LightController() {

    const [checkedHallway, setCheckedHallway] = useState(false);
    const [checkedBedroom, setCheckedBedroom] = useState(false);
    const [checkedLivingRoom, setCheckedLivingRoom] = useState(false);
    const [color, setColor] = useState({
    r: 0,
    g: 0,
    b: 0,
    w: 0,
    });

    const LIGHTS = {
        hallway: "a001",
        bedroom: "a00j",
        livingRGB: "a013",
        livingDimmer: "a01c",

        livingRed: "a015",
        livingGreen: "a016",
        livingBlue: "a017",
        livingWhite: "a018"
    };

    //all off
    const handlePutEverythingOut = async () => {
        try {
            const res = await api.put("/values/a02p", {

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

    const handleLightHallway = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedHallway(isChecked);

        try {
            const res = await api.put(`/values/${LIGHTS.hallway}`, {
                value: isChecked ? 1 : 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLightBedroom = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedBedroom(isChecked);

        try {
            const res = await api.put(`/values/${LIGHTS.bedroom}`, {
                value: isChecked ? 1 : 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const updateColor = (newValues: Partial<typeof color>) => {
    const updated = { ...color, ...newValues };
    setColor(updated);
};

    const setLivingRoomColor = async (c: typeof color) => {
        try {
            await Promise.all([
                api.put(`/values/${LIGHTS.livingRed}`, { value: c.r }),
                api.put(`/values/${LIGHTS.livingGreen}`, { value: c.g }),
                api.put(`/values/${LIGHTS.livingBlue}`, { value: c.b }),
                api.put(`/values/${LIGHTS.livingWhite}`, { value: c.w }),
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
    const timeout = setTimeout(() => {
        setLivingRoomColor(color);
    }, 100);

    return () => clearTimeout(timeout);
    }, [color]);

    const handleLightLivingRoom = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedLivingRoom(isChecked);

        try {
            const res = await api.put(`/values/${LIGHTS.livingRGB}`, {
                value: isChecked ? 1 : 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <h1 className="header">Smart Home - Praktikanten</h1>
            <div className="container">


                <div className="card">
                    <p className="title">Licht Flur</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={checkedHallway}
                            onChange={handleLightHallway}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="card">
                    <p className="title">Licht Schlafzimmer</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={checkedBedroom}
                            onChange={handleLightBedroom}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="card">
                    <p className="title">Licht Wohnzimmer</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={checkedLivingRoom}
                            onChange={handleLightLivingRoom}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="card">
                <p className="title">RGB Wohnzimmer</p>
                    <div className="slider-group">
                        <label>R</label>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={color.r}
                            onChange={(e) => updateColor({ r: +e.target.value })}
                        />
                        <span className="counter">{color.r}</span>
                    </div>

                    <div className="slider-group">
                        <label>G</label>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={color.g}
                            onChange={(e) => updateColor({ g: +e.target.value })}
                        />
                        <span className="counter">{color.g}</span>
                    </div>

                    <div className="slider-group">
                        <label>B</label>
                        <input
                            type="range"
                            min="0"
                            max="255"
                            value={color.b}
                            onChange={(e) => updateColor({ b: +e.target.value })}
                        />
                        <span className="counter">{color.b}</span>
                    </div>

                </div>

                <div className="card-buttons">
                    <button className="button danger" onClick={handlePutEverythingOut}>
                        PUT EVERYTHING OUT
                    </button>

                    <button className="button" onClick={handleGet}>
                        GET
                    </button>
                </div>
            </div>
        </>
    );
}

export default LightController;
