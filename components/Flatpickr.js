import { useEffect, useRef } from "preact/hooks";
import { html } from "htm/preact";
import flatpickr from "flatpickr";

export function Flatpickr({ value, onChange }) {
  const ref = useRef(null);
  const fpRef = useRef(null);
  useEffect(() => {
    fpRef.current = flatpickr(ref.current, {
      defaultDate: value * 1000,
      enableTime: true,
      time_24hr: true,
      disableMobile: true,
      onChange: ([val]) => onChange(Math.floor(val.getTime() / 1000)),
    });
    return () => fpRef.current.destroy();
  }, []);
  useEffect(() => {
    if (!fpRef.current) return;
    fpRef.current.setDate(value * 1000);
  }, [value]);
  return html`
  <div class="row">
    <input class="column" ref=${ref}/>
    <button class="button-clear" onclick=${() =>
    onChange(Math.floor(Date.now() / 1000))}>Set to now</button>
  </div>
  `;
}