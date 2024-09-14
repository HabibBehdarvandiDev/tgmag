export interface ApiResponse<T = string | JSON> {
  status: "success" | "error";
  message?: string;
  data?: T;
  errors?: Record<string, string[]>;
}
