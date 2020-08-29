import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import './Feedback.component.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import AppService from '../../Service/App-service';
import Toaster from '../../Shared/Toaster/Toaster.component';
import Modal from '../../Shared/Modal/Modal.component';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      width: '100%'
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }),
);

const Feedback = () => {
    let toasterTyp: 'success' | 'info' | 'warning' | 'error' | undefined = 'success';
    const classes = useStyles();
    const history = useHistory();

    const initForm: any = {
        name: '',
        subject: '',
        details: '',
        ward: 1
    }

    const [feedbackDetails, setFeedbackDetails] = useState(initForm);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [toasterType, setToasterType] = useState(toasterTyp);

    const wardChanged = (e: any) => {
        let updatedState = { ...feedbackDetails};
        updatedState.ward = e.target.value;
        setFeedbackDetails(updatedState);
    }

    const getWards = () => {
        let wards = [];
        for(let i = 1; i < 14; i++) {
            wards.push(
                {
                    value: i,
                    text: i
                }
            )
        }
        return wards;
    }

    const saveFeedback = () => {
        setLoading(true);
        AppService.saveFeedback(feedbackDetails)
        .then( res => {
            setLoading(false);
            setMessage(res.data.message);
            setIsOpen(true);
        })
        .catch( res => {
            setLoading(false);
        })
    }

    const inputHandler = (e: any, type: string) => {
        let updatedState = { ...feedbackDetails};
        updatedState[type] = e.target.value;
        setFeedbackDetails(updatedState);
    }

    const onToasterClose = () => {
        history.push('/home');
        setIsOpen(true);
    }

    return (
        <div className="row marginTop20px">
            <div className="col-lg-lg-2 col-md-2 col-12"></div>
            <div className="col-lg-lg-8 col-md-8 col-12 app-box-shadow user-reg">
                <h4 className="text-center">पंचायत के विकाश के लिए अपना बहुमूल्य सुझाव दीजिये</h4>
                <hr />
                <form>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <TextField id="name" label="विषय लिखिए" value={feedbackDetails.subject} onChange={(e) => inputHandler(e, 'subject')}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <TextField id="mobile" label="बिस्तार में सुझाव के बारे में लिखिए" value={feedbackDetails.details} onChange={(e) => inputHandler(e, 'details')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <TextField id="name" label="अपना नाम अगर देना चाहते है तो, जरुरी नहीं है" value={feedbackDetails.name} onChange={(e) => inputHandler(e, 'name')}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">अपना वार्ड चुनें</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={feedbackDetails.ward}
                                    onChange={(ev) => wardChanged(ev)}
                                >
                                    {
                                        getWards().map( ward => (
                                            <MenuItem value={ward.value} key={ward.value}>{ward.text}</MenuItem>
                                        ))
                                    }
                                </Select>
                            </FormControl>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h6 className="text-center">
                                <Button variant="contained" color="primary" onClick={() => saveFeedback()}>सुझाव सेभ कीजिये</Button>
                            </h6>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-lg-2 col-md-2 col-12"></div>
            <Toaster message={message} severity={toasterType} isOpen={isOpen} close={() => onToasterClose()}/>
            {
                loading && <Modal message="आपका सुझाव सेभ हो रहा है, कृपया प्रतीक्षा कीजि।।।"/>
            }
        </div>
    )
}

export default Feedback;