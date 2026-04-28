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

    // const handlePost = async () => {
    //     try {
    //         const res = await api.post("/values/a001", {
    //             value: "0"
    //         });
    //         console.log(res.data);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    return (
        <div>
            <h1>LightController funktioniert</h1>
            <button onClick={handleGet}>GET</button>
            {/* <button onClick={handlePost}>POST</button> */}
        </div>
    );
}

export default LightController;
