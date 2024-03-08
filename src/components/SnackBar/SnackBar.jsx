import { useEffect, useState } from "react";
import { eventBusService } from "../../services/event-bus.service";
import IconButton from "../IconButton/IconButton";

export function Snackbar() {
  const [msg, setMsg] = useState(null);

  useEffect(() => {
    const unsubscribe = eventBusService.on("show-message", (msg) => {
      setMsg(msg);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  function onCloseMsg() {
    setMsg(null);
  }

  if (!msg) return <></>;
  return (
    <div className="snack-bar">
      <p>{msg.message}</p>
      <IconButton onClick={onCloseMsg}>
        <button>X</button>
      </IconButton>
    </div>
  );
}
