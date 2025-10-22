export const playSlideSound = () => {
    const sound = new Audio("slide.wav");
    sound.volume = 1;
    sound.play().catch(err => console.error("Slide sound error:", err));
};

export const playMergeSound = () => {
    const sound = new Audio("merge.wav");
    sound.volume = 1;
    sound.play().catch(err => console.error("Merge sound error:", err));
};
