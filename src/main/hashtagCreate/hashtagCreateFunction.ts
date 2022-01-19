export function hashtagCreate(text: string) {
    let hashtags = text.match(/#[a-zа-я0-9]+/gi)
    if (hashtags === null) {
        hashtags = []
    }
    return hashtags
}