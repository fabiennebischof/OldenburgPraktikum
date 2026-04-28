import { api } from "../api";

function LightController() {

    const handleGet = async () => {
        try {
            const res = await api.get("/uiconfig");
            console.log(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <h1>LightController funktioniert</h1>
            <button onClick={handleGet}>GET</button>
        </div>
    );
}

export default LightController;
