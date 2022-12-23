const Person = function ({ persons, deleteOperation }) {
    return (
        <>
            {persons.map(person =>
                <p key={person.id}>
                    {person.name} {person.number}
                     <button onClick={() => deleteOperation(person.id)}>delete</button>
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
