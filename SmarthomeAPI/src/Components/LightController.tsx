import { useState } from "react";
import { api } from "../api";
import "./LightController.css";

type Room = "living" | "bedroom" | "hallway";

const LIGHTS = {
    all: "a02p",

    dim1: "a01c",
    dim2: "a01f",

    hallway: "a001",
    bedroom: "a00j",

    rgb: {
        living: { base: "a013", r: "a015", g: "a016", b: "a017" },
        bedroom: { base: "a031", r: "a033", g: "a034", b: "a035" },
        hallway: { base: "a02s", r: "a02u", g: "a02v", b: "a02w" },
    },
};

function LightController() {
    const [lights, setLights] = useState({
        hallway: false,
        bedroom: false,
        dim1: false,
        dim2: false,
    });

    const [rgbEnabled, setRgbEnabled] = useState<Record<Room, boolean>>({
        living: false,
        bedroom: false,
        hallway: false,
    });

    const [rgb, setRgb] = useState<Record<Room, { r: number; g: number; b: number }>>({
        living: { r: 128, g: 128, b: 128 },
        bedroom: { r: 128, g: 128, b: 128 },
        hallway: { r: 128, g: 128, b: 128 },
    });

    const toggle = async (key: keyof typeof lights, apiKey: string, value: boolean) => {
        setLights(prev => ({ ...prev, [key]: value }));

        try {
            await api.put(`/values/${apiKey}`, { value: value ? 1 : 0 });
        } catch (err) {
            console.error(err);
        }
    };

    const toggleRGB = async (room: Room, value: boolean) => {
        setRgbEnabled(prev => ({ ...prev, [room]: value }));

        try {
            await api.put(`/values/${LIGHTS.rgb[room].base}`, {
                value: value ? 1 : 0,
            });
        } catch (err) {
            console.error(err);
        }
    };

    const updateRGB = async (room: Room, key: "r" | "g" | "b", value: number) => {
        if (!rgbEnabled[room]) return;

        const updated = { ...rgb[room], [key]: value };
        setRgb(prev => ({ ...prev, [room]: updated }));

        try {
            await Promise.all([
                api.put(`/values/${LIGHTS.rgb[room].r}`, { value: updated.r }),
                api.put(`/values/${LIGHTS.rgb[room].g}`, { value: updated.g }),
                api.put(`/values/${LIGHTS.rgb[room].b}`, { value: updated.b }),
            ]);
        } catch (err) {
            console.error(err);
        }
    };

    const setAll = async (value: 0 | 1) => {
        try {
            await api.put(`/values/${LIGHTS.all}`, { value });
        } catch (err) {
            console.error(err);
        }
    };

    const renderSwitch = (label: string, checked: boolean, onChange: any) => (
        <div className="card">
            <p className="title">{label}</p>
            <label className="switch">
                <input type="checkbox" checked={checked} onChange={onChange} />
                <span className="slider"></span>
            </label>
        </div>
    );

    const renderRGB = (room: Room, title: string) => {
        const { r, g, b } = rgb[room];

        return (
            <div className="card">
                <div className="rgb-container">
                    <p className="title">{title}</p>

                    <label className="switch">
                        <input
                            type="checkbox"
                            checked={rgbEnabled[room]}
                            onChange={(e) => toggleRGB(room, e.target.checked)}
                        />
                        <span className="slider"></span>
                    </label>

                    {(["r", "g", "b"] as const).map((color) => (
                        <div key={color}>
                            <div className="rgb-label">
                                <span>{color.toUpperCase()}</span>
                                <span>{rgb[room][color]}</span>
                            </div>

                            <input
                                className="rgb-slider"
                                type="range"
                                min="0"
                                max="255"
                                value={rgb[room][color]}
                                disabled={!rgbEnabled[room]}
                                onChange={(e) =>
                                    updateRGB(room, color, Number(e.target.value))
                                }
                            />
                        </div>
                    ))}

                    <div
                        className="color-preview"
                        style={{ backgroundColor: `rgb(${r}, ${g}, ${b})` }}
                    />
                </div>
            </div>
        );
    };

    return (
        <>
            <h1 className="header">Smart Home</h1>

            <div className="container">
                {renderSwitch("Flur Licht", lights.hallway, (e: any) =>
                    toggle("hallway", LIGHTS.hallway, e.target.checked)
                )}

                {renderSwitch("Schlafzimmer Licht", lights.bedroom, (e: any) =>
                    toggle("bedroom", LIGHTS.bedroom, e.target.checked)
                )}

                {renderSwitch("Dimmer 1", lights.dim1, (e: any) =>
                    toggle("dim1", LIGHTS.dim1, e.target.checked)
                )}

                {renderSwitch("Dimmer 2", lights.dim2, (e: any) =>
                    toggle("dim2", LIGHTS.dim2, e.target.checked)
                )}

                {renderRGB("living", "Wohnzimmer RGB")}
                {renderRGB("bedroom", "Schlafzimmer RGB")}
                {renderRGB("hallway", "Flur RGB")}

                <div className="card-buttons">
                    <button className="button danger" onClick={() => setAll(0)}>
                        ALLES AUS
                    </button>

                    <button className="button danger" onClick={() => setAll(1)}>
                        ALLES AN
                    </button>
                </div>
            </div>
        </>
    );
}

export default LightController;