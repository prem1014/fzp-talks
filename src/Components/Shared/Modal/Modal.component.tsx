import React from 'react';

import Loader from '../Loader/Loader.component';

import './Modal.component.scss'

const Modal: React.FC<any> = (props: any) => {

    return (
        <div id="myModal" className="mera-school-modal">
            <div className="mera-school-modal-content modal-in-sm">
                {/* <div className="mera-school-modal-header">
                    <span className="close">&times;</span>
                    <h2>Modal Header</h2>
                </div> */}
                <div className="mera-school-modal-body">
                    {
                        !props.confirmation && !props.custom &&
                        <div className="loader-container">
                            <Loader />
                        </div>
                    }
                    {
                        props.message && !props.confirmation &&
                        <h6 className="text-center">{props.message}</h6>
                    }

                    {
                        props.confirmation &&
                        <div className="row">
                            <div className="col-12">
                                <h5 className="text-center">{props.confirmation}</h5>
                                <h6 className="text-center">
                                    <button className="btn btn-info" style={{ margin: '10px' }}>Yes</button>
                                    <button className="btn">No</button>
                                </h6>
                            </div>
                        </div>

                    }

                    {
                        props.custom && 
                        <div className="row">
                            <div className="col-12">
                                {
                                    props.children
                                }
                            </div>
                        </div>
                    }

                </div>
                {/* <div className="mera-school-modal-footer">
                 <h3>Modal Footer</h3>
                </div> */}
            </div>
        </div>
    )
}

export default Modal;