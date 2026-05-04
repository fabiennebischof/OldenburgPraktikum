import { useState } from "react";
import { api } from "../api";
import './LightController.css';

function LightController() {

    const [checkedHallway, setCheckedHallway] = useState(false);
    const [checkedHallwayRGB, setCheckedHallwayRGB] = useState(false);
    const [checkedBedroom, setCheckedBedroom] = useState(false);
    const [checkedBedroomRGB, setCheckedBedroomRGB] = useState(false);
    //const [checkedLivingRoom, setCheckedLivingRoom] = useState(false);
    const [checkedLivingRoomRGB, setCheckedLivingRoomRGB] = useState(false);
    const [checkedDim1, setCheckedDim1] = useState(false);
    const [checkedDim2, setCheckedDim2] = useState(false);

    const [red, setRed] = useState(128);
    const [green, setGreen] = useState(128);
    const [blue, setBlue] = useState(128);

    const LIGHTS = {
        allLighsOn: "a02p",

        hallway: "a001",
        hallwayRGB: "a02s",

        bedroom: "a00j",
        bedroomRGB: "a031",

        livingRoomRGB: "a013",
    
        livingDim1: "a01c",
        livingDim2: "a01f",

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

    const handleTurnEverythingOn = async () => {
        try {
            await api.put("/values/a02p", { value: 1 });
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

    const handleLightHallwayRGB = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedHallwayRGB(isChecked);

        try {
            await api.put(`/values/${LIGHTS.hallwayRGB}`, {
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

    const handleLightBedroomRGB = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedBedroomRGB(isChecked);

        try {
            await api.put(`/values/${LIGHTS.bedroomRGB}`, {
                value: isChecked ? 1 : 0
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleLightLivingRoomRGB = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedLivingRoomRGB(isChecked);

        try {
            await api.put(`/values/${LIGHTS.livingRoomRGB}`, {
                value: isChecked ? 1 : 0
            });
        } catch (err) {
            console.error(err);
        }
    };


    const handleDim1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedDim1(isChecked);

        try {
            await api.put(`/values/${LIGHTS.livingDim1}`, {
                value: isChecked ? 1 : 0
            });
        } catch (err) {
            console.error(err);
        }
    };

    const handleDim2 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedDim2(isChecked);

        try {
            await api.put(`/values/${LIGHTS.livingDim2}`, {
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
                            checked={checkedDim1}
                            onChange={handleDim1}
                        />
                        <span className="slider"></span>
                    </label>
                </div>

                <div className="card">
                    <p className="title">Dimmen 2</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={checkedDim2}
                            onChange={handleDim2}
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
                                checked={checkedLivingRoomRGB}
                                onChange={handleLightLivingRoomRGB}
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
                            disabled={!checkedLivingRoomRGB}
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
                            disabled={!checkedLivingRoomRGB}
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
                            disabled={!checkedLivingRoomRGB}
                            onChange={(e) => updateBlue(Number(e.target.value))}
                        />

                        <div
                            className="color-preview"
                            style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="rgb-container">

                        <p className="title">Licht Schlafzimmer</p>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={checkedBedroomRGB}
                                onChange={handleLightBedroomRGB}
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
                            disabled={!checkedBedroomRGB}
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
                            disabled={!checkedBedroomRGB}
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
                            disabled={!checkedBedroomRGB}
                            onChange={(e) => updateBlue(Number(e.target.value))}
                        />

                        <div
                            className="color-preview"
                            style={{ backgroundColor: `rgb(${red}, ${green}, ${blue})` }}
                        />
                    </div>
                </div>

                <div className="card">
                    <div className="rgb-container">

                        <p className="title">Licht Flur</p>

                        <label className="switch">
                            <input
                                type="checkbox"
                                checked={checkedHallwayRGB}
                                onChange={handleLightHallwayRGB}
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
                            disabled={!checkedHallwayRGB}
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
                            disabled={!checkedHallwayRGB}
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
                            disabled={!checkedHallwayRGB}
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

                    <button className="button danger" onClick={handleTurnEverythingOn}>
                        TURN EVERYTHING ON
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