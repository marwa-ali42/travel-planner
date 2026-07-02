import L from "leaflet";

export default function createNumberIcon(index: number) {
  return L.divIcon({
    className: "number-icon",
    html: `<div style="
      background:DodgerBlue;
      color:white;
      width:24px;
      height:24px;
      border-radius:50%;
      display:flex;
      align-items:center;
      justify-content:center;
      font-size:12px;
      font-weight:bold;
    ">${index}</div>`,
  });
}
