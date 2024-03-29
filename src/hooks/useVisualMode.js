import { useState } from "react";

export default function useVisualMode(initial) {
  // const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newMode, replace = false) {
    setHistory(replace ? prev => [...prev.slice(0,-1), newMode] : prev => [...prev, newMode]);
  }

  function back() {
    setHistory(prev => history.length > 1 ? [...prev.slice(0, prev.length - 1)] : prev);
  }

  return { mode: history[history.length -1], transition, back };
}

