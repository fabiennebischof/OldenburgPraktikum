import "../LightController/LightController.css";

type Room = "living" | "bedroom" | "hallway";

type RgbLightProps = {
    room: Room;
    title: string;
    rgbEnabled: boolean;
    rgb: { r: number; g: number; b: number };
    brightness: number;

    toggleRGB: (room: Room, value: boolean) => void;
    updateRGB: (room: Room, key: "r" | "g" | "b", value: number) => void;
    updateBrightness: (room: Room, value: number) => void;
};

export default function RgbLight({
    room,
    title,
    rgbEnabled,
    rgb,
    brightness,
    toggleRGB,
    updateRGB,
    updateBrightness
}: RgbLightProps) {

    return (
        <div className="card">
            <div className="rgb-container">
                <p className="title">{title}</p>

                <label className="switch">
                    <input
                        type="checkbox"
                        checked={rgbEnabled}
                        onChange={(e) => toggleRGB(room, e.target.checked)}
                    />
                    <span className="slider"></span>
                </label>

                {(["r", "g", "b"] as const).map((color) => (
                    <div key={color}>
                        <div className="rgb-label">
                            <span>{color.toUpperCase()}</span>
                            <span>{rgb[color]}</span>
                        </div>

                        <input
                            className="rgb-slider"
                            type="range"
                            min="0"
                            max="255"
                            value={rgb[color]}
                            disabled={!rgbEnabled}
                            onChange={(e) =>
                                updateRGB(room, color, Number(e.target.value))
                            }
                        />
                    </div>
                ))}

                <div>
                    <div className="rgb-label">
                        <span>Brightness</span>
                        <span>{brightness}</span>
                    </div>

                    <input
                        className="rgb-slider"
                        type="range"
                        min="0"
                        max="255"
                        value={brightness}
                        disabled={!rgbEnabled}
                        onChange={(e) =>
                            updateBrightness(room, Number(e.target.value))
                        }
                    />
                </div>

                <div
                    className="color-preview"
                    style={{ backgroundColor: `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` }}
                />
            </div>
        </div>
    );
}