import { IStaticMethods } from "flyonui/flyonui";

declare global {
  interface Window {
    // FlyonUI
    HSStaticMethods: IStaticMethods;

    // Optional third-party libraries (if you use them)
    // _;
    // $: typeof import("jquery");
    // jQuery: typeof import("jquery");
    // DataTable;
    // Dropzone;
  }
}

export {};
