export function getStage() {
    let stage = process.env.stage;
    if (!stage) {
        stage = "dev";
    }
    return stage;
}