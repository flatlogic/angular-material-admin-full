export interface TimeLineItem {
  img: string,
  name: string,
  date: {
    day: string,
    time: string,
  },
  nik: string,
  datePublish: string,
  description: string,
  title?: string,
  content: {
    type?: string,
    img?: string,
    text?: string
  },
  likes: Like[],
  comments: Comment[]
}

export interface Comment {
  img: string,
  name: string,
  date: string,
  comment: string
}

export interface Like {
  img: string,
}
