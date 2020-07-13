import React from "react";

//Weather Input fields

interface Props{
	getWeather:(e: React.FormEvent<HTMLFormElement>)=>void;
}

const Form:React.FC<Props> = ({getWeather}) => (
	<form onSubmit={getWeather}>
		<input className='_input' type="text" name="city" placeholder="City..."/>
		<input className='_input' type="text" name="country" placeholder="Country..."/>
		<button>Get Weather</button>
	</form>
);

export default Form;