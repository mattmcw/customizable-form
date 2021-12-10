import { useState } from 'react'

interface FormField {
	label : string;
	name : string;
	value : string;
}

type ButtonEvent = React.MouseEvent<HTMLButtonElement>

const spaceRegExp : RegExp = new RegExp(' ', 'g')
const alphaNumRegExp : RegExp = /[^A-Za-z0-9]/g

/** Component representing form features **/
function Form () {
	const initState : FormField[] = [{
		label : 'First Name?',
		name : 'first_name',
		value : ''
	}]
	const [ formFields, setFormFieldValues ] = useState(initState);

	/**
	 * Prevents default behavior of form and displays form state
	 * 
	 * @param {Object} event 	Submit event
	 **/
	function displayForm ( event : React.FormEvent<HTMLFormElement> ) {
		event.preventDefault()
		console.dir(formFields)
	}

	/**
	 * Changes the label (display) and name (HTML safe name for accessability devices) of a field.
	 * 
	 * @param {number} index 	Indexed order of the field being edited
	 * @param {object} event 	Change event from changing the label input element
	 **/
	function changeLabel (index : number, event : React.ChangeEvent<HTMLInputElement> ) {
		const updatedFormFields : FormField[] = [ ...formFields ]
		updatedFormFields[index].label = event.target.value
		updatedFormFields[index].name = updatedFormFields[index].label.replace(alphaNumRegExp, '').replace(spaceRegExp, '_').toLowerCase()
		console.log(updatedFormFields.map((field : FormField) => field.label))
		setFormFieldValues(updatedFormFields)
	}

	/**
	 * Changes the value of a field.
	 * 
	 * @param {number} index 	Indexed order of the field being edited
	 * @param {object} event 	Change event from changing the value input element
	 **/
	function changeValue (index : number, event : React.ChangeEvent<HTMLInputElement> ) {
		const updatedFormFields : FormField[] = [ ...formFields ]
		updatedFormFields[index].value = event.target.value
		setFormFieldValues(updatedFormFields)
	}

	/**
	 * Creates a new blank field with empty label, name and value.
	 **/
	function addField (event : ButtonEvent) {
		const updatedFormFields : FormField[] = [ ...formFields ];
		console.log(updatedFormFields)
		const newFormField : FormField = {
			label : '',
			name : '',
			value : ''
		}
		updatedFormFields.push(newFormField)
		event.preventDefault()
		console.log(updatedFormFields.map((field : FormField) => field.label))
		setFormFieldValues(updatedFormFields)
	}

	/**
	 * Removes a field from the state of the form.
	 * 
	 * @param {number} index 	Indexed order of the field being deleted
	 * @param {object} event 	Click event from clicking the delete button
	 **/
	function deleteField (index : number, event : ButtonEvent ) {
		const updatedFormFields : FormField[] = [ ...formFields ]
		event.preventDefault()
		updatedFormFields.splice(index, 1)
		setFormFieldValues(updatedFormFields)
	}
	return (
		<form onSubmit={displayForm} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
			<h2 className="text-gray-700 font-bold pb-4 text-center">
				Customizable Form
			</h2>
			 {formFields.map((field, index) => (
		 			<div className="flex flex-wrap mb-6" key={index}>
		 				<div className="w-full pb-2 md:w-1/4 px-1 md:mb-0">
							<input type="text" 
										onChange={(e : React.ChangeEvent<HTMLInputElement>) => changeLabel(index, e)} 
										placeholder="Question"
										value={field.label} 
										name={"label_" + field.name} 
										id={"label_" + field.name} 
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-900 font-bold " />
						</div>
						<div className="w-full md:w-1/2 px-1 pb-2 md:mb-0">
							<input type="text" 
										onChange={(e : React.ChangeEvent<HTMLInputElement>) => changeValue(index, e)}  
										placeholder="Answer" 
										name={field.name} 
										id={field.name} 
										value={field.value || ""} 
										className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
						</div>
						<div className="w-full md:w-1/6 pb-2 px-1 md:mb-0">
							<button 
								onClick={(e : ButtonEvent) => deleteField(index, e)} 
								className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
						</div>
					</div>
        ))}
			 <div className="flex content-center justify-center">
				<input type="submit" value="Submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
				<button 
					onClick={(e : ButtonEvent ) => addField(e)} 
					className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 ml-4 rounded">Add Question</button>
			</div>
		</form>
	)
}

export default Form