import { useState } from "react";
import { api } from "../api";
import './LightController.css';

function LightController() {

    const [checkedHallway, setCheckedHallway] = useState(false);
    const [checkedBedroom, setCheckedBedroom] = useState(false);
    const [checkedLivingRoom, setCheckedLivingRoom] = useState(false);
    const [checkedDim, setCheckedDim] = useState(false);

    const [red, setRed] = useState(128);
    const [green, setGreen] = useState(128);
    const [blue, setBlue] = useState(128);

    const LIGHTS = {
        hallway: "a001",
        bedroom: "a00j",
        livingRoom: "a013",

        livingDimmer: "a01c",
        livingRed: "a015",
        livingGreen: "a016",
        livingBlue: "a017",
    };

    const handleRGBChange = async (r: number, g: number, b: number) => {
        if (!checkedLivingRoom) return;

        try {
            await Promise.all([
                api.put(`/values/${LIGHTS.livingRed}`, { value: r }),
                api.put(`/values/${LIGHTS.livingGreen}`, { value: g }),
                api.put(`/values/${LIGHTS.livingBlue}`, { value: b }),
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateRed = (value: number) => {
        setRed(value);
        handleRGBChange(value, green, blue);
    };

    const updateGreen = (value: number) => {
        setGreen(value);
        handleRGBChange(red, value, blue);
    };

    const updateBlue = (value: number) => {
        setBlue(value);
        handleRGBChange(red, green, value);
    };

    const handlePutEverythingOut = async () => {
        try {
            await api.put("/values/a02p", { value: 0 });
        } catch (err) {
            console.error(err);
        }
    };

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
            await api.put(`/values/${LIGHTS.hallway}`, {
                value: isChecked ? 1 : 0
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleLightBedroom = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedBedroom(isChecked);

        try {
            await api.put(`/values/${LIGHTS.bedroom}`, {
                value: isChecked ? 1 : 0
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleLightLivingRoom = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedLivingRoom(isChecked);

        try {
            await api.put(`/values/${LIGHTS.livingRoom}`, {
                value: isChecked ? 1 : 0
            });
        } catch (err) {
            console.error(err);
        }
    };


    const handleDim = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedDim(isChecked);

        try {
            await api.put(`/values/${LIGHTS.livingDimmer}`, {
                value: isChecked ? 1 : 0
            });
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
                    <p className="title">Dimmen</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={checkedDim}
                            onChange={handleDim}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="card">
                    <div className="rgb-container">

                        <p className="title">Licht Wohnzimmer</p>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={checkedLivingRoom}
                                onChange={handleLightLivingRoom}
                            />
                            <span className="slider"></span>
                        </label>

                        <div className="rgb-label">
                            <span>Rot</span>
                            <span>{red}</span>
                        </div>
                        <input
                            className="rgb-slider"
                            type="range"
                            min="0"
                            max="255"
                            value={red}
                            disabled={!checkedLivingRoom}
                            onChange={(e) => updateRed(Number(e.target.value))}
                        />

                        <div className="rgb-label">
                            <span>Grün</span>
                            <span>{green}</span>
                        </div>
                        <input
                            className="rgb-slider"
                            type="range"
                            min="0"
                            max="255"
                            value={green}
                            disabled={!checkedLivingRoom}
                            onChange={(e) => updateGreen(Number(e.target.value))}
                        />

                        <div className="rgb-label">
                            <span>Blau</span>
                            <span>{blue}</span>
                        </div>
                        <input
                            className="rgb-slider"
                            type="range"
                            min="0"
                            max="255"
                            value={blue}
                            disabled={!checkedLivingRoom}
                            onChange={(e) => updateBlue(Number(e.target.value))}
                        />

                        <div
                            className="color-preview"
                            style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
                        />
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