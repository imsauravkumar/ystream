import Button from "./Button.jsx";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog.jsx";

export default function ConfirmDialog({ open, title, message, confirmLabel = "Confirm", cancelLabel = "Cancel", onConfirm, onCancel }) {
  return (
    <Dialog open={open} onOpenChange={(nextOpen) => !nextOpen && onCancel?.()}>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="ghost" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="danger" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
