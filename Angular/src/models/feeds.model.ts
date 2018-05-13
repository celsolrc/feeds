import { Post } from './posts.model'

export class Feed {
    public _id: string
    public nome: string
    public url: string
    public posts: Post[]
}