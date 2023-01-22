interface result {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseSched: Array<number> = [1.5, 1.5, 0, 1.5, 0, 1.5, 0]

const calculateExercises = (schedule: Array<number>, target: number): result => {
    const periodLength = schedule.length
    const trainingDays = schedule.reduce((acc, curr) => acc + (curr !== 0 ? 1 : 0), 0)
    const success = true
    const rating = 3
    const ratingDescription = "Hooray"
    const average = (schedule.reduce((acc, curr) => acc + curr, 0)) / schedule.length

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        average,
        target,
    }
}

console.log(calculateExercises(exerciseSched, 4))

