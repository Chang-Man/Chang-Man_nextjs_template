export {};

declare global {
  interface IResponse<T> {
    statusCode: string;
    message: string;
    data: T;
  }

  interface INovel {
    id: number;
    title: string;
    episodeIndex: number;
    storyIndex: number;
    createdAt: string;
    updatedAt: string;
  }
}
