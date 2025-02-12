export const fetchQuestions = async () => {
    try {
        const response = await import("./data/questions.json");
        if (!response) {
            throw new Error("Failed to fetch questions!");
        }

        return shuffle(response.default);
    } catch (error) {
        console.error("Error while fetching the questions: ", error);
        throw error;
    }
}

function shuffle(sourceArray: any) {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    return sourceArray;
}
