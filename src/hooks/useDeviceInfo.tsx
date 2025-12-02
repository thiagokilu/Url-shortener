import { useEffect, useState } from "react";

export function useDeviceInfo() {
  const [device, setDevice] = useState("Desconhecido");

  useEffect(() => {
    const ua = navigator.userAgent;

    if (/Windows/i.test(ua)) setDevice("Windows");
    else if (/Linux/i.test(ua)) setDevice("Linux");
    else if (/Android/i.test(ua)) setDevice("Android");
    else if (/iPhone|iPad|iOS/i.test(ua)) setDevice("iOS");
    else if (/Mac/i.test(ua)) setDevice("MacOS");
  }, []);

  return device;
}
