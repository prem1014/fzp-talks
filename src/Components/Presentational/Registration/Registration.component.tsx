import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import './Registration.component.scss';
import Button from '@material-ui/core/Button';
import AppService from '../../Service/App-service';
import Toaster from '../../Shared/Toaster/Toaster.component';
import Modal from '../../Shared/Modal/Modal.component';
import { useHistory } from 'react-router-dom';

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

const UserRegistration = () => {
    let toasterTyp: 'success' | 'info' | 'warning' | 'error' | undefined;
    let toasterTypeInfo: 'info' = 'info';
    const classes = useStyles();
    const history = useHistory();

    const initForm: any = {
        name: '',
        mobile: '',
        email: '',
        ward: 1
    }

    const [userInfo, setUserInfo] = useState(initForm);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [toasterType, setToasterType] = useState(toasterTyp);

    const wardChanged = (e: any) => {
        let updatedState = { ...userInfo};
        updatedState.ward = e.target.value;
        setUserInfo(updatedState);
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

    const userReg = () => {
        setLoading(true);
        AppService.saveUsers({...userInfo, _id: userInfo.mobile})
        .then( res => {
            setToasterType('success');
            if(!res.data.success) {
                setToasterType('info');
            }
            setLoading(false);
            setMessage(res.data.message);
            setIsOpen(true);
            setLoading(false);
        })
        .catch( err => {
            console.log(err);
        })
    }

    const inputHandler = (e: any, type: string) => {
        let updatedState = { ...userInfo};
        updatedState[type] = e.target.value;
        setUserInfo(updatedState);
    }

    const onToasterClose = () => {
        history.push('/home');
        setIsOpen(true);
    }

    return (
        <div className="row marginTop20px">
            <div className="col-lg-lg-2 col-md-2 col-12"></div>
            <div className="col-lg-lg-8 col-md-8 col-12 app-box-shadow user-reg">
                <h4 className="text-center">हमसे जुड़िये और अपने पंचायत को विकसित बनाने में मदद कीजिये</h4>
                <hr />
                <form>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <TextField id="name" label="आपका पूरा नाम" value={userInfo.name} onChange={(e) => inputHandler(e, 'name')}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <TextField id="mobile" label="मोबाइल नंबर" value={userInfo.mobile} onChange={(e) => inputHandler(e, 'mobile')}/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-md-6 col-12">
                            <TextField id="name" label="ईमेल" value={userInfo.email} onChange={(e) => inputHandler(e, 'email')}/>
                        </div>
                        <div className="col-lg-6 col-md-6 col-12">
                            <FormControl className={classes.formControl}>
                                <InputLabel id="demo-simple-select-label">अपना वार्ड चुनें</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={userInfo.ward}
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
                                <Button variant="contained" color="primary" onClick={() => userReg()}>हमसे जुड़ जायें</Button>
                            </h6>
                        </div>
                    </div>
                </form>
            </div>
            <div className="col-lg-lg-2 col-md-2 col-12"></div>
            <Toaster message={message} severity={toasterType} isOpen={isOpen} close={() => onToasterClose()}/>
            {
                loading && <Modal message="आपका पंजीकरण हो रहा हैं, कृपया प्रतीक्षा कीजिये।"/>
            }
        </div>
    )
}

export default UserRegistration;