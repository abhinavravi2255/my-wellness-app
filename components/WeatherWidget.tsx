"use client";

import { useEffect, useState } from "react";
import { Cloud, Sun, CloudRain, Snowflake, CloudLightning } from "lucide-react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; icon: React.ReactNode; desc: string } | null>(null);

  useEffect(() => {
    // Fetch weather for Vattiyoorkavu (Thiruvananthapuram)
    fetch("https://api.open-meteo.com/v1/forecast?latitude=8.5393&longitude=76.9934&current_weather=true")
      .then(res => res.json())
      .then(data => {
        if (data && data.current_weather) {
          const w = data.current_weather;
          const temp = Math.round(w.temperature);
          let icon = <Sun size={14} />;
          let desc = "Clear";
          
          if (w.weathercode <= 1) { icon = <Sun size={14} />; desc = "Clear"; }
          else if (w.weathercode <= 3) { icon = <Cloud size={14} />; desc = "Cloudy"; }
          else if (w.weathercode <= 49) { icon = <Cloud size={14} />; desc = "Foggy"; }
          else if (w.weathercode <= 69) { icon = <CloudRain size={14} />; desc = "Rain"; }
          else if (w.weathercode <= 79) { icon = <Snowflake size={14} />; desc = "Snow"; }
          else if (w.weathercode <= 99) { icon = <CloudLightning size={14} />; desc = "Storm"; }
          
          setWeather({ temp, icon, desc });
        }
      })
      .catch(() => {
        // Fallback if API fails
        setWeather({ temp: 28, icon: <Sun size={14} />, desc: "Clear" });
      });
  }, []);

  if (!weather) return null;

  return (
    <div style={{
      display: "flex", flexDirection: "column", gap: "12px",
      background: "var(--surface-2)", padding: "20px",
      borderRadius: "16px", border: "1px solid var(--border)",
      color: "var(--text-secondary)",
      boxShadow: "var(--shadow-card)",
      width: "100%", maxWidth: "160px"
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <span style={{ fontSize: "11px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text-muted)" }}>
          Vattiyoorkavu
        </span>
        <span style={{ color: "var(--primary)", transform: "scale(1.2)" }}>{weather.icon}</span>
      </div>
      <div>
        <div style={{ fontSize: "32px", fontWeight: 700, color: "var(--text-primary)", lineHeight: 1 }}>
          {weather.temp}°
        </div>
        <div style={{ fontSize: "13px", marginTop: "6px", color: "var(--text-muted)" }}>{weather.desc}</div>
      </div>
    </div>
  );
}
