export default function Timer(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
