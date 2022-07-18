import { CSSProperties, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";

const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
};

export default function Loader(props) {
    const { isProcessing } = props;
    let [color] = useState("#00FF00");

    return (
        <ClipLoader color={color} loading={isProcessing} cssOverride={override} size={50} />

    );
};