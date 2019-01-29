import React from "react";
import ReactDOM from "react-dom";

import "./modal.css";

class ModalInstance {

    constructor(props){
        console.log(props);
        this.props = props;
    }

    openSimpleModal(config){

        var promise = new Promise(function(resolve, reject){

            let modalProps = {
                title:  config.title,
                body:   config.body,
                data:   config.data,
                showCancel: config.showCancel || false,
                isError:    config.isError || false,
                backdrop:   config.backdrop === false ? false : true
            }

            console.log('Open simple modal', modalProps);
    
            //Close Function (Accept)
            function close(data){
                ReactDOM.unmountComponentAtNode(modalContainer);
                resolve(data);
            }

            //Dismiss Function (Cancel)
            function dismiss(){
                ReactDOM.unmountComponentAtNode(modalContainer);
                reject();
            }

            //Backdrop function
            function backdrop(){
                console.log('backdrop');
                if(modalProps.backdrop){
                    dismiss();
                }
            }

            //Modal template
            function modalTemplate(modalProps){
                return <div id="modal-wrap">
                
                    <div className="modal-component-backdrop" onClick={()=>backdrop()}></div>
    
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
                                    <button className="btn btn-success" onClick={()=>close(modalProps.data)}>Ok</button>
                                    <button className="btn btn-secondary" onClick={()=>dismiss()}>Cancel</button>
                                </div>
                            ):(
                                <div className="btn-group">
                                    <button className="btn" onClick={()=>close()}>Close</button>
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
    };

    openComponentModal(config, props){

        var vm= this;

        var promise = new Promise(function(resolve, reject){

            let modalProps = {
                title:  config.title,
                body:   config.body,
                data:   config.data,
                showCancel: config.showCancel || false,
                isError:    config.isError || false,
                backdrop:   config.backdrop === false ? false : true
            }

            let Component = config.component;

            console.log('Open ComponentModal: ', modalProps);
    
            //Close Function (Accept)
            function close(data){
                ReactDOM.unmountComponentAtNode(modalContainer);
                resolve(data);
            }

            //Dismiss Function (Cancel)
            function dismiss(){
                ReactDOM.unmountComponentAtNode(modalContainer);
                reject();
            }

            //Backdrop function
            function backdrop(){
                console.log('backdrop');
                if(modalProps.backdrop){
                    dismiss();
                }
            }

            //Modal template
            function modalTemplate(modalProps){
                return <div id="modal-wrap">
                
                <div className="modal-component-backdrop" onClick={()=>backdrop()}></div>

                <div className="modal-component">
                    {/*HEADER*/}
                    <div className={modalProps.isError ? 'modal-component-header error' : 'modal-component-header'}>
                        {modalProps.title}
                    </div>
                    {/*BODY*/}
                    <div className="modal-component-body">
                        {<Component {...props}/>}
                    </div>
                    {/*FOOTER*/}
                    <div className="modal-component-footer">
                        { modalProps.showCancel ? (
                            <div className="btn-group">
                                <button className="btn btn-success" onClick={()=>close(modalProps.data)}>Ok</button>
                                <button className="btn btn-secondary" onClick={()=>dismiss()}>Cancel</button>
                            </div>
                        ):(
                            <div className="btn-group">
                                <button className="btn" onClick={()=>close()}>Close</button>
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
