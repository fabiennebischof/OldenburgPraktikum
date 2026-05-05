import "../LightController/LightController.css";


type DimmerProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

export default function Dimmer({ label, checked, onChange }: DimmerProps) {
    return (
        <div className="card">
            <p className="title">{label}</p>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={checked}
                    onChange={(e) => onChange(e.target.checked)}
                />
                <span className="slider"></span>
            </label>
        </div>
    );
}
