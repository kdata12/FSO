const Person = function ({ persons }) {
    return (
        <>
            {persons.map(person =>
                <p>
                    {person.name} {person.number}
                </p>
            )}
        </>
    )
}

const PersonForm = function ({ onSubmit, values, onChange }) {
    return (
        <>
            <form onSubmit={onSubmit}>
                <div>
                    name: <input value={values[0]} onChange={onChange[0]} />
                </div>
                <div>
                    number: <input value={values[1]} onChange={onChange[1]} />
                </div>
                <div>
                    <button type="submit">add</button>
                </div>
            </form>
        </>

    )

}

const Filter = function (props) {
    return (
        <>
            Filter names: <input value={props.value} onChange={props.onChange} />
        </>
    )
}

export {Person, PersonForm, Filter}
