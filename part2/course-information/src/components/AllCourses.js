const AllCourses = function ({ courses }) {
    return (
        <>
            {courses.map((course) =>
                <Course key={course.id} course={course} />
            )}
        </>

    )
}

const Course = function ({ course }) {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const Content = ({ parts }) =>
    <>
        {parts.map(part =>
            <Part key={part.id} part={part} />
        )}
    </>


const Header = ({ course }) => <h1>{course}</h1>

const Total = function ({ parts }) {
    const total = parts.reduce((sum, part) => sum += part.exercises, 0)

    return (
        <p>total of {total} exercises</p>
    )
}

const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>


export default AllCourses