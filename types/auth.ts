export type FormMessageServer = {
  type: "success" | "error";
  message: string;
  isTwoFactor?: boolean;
};
