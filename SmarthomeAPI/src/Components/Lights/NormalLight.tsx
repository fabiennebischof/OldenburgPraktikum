import "../LightController/LightController.css";

type NormalLightProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

export default function NormalLight({ label, checked, onChange }: NormalLightProps) {
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