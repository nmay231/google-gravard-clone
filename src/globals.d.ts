declare interface Killed {
    dateClose: string
    dateOpen: string
    description: string
    link: string
    name: string
    type: 'service' | 'app' | 'hardware'
    slug: string
}
