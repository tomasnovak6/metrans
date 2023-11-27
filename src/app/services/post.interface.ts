/**
 * Interface pro data z /posts
 */
export interface PostInterface {
  userId: number,
  id: number,
  title: string,
}

/**
 * Interface pro formularova pole.
 */
export interface PostFormInterface {
  userId: number,
  title: string,
}

/**
 * Interface pro toast hlasky.
 */
export interface ToastMessageInterface {
  severity: string,
  summary: string,
}
