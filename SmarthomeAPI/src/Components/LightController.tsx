import { useState } from "react";
import { api } from "../api";
import './LightController.css';

function LightController() {

    const [checkedHallway, setCheckedHallway] = useState(false);
    const [checkedHallwayRGB, setCheckedHallwayRGB] = useState(false);
    const [checkedBedroom, setCheckedBedroom] = useState(false);
    const [checkedBedroomRGB, setCheckedBedroomRGB] = useState(false);
    //const [checkedLivingRoom, setCheckedLivingRoom] = useState(false);
    const [checkedLivingroomRGB, setCheckedLivingRoomRGB] = useState(false);
    const [checkedDim1, setCheckedDim1] = useState(false);
    const [checkedDim2, setCheckedDim2] = useState(false);

    const [red, setRed] = useState(128);
    const [green, setGreen] = useState(128);
    const [blue, setBlue] = useState(128);

    const LIGHTS = {
        allLighsOnOff: "a02p",

        Dim1: "a01c",
        Dim2: "a01f",

        hallway: "a001",
        hallwayRGB: "a02s",

        hallwayRed: "a02u",
        hallwayGreen: "a02v",
        hallwayBlue: "a02w",
        //hallwayWhite: "a02x",
        //hallwayBrightness: "a02t",

        bedroom: "a00j",
        bedroomRGB: "a031",

        bedroomRed: "a033",
        bedroomGreen: "a034",
        bedroomBlue: "a035",
        //bedroomWhite: "a036",
        //bedroomBrightness: "a032",

        livingRoomRGB: "a013",

        livingRed: "a015",
        livingGreen: "a016",
        livingBlue: "a017",
        //livingWhite: "a018",
        //livingBrightness: "a014",
    };

    const handleLivingroomRGBChange = async (r: number, g: number, b: number) => {
        if (!checkedLivingroomRGB) return;

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

    const handleHallwayRGBChange = async (r: number, g: number, b: number) => {
        if (!checkedBedroomRGB) return;

        try {
            await Promise.all([
                api.put(`/values/${LIGHTS.hallwayRed}`, { value: r }),
                api.put(`/values/${LIGHTS.hallwayGreen}`, { value: g }),
                api.put(`/values/${LIGHTS.hallwayBlue}`, { value: b }),
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const handleBedroomRGBChange = async (r: number, g: number, b: number) => {
        if (!checkedHallwayRGB) return;

        try {
            await Promise.all([
                api.put(`/values/${LIGHTS.bedroomRed}`, { value: r }),
                api.put(`/values/${LIGHTS.bedroomGreen}`, { value: g }),
                api.put(`/values/${LIGHTS.bedroomBlue}`, { value: b }),
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const updateLivingRed = (value: number) => {
        setRed(value);
        handleLivingroomRGBChange(value, green, blue);
    };

    const updateLivingGreen = (value: number) => {
        setGreen(value);
        handleLivingroomRGBChange(red, value, blue);
    };

    const updateLivingBlue = (value: number) => {
        setBlue(value);
        handleLivingroomRGBChange(red, green, value);
    };


    const updateBedroomRed = (value: number) => {
        setRed(value);
        handleBedroomRGBChange(value, green, blue);
    };

    const updateBedroomGreen = (value: number) => {
        setGreen(value);
        handleBedroomRGBChange(red, value, blue);
    };

    const updateBedroomBlue = (value: number) => {
        setBlue(value);
        handleBedroomRGBChange(red, green, value);
    };


    const updateHallwayRed = (value: number) => {
        setRed(value);
        handleHallwayRGBChange(value, green, blue);
    };

    const updateHallwayGreen = (value: number) => {
        setGreen(value);
        handleHallwayRGBChange(red, value, blue);
    };

    const updateHallwayBlue = (value: number) => {
        setBlue(value);
        handleHallwayRGBChange(red, green, value);
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
            await api.put(`/values/${LIGHTS.Dim1}`, {
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
            await api.put(`/values/${LIGHTS.Dim2}`, {
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
                                checked={checkedLivingroomRGB}
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
                            disabled={!checkedLivingroomRGB}
                            onChange={(e) => updateLivingRed(Number(e.target.value))}
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
                            disabled={!checkedLivingroomRGB}
                            onChange={(e) => updateLivingGreen(Number(e.target.value))}
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
                            disabled={!checkedLivingroomRGB}
                            onChange={(e) => updateLivingBlue(Number(e.target.value))}
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
                            onChange={(e) => updateBedroomRed(Number(e.target.value))}
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
                            onChange={(e) => updateBedroomGreen(Number(e.target.value))}
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
                            onChange={(e) => updateBedroomBlue(Number(e.target.value))}
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
                            onChange={(e) => updateHallwayRed(Number(e.target.value))}
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
                            onChange={(e) => updateHallwayGreen(Number(e.target.value))}
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
                            onChange={(e) => updateHallwayBlue(Number(e.target.value))}
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