import { X } from "lucide-react";
import { createContext, useContext, useEffect, useId, useMemo } from "react";
import { createPortal } from "react-dom";
import { cn } from "../../lib/utils.js";

const DialogContext = createContext(null);

function useDialogContext(component) {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`${component} must be used inside Dialog`);
  }
  return context;
}

export function Dialog({ open, onOpenChange, children }) {
  const titleId = useId();
  const descriptionId = useId();
  const value = useMemo(() => ({ open, onOpenChange, titleId, descriptionId }), [open, onOpenChange, titleId, descriptionId]);

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

export function DialogPortal({ children }) {
  const { open } = useDialogContext("DialogPortal");

  if (!open || typeof document === "undefined") return null;

  return createPortal(children, document.body);
}

export function DialogOverlay({ className = "", ...props }) {
  const { onOpenChange } = useDialogContext("DialogOverlay");

  return (
    <div
      className={cn("fixed inset-0 z-50 bg-black/75 backdrop-blur-sm data-[state=open]:animate-in", className)}
      data-state="open"
      onMouseDown={() => onOpenChange?.(false)}
      {...props}
    />
  );
}

export function DialogContent({ className = "", children, ...props }) {
  const { onOpenChange, titleId, descriptionId } = useDialogContext("DialogContent");

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") onOpenChange?.(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [onOpenChange]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <DialogPortal>
      <DialogOverlay />
      <div
        aria-describedby={descriptionId}
        aria-labelledby={titleId}
        aria-modal="true"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 gap-4 rounded-lg border border-zinc-800 bg-panel p-5 text-zinc-50 shadow-glow outline-none",
          className
        )}
        role="dialog"
        onMouseDown={(event) => event.stopPropagation()}
        {...props}
      >
        {children}
        <button
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-md border border-zinc-800 bg-zinc-900 text-zinc-300 transition hover:bg-zinc-800 hover:text-white focus:outline-none focus:ring-2 focus:ring-sky-300/40"
          type="button"
          title="Close"
          onClick={() => onOpenChange?.(false)}
        >
          <X size={16} />
        </button>
      </div>
    </DialogPortal>
  );
}

export function DialogHeader({ className = "", ...props }) {
  return <div className={cn("grid gap-2 pr-10", className)} {...props} />;
}

export function DialogFooter({ className = "", ...props }) {
  return <div className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />;
}

export function DialogTitle({ className = "", ...props }) {
  const { titleId } = useDialogContext("DialogTitle");

  return <h2 id={titleId} className={cn("text-xl font-semibold leading-none tracking-normal text-white", className)} {...props} />;
}

export function DialogDescription({ className = "", ...props }) {
  const { descriptionId } = useDialogContext("DialogDescription");

  return <p id={descriptionId} className={cn("text-sm leading-6 text-muted", className)} {...props} />;
}
