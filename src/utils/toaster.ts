import { Intent, OverlayToaster, Position } from "@blueprintjs/core";

/** Singleton toaster instance. Create separate instances for different options. */
export const AppToaster = OverlayToaster.create({
  className: "recipe-toaster",
  position: Position.TOP,
});

export const toast = (message?: string) => {
  AppToaster.show({ message: message, intent: Intent.PRIMARY })
}
toast.primary = (message: string) => {
  AppToaster.show({ message: message, intent: Intent.PRIMARY })
}
toast.sucess = (message: string) => {
  AppToaster.show({ message: message, intent: Intent.SUCCESS })
}
toast.error = (message: string) => {
  AppToaster.show({ message: message, intent: Intent.DANGER })
}
toast.warning = (message: string) => {
  AppToaster.show({ message: message, intent: Intent.WARNING })
}
