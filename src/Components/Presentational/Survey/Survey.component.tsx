import React, { useState, useEffect } from 'react';

import axios from 'axios';

import './Survey.scss';

import op from '../../../Assets/op.png';
import srImg from '../../../Assets/sr.png';
import vtImg from '../../../Assets/vt.png';
import pnrImg from '../../../Assets/pnr.png';
import rrImg from '../../../Assets/rr.png';
import urImage from '../../../Assets/ur.png';
import psImg from '../../../Assets/ps.png';
import othImg from '../../../Assets/oth.png';
import Modal from '../../Shared/Modal/Modal.component';
import Toaster from '../../Shared/Toaster/Toaster.component';
import libphonenumber from 'google-libphonenumber';

interface IVote {
    rjd: Array<any>;
    jdu: Array<any>;
    bjp: Array<any>;
    oth: Array<any>;
    total: number
}

const Survey = () => {
    let toasterTyp: any = 'success';
    const urlProd = 'https://nrf-api.herokuapp.com/api/mla';
    const urlLocal = 'http://localhost:9000/api/mla';
    const emailUrlProd = 'https://nrf-api.herokuapp.com/api/otp';
    const emailUrlLocal = 'http://localhost:9000/api/otp';
    const defaultValue = 'अपना वार्ड चुनें';
    const title = 'ग्राम पंचायत फैज़ुल्लाहपुर';
    const [isPanchayat, setIsPanchayat] = useState(true);
    const [village, setVillage] = useState('');
    const [userName, setUserName] = useState('');
    const [mobileNo, setMobileNo] = useState('');
    const [email, setEmail] = useState('');
    const [party, setParty] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [btnDisable, setBtnDisable] = useState(false);
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [validOtp, setValidOtp] = useState(false);
    const [loading, setLoading] = useState(false);
    const [loaderMessage, setLoaderMessage] = useState('');
    const [message, setMessage] = useState('');
    const [toasterType, setToasterType] = useState(toasterTyp);
    const [isToasterOpen, setIsToasterOpen] = useState(false);
    let vote: any = {
        sanjay: [],
        vijay: [],
        prabhunath: [],
        oth: [],
        total: 0
    }

    const [voteShare, setVoteShare] = useState(vote);
    const [votes, setVotes] = useState(vote);
    const [items, setItems] = useState(vote);

    const getWards = () => {
        let wards = [];
        for (let i = 1; i < 14; i++) {
            wards.push(
                {
                    value: i,
                    text: i
                }
            )
        }
        return wards;
    }

    const wards = getWards()

    const inputChange = (e: any) => {
        setIsPanchayat(e.target.value !== defaultValue ? true : false);
        setVillage(e.target.value);
    }

    const rjdtyle = {
        height: '70px',
        borderRadius: '62px',
        width: '70px'
    }
    const container = {
        padding: '10px',
        boxShadow: '0 3px 10px grey',
        cursor: 'pointer'
    }

    const independentStyle = {
        height: '71px',
        margin: '0 105px',
        borderRadius: '61px',
        backgroundColor: 'yellow',
        padding: '24px 8px'
    }

    const submit = (party: string) => {
        const voteExpireTime = new Date('Thu Oct 26 2021 23:59:59 GMT+0530 (India Standard Time)').getTime();
        const todayTime = new Date().getTime();
        if (todayTime > voteExpireTime) {
            alert('मतदान अब समाप्त हो गया है। आप सभी को बहुत-बहुत धन्यवाद');
            return;
        }
        // if (userName.length <= 5) {
        //     alert('अपना सही नाम दीजिये। ');
        //     return;
        // }
        if (!email) {
            alert('email id दीजिये');
            return;
        }
        if (!_isValidEmail(email)) {
            alert('email id वैध नहीं है। ');
            return;
        }
        // alert('Heavy load on server, please try after some time');
        // return
        if (document.cookie === '200' || localStorage.getItem('voteId')) {
            alert('आपके मोबाइल या कंप्यूटर से एक बार वोट हो चूका है।')
            return;
        }

        const obj = {
            status: true,
            ward: village,
            name: 'userName',
            mobile: mobileNo,
            email: email
        }

        let voteShareCopy = { ...votes };
        voteShareCopy[party].push(obj);
        voteShareCopy.total = voteShareCopy.sanjay.length + voteShareCopy.vijay.length + voteShareCopy.prabhunath.length + voteShareCopy.oth.length
        setVotes(voteShareCopy);
        setBtnDisable(true);
        setLoading(true);
        setLoaderMessage('आपका वोट सेव हो रहा, कृपया प्रतीक्षा कीजिये।');
        axios.post(urlProd, { feedback: { ...voteShareCopy, _id: party }, otp: otp })
            .then(res => {
                setMessage(res.data.message)
                setIsToasterOpen(true)
                getVoteFromDB();
                onclose();
                setLoading(false);
                if(!res.data.success) {
                    setToasterType('error');
                } else {
                    setToasterType('success');
                    localStorage.setItem('voteId', '' + new Date().getTime());
                    document.cookie = '200';
                }
            })
            .catch(err => {
                setBtnDisable(false);
                setLoading(false);
            })
    }

    const _isValidEmail = (email: string) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    const getVotePer = (vote: number, total: number) => {
        if (total === 0) return total;


        return (((vote / total) * 100)).toFixed(1) + '%'
    }

    const getVoteFromDB = () => {
        setLoading(true);
        setLoaderMessage('वोट लोड हो रहा है, कृपया प्रतीक्षा कीजिये');
        axios.get(urlProd)
            .then(res => {
                // const rjd = res.data.result.filter((it: any) => it._id === 'rjd')
                // const jdu = res.data.result.filter((it: any) => it._id === 'jdu')
                // const bjp = res.data.result.filter((it: any) => it._id === 'bjp')
                // const oth = res.data.result.filter((it: any) => it._id === 'oth')
                const voteData = {
                    sanjay: res.data.result.sanjay,
                    vijay: res.data.result.vijay,
                    prabhunath: res.data.result.prabhunath,
                    oth: res.data.result.oth,
                    total: 0
                }
                voteData.total = voteData.sanjay + voteData.vijay + voteData.prabhunath + voteData.oth;
                setItems(res.data.item);
                setVoteShare(voteData);
                setLoading(false)
            })
            .catch(err => {
                setLoading(false);
            })
    }

    const getVoteByVillage = (id: any, party: any) => {
        const total = items[party]?.filter((itm: any) => itm.ward === id);

        return total?.length;
    }

    const getVillageById = (id: string) => {
        const villageDetails: any = wards.find((vill: any) => vill.id === id);
        return villageDetails.hn
    }

    const inputHndl = (e: any, type: string) => {
        if (type === 'name') {
            setUserName(e.target.value);
        } else if (type === 'mobile') {
            setMobileNo(e.target.value);
        } else if (type === 'email') {
            setEmail(e.target.value);
        } else if (type === 'otp') {
            setOtp(e.target.value);
        }
    }

    const isValidMobile = (mobileNo: string) => {
        const phoneUtil = libphonenumber.PhoneNumberUtil.getInstance();
        const isValid = phoneUtil.isValidNumberForRegion(phoneUtil.parse(mobileNo, 'IN'), 'IN');

        return isValid;
    }

    const openModal = (party: string) => {
        if(village) {
            setParty(party);
            setIsOpen(true)
        } else {
            alert('अपना वार्ड चुनें');
        }
    }

    const onclose = () => {
        setIsOpen(false);
        setParty('');
        setVotes(vote);
        setBtnDisable(false)
    }

    const getOtp = () => {
        if (!email) {
            alert('email id दीजिये');
            return;
        }
        if (!_isValidEmail(email)) {
            alert('email id वैध नहीं है। ');
            return;
        }
        setLoading(true);
        setLoaderMessage('आपके email id पे otp भेजा जा रहा है।');
        axios.post(emailUrlProd, { mobile: email })
            .then(res => {
                if (res.data.successCode === 200) {
                    setMessage(res.data.message)
                    setIsToasterOpen(true)
                    setOtpSent(true);
                } else {
                    setMessage('कृपया फिर से कोसिस करें।')
                }
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
            })
    }

    const validateOtp = () => {
        axios.get(emailUrlProd + '/' + otp)
            .then(res => {
                if (res.data.successCode === 'OTP_VALID') {
                    setValidOtp(true);
                }
                alert(res.data.message);
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onToasterClose = () => {
        setIsToasterOpen(false);
    }

    useEffect(() => {
        getVoteFromDB();
    }, [])

    return (
        <>
            <div className="row marginTop20px">
                <div className="col-12">
                    <h4 className="text-center">{title}</h4>
                    <hr />
                    <h5 className="text-center">ग्राम पंचायत फैज़ुल्लाहपुर महासर्वे 2021</h5>
                    <h6 className="text-center">महासर्वे में भाग लेने के लिए अपना वार्ड चुनें</h6>
                    {/* <h3 className="text-center" style={{color: 'red'}}>कुछ तकनिकी कारणों से वोटिंग नहीं हो पा रहा है । हम जल्द ही इसे ठीक कर आपको सूचित करेंगे। </h3> */}
                </div>
            </div>
            <hr />
            <div className="row">
                <div className="col-3"></div>
                <div className="col-lg-6 col-md-6 col-12">

                    <select className="form-control" onChange={(event) => inputChange(event)}>
                        <option>{defaultValue}</option>
                        {
                            wards.map((item) => (
                                <option value={item.value}>{item.text}</option>
                            ))
                        }
                    </select>

                </div>
                <div className="col-3"></div>
            </div>
            {
                isPanchayat &&
                <>
                    <hr />
                    <h3 className="text-center">Total Vote {voteShare.total}</h3>
                    <div className="row" style={{ marginBottom: '150px' }}>
                        <div className="col-lg-4 col-md-4 col-6" style={{ marginBottom: '10px' }}>
                            <div style={container} onClick={(event) => openModal('sanjay')}>
                                <h4 className="text-center" style={{ color: '#ffc107' }}>संजय राय</h4>
                                {/* <div className="can-photo">
                                    <img src={srImg} />
                                </div> */}
                                <hr />
                                <h5 className="text-center" style={{color: 'red'}}>कुल प्राप्त वोट {voteShare.sanjay}</h5>
                                <h5 className="text-center" style={{color: 'green'}}>{getVotePer(voteShare.sanjay, voteShare.total)}</h5>
                                <h6 className="text-center" style={{color: 'orange'}}>वार्ड {village} से प्राप्त वोट: <span style={{ fontWeight: 'bold' }}>{getVoteByVillage(village, 'sanjay')}</span></h6>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6" style={{ marginBottom: '10px' }}>
                            <div style={container} onClick={(event) => openModal('vijay')}>
                                <h4 className="text-center" style={{ color: '#ffc107' }}>विजय ठाकुर</h4>
                                {/* <div className="can-photo">
                                    <img src={vtImg} />
                                </div> */}
                                <hr />
                                <h5 className="text-center" style={{color: 'red'}}>कुल प्राप्त वोट {voteShare.vijay}</h5>
                                <h5 className="text-center" style={{color: 'green'}}>{getVotePer(voteShare.vijay, voteShare.total)}</h5>
                                <h6 className="text-center" style={{color: 'orange'}}>वार्ड {village} से प्राप्त वोट: <span style={{ fontWeight: 'bold' }}>{getVoteByVillage(village, 'vt')}</span></h6>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-4 col-6" style={{ marginBottom: '10px' }}>
                            <div style={container} onClick={(event) => openModal('prabhunath')}>
                                <h4 className="text-center" style={{ color: '#ffc107' }}>प्रभुनाथ राय</h4>
                                {/* <div className="can-photo">
                                    <img src={pnrImg} />
                                </div> */}
                                <hr />
                                <h5 className="text-center" style={{color: 'red'}}>कुल प्राप्त वोट {voteShare.prabhunath}</h5>
                                <h5 className="text-center" style={{color: 'green'}}>{getVotePer(voteShare.prabhunath, voteShare.total)}</h5>
                                <h6 className="text-center" style={{color: 'orange'}}>वार्ड {village} से प्राप्त वोट: <span style={{ fontWeight: 'bold' }}>{getVoteByVillage(village, 'prabhunath')}</span></h6>
                            </div>
                        </div>
                        {/* <div className="col-lg-4 col-md-4 col-6" style={{ marginBottom: '10px' }}>
                            <div style={container} onClick={(event) => openModal('rambabu')}>
                                <h4 className="text-center" style={{ color: '#ffc107' }}>रामबाबू राय सर</h4>
                                <div className="can-photo">
                                    <img src={rrImg} />
                                </div>
                                <hr />
                                <h5 className="text-center" style={{color: 'red'}}>कुल प्राप्त वोट {voteShare.rambabu}</h5>
                                <h5 className="text-center" style={{color: 'green'}}>{getVotePer(voteShare.rambabu, voteShare.total)}</h5>
                                <h6 className="text-center" style={{color: 'orange'}}>वार्ड {village} से प्राप्त वोट: <span style={{ fontWeight: 'bold' }}>{getVoteByVillage(village, 'rambabu')}</span></h6>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-3 col-md-3 col-6" style={{ marginBottom: '10px' }}>
                            <div style={container} onClick={(event) => openModal('upendra')}>
                                <h4 className="text-center" style={{ color: '#ffc107' }}>उपेंद्र राय</h4>
                                <div className="can-photo">
                                    <img src={urImage} />
                                </div>
                                <hr />
                                <h5 className="text-center" style={{color: 'red'}}>कुल प्राप्त वोट {voteShare.upendra}</h5>
                                <h5 className="text-center" style={{color: 'green'}}>{getVotePer(voteShare.upendra, voteShare.total)}</h5>
                                <h6 className="text-center" style={{color: 'orange'}}>वार्ड {village} से प्राप्त वोट: <span style={{ fontWeight: 'bold' }}>{getVoteByVillage(village, 'upendra')}</span></h6>
                            </div>
                        </div> */}
                        {/* <div className="col-lg-3 col-md-3 col-6" style={{ marginBottom: '10px' }}>
                            <div style={container} onClick={(event) => openModal('ps')}>
                                <h4 className="text-center" style={{ color: '#ffc107' }}>प्रीतम सिंह</h4>
                                <div className="can-photo">
                                    <img src={psImg} />
                                </div>
                                <hr />
                                <h5 className="text-center" style={{color: 'red'}}>कुल प्राप्त वोट {voteShare.ps}</h5>
                                <h5 className="text-center" style={{color: 'green'}}>{getVotePer(voteShare.ps, voteShare.total)}</h5>
                                <h6 className="text-center" style={{color: 'orange'}}>वार्ड {village} से प्राप्त वोट: <span style={{ fontWeight: 'bold' }}>{getVoteByVillage(village, 'ps')}</span></h6>
                            </div>
                        </div> */}
                        <div className="col-lg-4 col-md-4 col-6" style={{ marginBottom: '10px' }}>
                            <div style={container} onClick={(event) => openModal('oth')}>
                                <h4 className="text-center" style={{ color: '#ffc107' }}>कोई और/नोटा </h4>
                                {/* <div className="can-photo">
                                    <img src={othImg} />
                                </div> */}
                                <hr />
                                <h5 className="text-center" style={{color: 'red'}}>कुल प्राप्त वोट {voteShare.oth}</h5>
                                <h5 className="text-center" style={{color: 'green'}}>{getVotePer(voteShare.oth, voteShare.total)}</h5>
                                <h6 className="text-center" style={{color: 'orange'}}>वार्ड {village} से प्राप्त वोट: <span style={{ fontWeight: 'bold' }}>{getVoteByVillage(village, 'oth')}</span></h6>
                            </div>
                        </div>
                    </div>
                </>
            }
            {
                isOpen &&
                <div id="myModal" className="cus-modal">
                    <div className="cus-modal-content">
                        <span className="close" onClick={() => onclose()}>&times;</span>
                        <div className="row" style={{ marginTop: '40px' }}>
                            {/* <div className="col-12">
                                <input type="text"
                                    value={userName}
                                    placeholder="अपना नाम डालिये।"
                                    onChange={(e) => inputHndl(e, 'name')}
                                    className="form-control"
                                />
                            </div> */}
                            <div className="col-12" style={{ marginTop: '10px' }}>
                                <input type="text"
                                    value={email}
                                    placeholder="email id दीजिये।"
                                    onChange={(e) => inputHndl(e, 'email')}
                                    className="form-control"
                                />
                            </div>
                            {
                                otpSent &&
                                <div className="col-12" style={{ marginTop: '10px' }}>
                                    <input type="number"
                                        value={otp}
                                        placeholder="otp डालिये।"
                                        onChange={(e) => inputHndl(e, 'otp')}
                                        className="form-control"
                                    />
                                </div>
                            }
                            {
                                !otp && !otpSent &&
                                <div className="col-12" style={{ marginTop: '10px' }}>
                                    <button disabled={btnDisable}
                                        onClick={(event) => getOtp()}
                                        className="btn btn-info"
                                    >OK</button>
                                </div>
                            }
                            {
                                otpSent && !validOtp &&
                                <div className="col-12" style={{ marginTop: '10px' }}>
                                    <button disabled={!otp || btnDisable}
                                        onClick={(event) => submit(party)}
                                        className="btn btn-info"
                                    >वोट कीजिये</button>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            }
            <div className="row">
                <div className="col-12" style={{ marginTop: '20px' }}>
                    {/* <h6 className="text-center">
                        मतदान 18-09-2020 को पूर्वाह्न 11:59 बजे समाप्त हो गया
                    </h6> */}
                </div>
            </div>
            {
                loading && <Modal message={loaderMessage}/>
            }
            <Toaster message={message} severity={toasterType} isOpen={isToasterOpen} close={() => onToasterClose()}/>
        </>
    )
}


export default Survey;
