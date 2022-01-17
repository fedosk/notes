export function hashtagCreate(text: string) {
    let hashtags = text.match(/#[a-zа-я]+/gi)
    if (hashtags === null) {
        hashtags = []
    }
    return hashtags
}