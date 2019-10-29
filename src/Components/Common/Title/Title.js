import React from 'react';
import './Title.css';


class Title extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			counter: 0
		}
		this.onClick = this.onClick.bind(this);
		this.increaseCounter = this.increaseCounter.bind(this);
	}

	increaseCounter(state) {
		return {counter : state.counter + 1};
	}

	onClick(){
		this.setState(this.increaseCounter);
	}

	render(){
		return (
			<div>
				<button onClick={this.onClick} className="buttonStyles" >Upvote movie</button>
				<h1>
					<span>{this.state.counter}</span>
					{this.props.children}
				</h1>
			</div>
		)
	}
}

export default Title;
