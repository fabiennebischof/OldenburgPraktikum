import { useState } from "react";
import { api } from "../api";
import './LightController.css';

function LightController() {

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

    const [checkedHallway, setCheckedHallway] = useState(false);
    const [checkedBedroom, setCheckedBedroom] = useState(false);
    const [checkedLivingRoom, setCheckedLivingRoom] = useState(false);
    const [checkedA1, setCheckedA1] = useState(false);

    const handleLightHallway = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedHallway(isChecked);

        try {
            const res = await api.put("/values/a000", {
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
            const res = await api.put("/values/a00j", {
                value: isChecked ? 1 : 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLightLivingRoom = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedLivingRoom(isChecked);

        try {
            const res = await api.put("/values/a012", {
                value: isChecked ? 1 : 0
            });
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleLightA1 = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const isChecked = e.target.checked;
        setCheckedA1(isChecked);

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
                    <p className="title">A1</p>
                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={checkedA1}
                            onChange={handleLightA1}
                        />
                        <span className="slider"></span>
                    </label>
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
