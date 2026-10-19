import { API_URL, ApiFailure, ApiSuccess } from "@/types/api-clientTypes";



export class ApiError extends Error {
    code: string;
    details?: Record<string, unknown>;

    constructor (code : string, message: string, details?: Record<string, unknown>) {
        super(message);
        this.code = code ; 
        this.details = details;

    }

}


export async function apiFetch<T>(path: string, options?: RequestInit): Promise<{ data: T; meta?: ApiSuccess<T>["meta"] }> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { "Content-Type": "application/json", ...options?.headers },
  });

  const body: ApiSuccess<T> | ApiFailure = await res.json();

  if (!body.success) {
    throw new ApiError(body.error.code, body.error.message, body.error.details);
  }

  return { data: body.data, meta: body.meta };
}

