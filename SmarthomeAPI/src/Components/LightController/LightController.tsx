import "./LightController.css";
import { NormalLight, Dimmer, RgbLight } from "../Lights";
import { useSmartHome } from "../../hooks/useSmartHome";
import { LIGHTS } from "../../constants/lights";

function LightController() {
    const {
        lights,
        rgbEnabled,
        rgb,
        brightness,
        toggle,
        toggleRGB,
        updateRGB,
        updateBrightness,
        setAll,
    } = useSmartHome();

    return (
        <>
            <h1 className="header">Smart Home</h1>

            <div className="container">

                <NormalLight
                    label="Flur Licht"
                    checked={lights.hallway}
                    onChange={(v) => toggle("hallway", LIGHTS.hallway, v)}
                />

                <NormalLight
                    label="Schlafzimmer Licht"
                    checked={lights.bedroom}
                    onChange={(v) => toggle("bedroom", LIGHTS.bedroom, v)}
                />

                <Dimmer
                    label="Dimmer 1"
                    checked={lights.dim1}
                    onChange={(v) => toggle("dim1", LIGHTS.dim1, v)}
                />

                <Dimmer
                    label="Dimmer 2"
                    checked={lights.dim2}
                    onChange={(v) => toggle("dim2", LIGHTS.dim2, v)}
                />

                <RgbLight
                    room="living"
                    title="Wohnzimmer RGB"
                    rgbEnabled={rgbEnabled.living}
                    rgb={rgb.living}
                    brightness={brightness.living}
                    toggleRGB={toggleRGB}
                    updateRGB={updateRGB}
                    updateBrightness={updateBrightness}
                />

                <RgbLight
                    room="bedroom"
                    title="Schlafzimmer RGB"
                    rgbEnabled={rgbEnabled.bedroom}
                    rgb={rgb.bedroom}
                    brightness={brightness.bedroom}
                    toggleRGB={toggleRGB}
                    updateRGB={updateRGB}
                    updateBrightness={updateBrightness}
                />

                <RgbLight
                    room="hallway"
                    title="Flur RGB"
                    rgbEnabled={rgbEnabled.hallway}
                    rgb={rgb.hallway}
                    brightness={brightness.hallway}
                    toggleRGB={toggleRGB}
                    updateRGB={updateRGB}
                    updateBrightness={updateBrightness}
                />

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