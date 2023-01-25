import express from 'express'
import calculateBmi from './bmiCalculator';
const app = express();


app.get('/bmi', (req, res) => {
    const { height, weight } = req.query
    if (!(height && weight)) {
        res.json({
            error: "malformatted parameters"
        })
    }

    res.json({
        weight,
        height,
        bmi: calculateBmi(Number(height), Number(weight))
    })
})

const PORT = 3004

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`http://localhost:${PORT}/`)
})