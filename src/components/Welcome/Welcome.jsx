import React from "react";
import CreateSVG from "../../assets/create.svg";
import UploadSVG from "../../assets/upload.svg";
import "./Welcome.css";

function Welcome() {
    return (
        <div className="outer-div">
            <div className="container">
                <span className="text">
                    Welcome <b>User!</b>
                </span>
                <div className="box">
                    <div className="create-box">
                        <img src={CreateSVG} alt="Create Resume" />
                        <span>
                            Create Your <b>Resume</b>
                        </span>
                    </div>
                    <div className="upload-box">
                        <img src={UploadSVG} alt="Upload Resume" />
                        <span>
                            Upload & Modify existing <b>Resume</b>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Welcome;
