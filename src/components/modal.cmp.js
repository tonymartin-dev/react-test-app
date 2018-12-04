import React from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";

import './modal.css'

class ModalComponent extends React.Component {

	constructor(props){

		super(props);

		console.log('   MODAL OPTIONS: ', props)

		this.state = {
			show: props.show
		}

	}

    render() {
        
		function modalTemplate(modalProps){
			return <div id="modal-wrap">
			
				<div className="modal-component-backdrop" onClick={modalProps.onClose}></div>

				<div className="modal-component">
					
					<div className={modalProps.data.isError ? 'modal-component-header error' : 'modal-component-header'}>
						{modalProps.data.title}
					</div>
					<div className="modal-component-body">
						{modalProps.data.body}
					</div>
					<div className="modal-component-footer">
						{ modalProps.data.showCancel ? (
							<div className="btn-group">
								<button className="btn btn-success" onClick={()=>modalProps.onClose('accept', modalProps.data.info)}>Ok</button>
								<button className="btn btn-secondary" onClick={()=>modalProps.onClose('cancel')}>Cancel</button>
							</div>
						):(
							<div className="btn-group">
								<button className="btn" onClick={()=>modalProps.onClose(null)}>Close</button>
							</div>
						) }
					</div>

				</div>
				
			</div>
			
		}

		let modalContainer = document.getElementById("modal-layer");
		let modalWrap = document.getElementById("modal-wrap");

		//Render when show is true and remove when it's false
		if(this.props.show ){
			if(modalContainer){
				console.log('MODAL LOADED');
				console.log(modalContainer);
				ReactDOM.render( modalTemplate(this.props),  modalContainer);
			}
		} else {
			if(modalContainer){
				if(modalWrap){
					console.log('CLOSING MODAL')
					ReactDOM.unmountComponentAtNode(modalContainer);
				}
			}

		}
		

        return null;
    }
}

ModalComponent.propTypes = {
	onClose: 	PropTypes.func.isRequired,
	show: 		PropTypes.bool,
};

export default ModalComponent;
