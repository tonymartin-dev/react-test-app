import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import './modal.css'

class ModalComponent extends React.Component {

	constructor(props){

		super(props);

		this.state = {
			show: props.show
		}

	}

    render() {
        
		function modalTemplate(modalProps){
			return <div className="modal-component-backdrop" onClick={modalProps.onClose}>
				<div className="modal-component">
					
					<div className="modal-component-header error">
						{modalProps.data.title}
					</div>
					<div className="modal-component-body">
						{modalProps.data.body}
					</div>
					<div className="modal-component-footer">
						<button className="btn" onClick={modalProps.onClose}>Close</button>
					</div>
					
				</div>
			</div>
		}

		let modalContainer = document.getElementById("modal-layer");

		//Render when show is true and remove when it's false
		if(this.props.show ){
			if(modalContainer){
				console.log('MODAL LOADED');
				console.log(modalContainer);
				ReactDOM.render( modalTemplate(this.props),  modalContainer);
			}
		} else {
			if(modalContainer){
				console.log('CLOSING MODAL')
				ReactDOM.unmountComponentAtNode(modalContainer);
			}

		}
		

        return null;
    }
}

ModalComponent.propTypes = {
	onClose: 	PropTypes.func.isRequired,
	show: 		PropTypes.bool,
	children: 	PropTypes.node
};

export default ModalComponent;
