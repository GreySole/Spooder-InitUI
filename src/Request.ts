import { KeyedObject } from "@greysole/spooder-component-library";
import { NetworkInterface } from "./Types";
import { FieldValues } from "react-hook-form";

export interface InitData {
  nets: NetworkInterface[];
  themes: KeyedObject;
  config: KeyedObject;
}

export function prepareRestoreSettings(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  return new Promise<KeyedObject>((res, rej) => {
    fetch("/prepare_restore_settings", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        res(data);
      })
      .catch((e) => {
        rej(e);
      });
  });
}

export function restoreSettings(backupName: string, selections: string[]) {
  return new Promise<KeyedObject>((res, rej) => {
    fetch("/restore_settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ backupName, selections }),
    })
      .then((response) => response.json())
      .then((data) => {
        res(data);
      })
      .catch((e) => {
        rej(e);
      });
  });
}

export function getData() {
  return new Promise<InitData>((res, rej) => {
    fetch("/init", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data: InitData) => {
        console.log("GOT DATA", data);
        res(data);
      })
      .catch((e) => {
        console.error("ERROR", e);
        rej(e);
      });
  });
}

export function saveConfig(config: FieldValues) {
  return new Promise<KeyedObject>((res, rej) => {
    fetch("/save_config", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(config),
    })
      .then((response) => response.json())
      .then((data) => {
        res(data);
      })
      .catch((e) => {
        rej(e);
      });
  });
}

export function saveThemes(themes: FieldValues) {
  return new Promise<KeyedObject>((res, rej) => {
    fetch("/save_themes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(themes),
    })
      .then((response) => response.json())
      .then((data) => {
        res(data);
      })
      .catch((e) => {
        rej(e);
      });
  });
}
