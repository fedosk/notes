export function hashtagCreate(text: string) {
    let hashtags = text.match(/#[a-z]+/gi)
    if (hashtags === null) {
        hashtags = []
    }
    return hashtags
}