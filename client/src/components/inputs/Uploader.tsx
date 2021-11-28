import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

interface UploaderProps {
  label: string;
  uploadername: string;
  lebar?: number;
  placeholder?: string;
  maxfilesize?: number;
  type: "image" | "file";
  handlefunc?: (name: string, value: string) => void;
}

const Uploader: React.FC<UploaderProps> = ({
  label,
  uploadername,
  lebar,
  placeholder,
  type,
  maxfilesize,
  handlefunc,
}) => {
  //state && others variable
  const [enablepopup, setenablepopup] = useState<boolean>(false);
  const [enableuploadbutton, setenableuploadbutton] = useState<boolean>(false);
  const [api_url, set_api_url] = useState<string>("");
  const [uploaded_file, set_uploaded_file] = useState<File>();
  const [respon_msg, set_repson_msg] = useState<string>("");
  const [error, set_error] = useState<{ error: Boolean; msg?: string }>({
    error: false,
    msg: "",
  });
  const popupref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (type === "image") {
      set_api_url("http://localhost:3030/upload/image");
    } else {
      set_api_url("http://localhost:3030/upload/file");
    }
  }, [type]);

  const showPopUp = () => {
    setenablepopup(true);
  };

  useEffect(() => {
    const closepopup = (e: any) => {
      if (popupref.current && !popupref.current.contains(e.target)) {
        setenablepopup(false);
        setenableuploadbutton(false);
        set_error({ error: false });
      }
    };
    document.addEventListener("mousedown", closepopup);
    return () => {
      document.removeEventListener("mousedown", closepopup);
    };
  });

  const localhandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { files } = e.target;
    const temp_file = files?.item(0);
    if (temp_file) {
      if (maxfilesize && temp_file.size > maxfilesize) {
        let size_in_mb = (maxfilesize / (1024 * 1000))
        return set_error({
          error: true,
          msg: "Max. size is " + size_in_mb + " MB",
        });
      } else {
        set_error({error: false})
        setenableuploadbutton(true);
        return set_uploaded_file(temp_file);
      }
    } else {
      setenableuploadbutton(false);
      return set_error({
        error: true,
        msg: "Please choose 1 file",
      });
    }
  };

  const uploadhandler = async () => {
    let form_data = new FormData();
    uploaded_file && form_data.append(type, uploaded_file);
    axios
      .post(api_url, form_data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((respon) => {
        handlefunc && handlefunc(uploadername, respon.data);
        set_repson_msg(respon.data);
      })
      .catch((error) => set_error({ error: true, msg: "Failed to Upload" }));
    setenableuploadbutton(false);
    setenablepopup(false);
    set_error({ error: false });
  };
  return (
    <InputWrapper lebar={lebar}>
      {label && <Label htmlFor="resultname">{label + ":"}</Label>}
      <Input
        type="text"
        name="resultname"
        lebar={lebar}
        value={respon_msg}
        readOnly
        onClick={showPopUp}
        placeholder={placeholder}
      />
      {enablepopup && (
        <PopUpWrapper ref={popupref} lebar={lebar}>
          <InnerPopUpWrapper>
            <Row flex centerized>
              <span>Choose a File</span>
              <Input
                type="file"
                name={uploadername}
                onChange={localhandler}
                style={{ marginLeft: 4, marginRight: 4 }}
              />
              <Row>
                {error.error && (
                  <p style={{ color: "red", paddingBottom: 2 }}>{error.msg}</p>
                )}
              </Row>
            </Row>

            {enableuploadbutton && (
              <Row centerized>
                <UploadButton
                  mode="success"
                  onClick={uploadhandler}
                  type="button"
                >
                  Upload
                </UploadButton>
              </Row>
            )}
          </InnerPopUpWrapper>
        </PopUpWrapper>
      )}
    </InputWrapper>
  );
};
export default Uploader;
const InputWrapper = styled.div<{ lebar?: number }>`
  display: flex;
  position: relative;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 4px 6px;
  gap: 4px;
  font-size: 0.78rem;
  border: 1px solid #3232322b;
  ${(props) => !props.lebar && "flex: 1;"}
`;

const dropdown = keyframes`
0% {
  transform: scaleY(0);
} 100% {
  transform: scaleY(1);
}
`;

const Label = styled.label`
  margin-right: 5px;
`;

const Input = styled.input<{ lebar?: number }>`
  cursor: default;
  border: none;
  outline: none;
  background: #dedede;
  font-size: 0.72rem;
  font-family: "Fira Sans", sans-serif;
  padding: 2px 4px;
  box-shadow: inset 1px 1px 2px 1px #3232321b;
  ${(props) => (props.lebar ? "width: " + props.lebar + "px;" : "flex: 1;")}
  color: #1c1c1c;
  &:hover {
    cursor: pointer;
  }
  &:disabled {
    color: #525252;
  }
`;

const PopUpWrapper = styled.div<{ lebar?: number }>`
  position: absolute;
  background: rgba(255, 255, 255, 0.96);
  border-radius: 5px;
  box-shadow: 3px 3px 6px 4px #3232322b;
  z-index: 10;
  margin: 0 4px;
  left: 30%;
  top: 28px;
  display: flex;
  transform-origin: center top;
  animation: ${dropdown} 0.15s;
`;
const InnerPopUpWrapper = styled.div`
  padding: 4px;
  margin: 4px;
  background: #ddd;
  box-shadow: inset 1px 1px 2px 1px #3232321b;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Row = styled.div<{ centerized?: boolean; flex?: boolean }>`
  position: relative;
  box-shadow: 1px 1px 2px 1px #3232321b;
  background: white;
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${(props) =>
    props.centerized && "justify-content: center; align-items: center;"}
  ${(props) => props.flex && "flex: 1;"}
`;
const UploadButton = styled.button<{
  mode?: "success" | "warning" | "default" | "primary";
}>`
  margin: 4px auto;
  background: none;
  ${(props) =>
    props.mode === "success"
      ? "background: #128C7E;color: white;"
      : "background: none;color: #323232;"}
  border: 1px solid #3232323b;
  font-family: "Fira Sans", sans-serif;
  outline: none;
  padding: 2px 6px;
  font-size: 0.7rem;
  font-weight: 400;
  &:hover {
    cursor: pointer;
    ${(props) =>
      props.mode === "success" ? "background: #075E54;" : "background: none;"}
  }
  &:disabled {
    cursor: default;
  }
`;
