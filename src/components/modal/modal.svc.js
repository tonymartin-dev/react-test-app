import React from "react";
import ReactDOM from "react-dom";

import "./modal.css";

class ModalInstance {

    constructor(){
        
        var vm = this;
        
    }

    openSimpleModal(config){

        var vm = this;

        var promise = new Promise(function(resolve, reject){

            let modalProps = {
                title:  config.title,
                body:   config.body,
                data:   config.data,
                showCancel: config.showCancel || false,
                isError:    config.isError || false
            }

            console.log('Open simple modal', modalProps);
    
            //Close Function (Accept)
            vm.close = function(data){
                ReactDOM.unmountComponentAtNode(modalContainer);
                resolve(data);
            }

            //Dismiss Function (Cancel)
            vm.dismiss = function(){
                ReactDOM.unmountComponentAtNode(modalContainer);
                reject();
            }

            //Modal template
            function modalTemplate(modalProps){
                return <div id="modal-wrap">
                
                    <div className="modal-component-backdrop" onClick={()=>console.log('backdrop')}></div>
    
                    <div className="modal-component">
                        {/*HEADER*/}
                        <div className={modalProps.isError ? 'modal-component-header error' : 'modal-component-header'}>
                            {modalProps.title}
                        </div>
                        {/*BODY*/}
                        <div className="modal-component-body">
                            {modalProps.body}
                        </div>
                        {/*FOOTER*/}
                        <div className="modal-component-footer">
                            { modalProps.showCancel ? (
                                <div className="btn-group">
                                    <button className="btn btn-success" onClick={()=>vm.close(modalProps.data)}>Ok</button>
                                    <button className="btn btn-secondary" onClick={()=>vm.dismiss()}>Cancel</button>
                                </div>
                            ):(
                                <div className="btn-group">
                                    <button className="btn" onClick={()=>vm.close()}>Close</button>
                                </div>
                            ) }
                        </div>
    
                    </div>
                    
                </div>
                
            }
            
            //Render	
            let modalContainer = document.getElementById("modal-layer");
            console.log('RENDER MODAL', modalContainer);
            ReactDOM.render( modalTemplate(modalProps),  modalContainer);

        })

        return promise;
    }

    
}

function ModalService(){
    return new ModalInstance();
}


export default ModalService;
