const calculateBmi = (height: number, weight: number): string => {
    let result: number = (weight / height / height) * 10000
    result = Number(result.toFixed(1))

    switch (true) {
        case result < 16.0:
            return 'Underweight (Severe thinness)'
        case 16 < result && result < 16.9:
            return 'Underweight (Moderate thinness)'
        case 17 < result && result < 18.4:
            return 'Underweight (Mild thinness)'
        case 18.5 < result && result < 24.9:
            return 'Normal range'
        case 25 < result && result < 29.9:
            return 'Overweight (Pre-obese)'
        case 30 < result && result < 34.9:
            return 'Obese (Class I)'
    }
    return "No valid range"
}

export default calculateBmi 