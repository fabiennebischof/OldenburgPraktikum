import "../LightController/LightController.css";
import { Lightbulb } from "lucide-react";

type NormalLightProps = {
    label: string;
    checked: boolean;
    onChange: (value: boolean) => void;
};

export default function NormalLight({ label, checked, onChange }: NormalLightProps) {
    return (
        <div className="card">
            <div className="card-header">
                <Lightbulb className="icon" />
                <span className="title">{label}</span>
            </div>

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