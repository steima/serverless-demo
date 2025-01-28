export function getStage() {
    let stage = process.env.STAGE;
    if (!stage) {
        console.warn("No STAGE environment variable set, defaulting to dev");
        stage = "dev";
    }
    return stage;
}