export {};

declare global {
  interface IResponse<T> {
    statusCode: string;
    message: string;
    data: T;
  }

  interface IPost {
    id: number;
    title: string;
    createdAt: string;
    updatedAt: string;
  }
}
