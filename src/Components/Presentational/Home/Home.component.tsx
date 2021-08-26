import React, { useState, useEffect } from 'react';

import './Home.component.scss';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

import AppService from '../../Service/App-service';

import LinkedList from '../../Shared/LinkedList/linkedList';
import HashTable from '../../Shared/Hashtable/HashTable';
import Modal from '../../Shared/Modal/Modal.component';
import TextField from '@material-ui/core/TextField';

import waterIssue from '../../../Assets/waterIssue.jpg';
import flood from '../../../Assets/flood.jpg';
import Toaster from '../../Shared/Toaster/Toaster.component';
import LinksCollection from '../Links-Collection/LinksCollection.component';

const Home = () => {
    let initUser = {
        name: '',
        count: 0,
        ward: ''
    }
    const [isOpen, setIsOpen] = useState(false);
    const history = useHistory();
    const [feedbacks, setFeedbacks] = useState([]);
    const [listOfPratinidhi, setListOfPratinidhi] = useState([]);
    const [users, setUsers] = useState(initUser);
    const [loading, setLoading] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [mobileNo, setMobileNo] = useState('');
    const [mukhiyaId, setMukhiyaId] = useState('');

    const feedbackList = [
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        },
        {
            title: 'नल जल योजना से स्वक्ष पानी मिलना चाहिए',
            details: 'हमारी मुखिया जी से आग्रह है की नल जल योजना से जो पानी मिल रहा है वो पिने के योग्य नही। कृपया इसे पिने योग्य बनाने के लिए विचार किया जाये'
        }
    ]

    const userReg = () => {
        history.push('/reg');
    }

    const feedback = () => {
        history.push('/feedback');
    }

    const getFeedbackUsers = () => {
        setLoading(true);
        AppService.getFeedBackAndUsers()
            .then(res => {
                setUsers(res[1].data);
                setFeedbacks(res[0].data.result.reverse());
                let listOfMukhiya = res[2].data.result.sort( (a: any, b: any) => {
                    if(a.fromYr < b.fromYr) { return -1; }
                    if(a.fromYr > b.fromYr) { return 1; }
                    return 0;
                })
                listOfMukhiya[1].fromYr = 'May ' + listOfMukhiya[1].fromYr;
                listOfMukhiya[1].toYr = 'July ' + listOfMukhiya[1].toYr;
                setListOfPratinidhi(listOfMukhiya);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
            });
    }

    const likeFeedback = (feedbackId: string) => {
        AppService.updateFeedback(feedbackId)
            .then(res => {
                if (res.data.success) getFeedbackUsers();
            })
            .catch(err => {

            })
    }

    const likeMukhiya = (id: string) => {
        setOpenModal(true)
        setMukhiyaId(id)
    }

    const inputHandler = (e: any) => {
        setMobileNo(e.target.value);
    }

    const saveMukhiyaLikes = () => {
        if(localStorage.getItem('dynamicUserId')) {
            setOpenModal(false);
            setIsOpen(true);
            return;
        } else {
            localStorage.setItem('dynamicUserId', '' + new Date().getTime());
        }
        setOpenModal(false);
        AppService.updateMukhiyaDetails(mukhiyaId, {mobileNo: mobileNo, id: localStorage.getItem('dynamicUserId')})
        .then(res => {
            if (res.data.success) getFeedbackUsers();
        })
        .catch(err => {

        });
    }

    const onToasterClose = () => {
        setIsOpen(false);
    }

    useEffect(() => {
        getFeedbackUsers();
    }, []);

    return (
        <div className="home">
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center app-title">हमारी सोच</h4>
                        <hr />
                        <h5 className="text-center">
                            'फैज़ुल्लाहपुर Talks' अगले 10 वर्ष में फैज़ुल्लाहपुर को बिहार के 10 अग्रणी गावों की
                            पंक्ति में खड़ा करने की एक पहल है। इसका उद्देश्य ऐसा करने की
                            सोच रखने वालों को जोड़ना और एक सशक्त
                            राजनीतिक नेतृत्व का निर्माण करना है।
                        </h5>
                        <hr />
                        <h2 className="text-center">{users.count}</h2>
                        <h5 className="text-center" style={{ color: '#07cc10', fontWeight: 'bold' }}>लोग हमसे जुड़ चुके है।</h5>
                        <hr />
                        <h5 className="text-center">
                            <Button variant="contained" color="primary" onClick={() => userReg()}>हमसे जुड़ें</Button>
                        </h5>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center app-title">गांव के विकाश के लिए प्राप्त सुझाव</h4>
                        <h6 className="text-center app-title">कुल {feedbacks.length} सुझाव प्राप्त हुआ है। </h6>
                        <hr />
                        <div className="feedback">
                            {
                                feedbacks.map((res: any) => (
                                    <div className="item app-box-shadow">
                                        <h5 style={{ color: '#FF8F00' }}>{res.subject}</h5>
                                        <p>{res.details}</p>
                                        {
                                            res.name && <a style={{ color: '#26C6DA', fontWeight: 'bold' }}>सुझाव देने वाला का नाम: {res.name}</a>
                                        }
                                        {
                                            res.ward && <a style={{ color: '#26C6DA', fontWeight: 'bold' }}>यह सुझाव वार्ड {res.ward} से प्राप्त हुआ है। </a>
                                        }
                                        <div>
                                            <span className="like-btn" onClick={() => likeFeedback(res._id)}>
                                                <i className="fab fa-gratipay"></i>
                                                <span style={{ color: 'blue', margin: '0 10px' }}>{res.likes ? res.likes : 0}</span>
                                            </span>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                        <h5 className="text-center">
                            <Button variant="contained" color="primary" onClick={() => feedback()}>अपना सुझाव दें</Button>
                        </h5>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-4 col-md-4 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center app-title">हमारे पंचायत के स्कूल</h4>
                        <hr />
                        <ol style={{ fontWeight: 'bold' }}>
                            <li style={{ color: '#FF6F00' }}>के एन शर्मा हाई स्कूल फैज़ुल्लाहपुर</li>
                            <li style={{ color: '#00BCD4' }}>कन्या मध्य विद्यालय नरवार</li>
                            <li style={{ color: '#4CAF50' }}>उत्क्रमित मध्य विद्यालय श्यामनगर</li>
                            <li style={{ color: '#FFB300' }}>नवसृजित विद्यालय पूरब टोला</li>
                            <li style={{ color: '#42A5F5' }}>नवसृजित विद्यालय खोमारीपुर</li>
                        </ol>
                    </div>
                </div>
                <div className="col-lg-8 col-md-8 col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center app-title">हमारे पंचायत के प्रतिनिधि</h4>
                        <hr />
                        <div className="table-responsive">
                            <table className="table table-bordered">
                                <thead>
                                    <tr>
                                        <th>नाम</th>
                                        <th>पद</th>
                                        <th>कब से</th>
                                        <th>कब तक</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        listOfPratinidhi.map((d: any) => (
                                            <tr>
                                                <td>
                                                    {d.name}
                                                    <div className="like-btn-container">
                                                        <span className="like-btn" onClick={() => likeMukhiya(d._id)}>
                                                            <i className="fab fa-gratipay"></i>
                                                            <span style={{ color: 'blue', margin: '0 10px' }}>{d.likes ? d.likes : 0}</span>
                                                        </span>
                                                    </div>
                                                </td>
                                                <td>{d.post}</td>
                                                <td>{d.fromYr}</td>
                                                <td>{d.toYr}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center app-title">हमारे पंचायत की समस्याएं</h4>
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center" style={{ color: 'red' }}>बाढ़</h4>
                                    <hr />
                                    <p>
                                        बाढ़ हमारे पंचायत की सबसे बड़ी समस्या है।  आज भी लगभग हर साल बाढ़ हमारे पंचायत के लोगों को हर प्रकार की क्षति पहुंचाने में हर आपदा से आगे है।
                                    </p>
                                    <p>
                                        हर साल लाखों के फसल बर्बाद हो जाते है।  हमारे पंचायत के सभी किसान मूल रूप से अपने खेती पे ही आश्रित होते है।  हर वर्ष किसान जी जान से खेती करते है और फिर गंडक नदी का पानी बाढ़ रुपी आपदा के रूप में आ के उनके मेहनत की कमाई को अपने साथ बहा ले जाता है।
                                    </p>
                                    <p>
                                        <img src={flood} style={{ width: '100%' }} />
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center" style={{ color: '#3535d1' }}>स्वास्थ सेवाओं की कमी</h4>
                                    <hr />
                                    <p>
                                        स्वास्थ की सुविधा हमारे पूरे बिहार में कैसी है ये किसी से छुपा नहीं है। और हमारा पंचायत भी उससे अछूता नहीं।
                                    </p>
                                    <p>
                                        कुछ साल पहले हमारे पंचायत के स्वर्गीय नंदू राय जी के द्वारा एक प्राथमिक स्वास्थ केंद्र का निर्माण हुआ था।  कुछ वर्षो तक उस स्वास्थ केंद्र में लोगों का इलाज हुआ करता था और लोगों को बहुत हद तक सहूलियत भी था।  लेकिन कुछ वर्षो से ये स्वास्थ केंद्र बस एक देखने की जगह है जहां पे सिर्फ आपको कुछ मवेशी दिखाई देंगे, अब ना तो वहां कोई डॉक्टर आते है और ना ही किसी का इलाज होता है।
                                    </p>
                                    <p>
                                        अब लोगों को किसी भी प्रकार की स्वास्थ सेवाओं के लिए घर से २० किलो मीटर दूर जाना पड़ता है और कभी कभी लोगों को समय के अभाव में अपनी जान भी देनी पड़ती है।
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center" style={{ color: '#5ee35e' }}>साफ़ पानी की समस्या</h4>
                                    <hr />
                                    <p>
                                        आज के समय में पिने योग्य पानी की समस्या एक बहुत बड़ी चिंता का विषय है। हमारे जीवन काल में बहुत सी बीमारियां पानी की सही गुणवत्ता नहीं होने कारन होती हैं।
                                    </p>
                                    <p>
                                        जल की गुणवत्ता की कमी से होने वाली बिमारिओं से 2018 में 2, 439 लोगों की जान हमारे सम्पूर्ण भारत में हुई थीं। और ये हर साल बढ़ते जा रहे हैं।
                                    </p>
                                    <p>
                                        वार्षिक रूप से लगभग 37.7 मिलियन भारतीय जलजनित बीमारियों से प्रभावित हैं
                                    </p>
                                    <p>
                                        <img src={waterIssue} style={{ width: '100%' }} />
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-3">
                                <div className="vission app-box-shadow">
                                    <h4 className="text-center" style={{ color: '#FF6F00' }}>शैक्षिक संस्थान</h4>
                                    <hr />
                                    <p>
                                        आज के समय में अच्छी शिक्षा मिलना इतना असान नहीं हैं जितना हम सब समझते हैं। एक अच्छी और गुणवत्ता पूर्वक शिक्षा के लिए अच्छे स्कूल का होना बहुत जरुरी हैं।
                                    </p>
                                    <p>
                                        "ज्ञान ही आपका असली हक़ दिलाता हैं " ये बात 100 फीसदी सही हैं। अगर आपके पास अच्छी शिक्षा हैं तो आप किसी भी प्रकार की समस्या को बहुत आसानी से सुलझा सकते हैं।
                                    </p>
                                    <p>
                                        लेकिन हमारे पंचायत में आज भी अच्छी शिक्षण संस्थान की कमी हैं।  कहने के लिए तो हमारे पंचायत में +2 स्कूल हैं लेकन उसमें एक भी लैब की सुविधा नहीं हैं। कंप्यूटर शिक्षा बस पाठ्यक्रम तक ही सिमित हैं।
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <div className="vission app-box-shadow">
                        <h4 className="text-center app-title">महत्वपूर्ण लिंक्स</h4>
                        <hr />
                        <LinksCollection />
                    </div>
                </div>
            </div>
            {
                loading && <Modal message="डाटा लोड हो रहा है, कृपया प्रतीक्षा कीजिये" />
            }
             <Toaster message="आपके मोबाइल फ़ोन से लाइक किया जा चूका है।  आपका बहुत बहुत धन्यवाद। " severity="info" isOpen={isOpen} close={() => onToasterClose()}/>
            {
                openModal &&
                <Modal message="" custom={true}>
                    <TextField
                        id="name"
                        label="अपना मोबाइल नंबर अंकित कीजिये और ओके करें"
                        value={mobileNo} onChange={(e) => inputHandler(e)}/>
                    <h6 className="text-center">
                        <button
                            className="btn btn-info"
                            style={{ margin: '10px' }}
                            disabled={mobileNo.length !== 10}
                            onClick={() => saveMukhiyaLikes()}
                        >Ok</button>
                    </h6>
                </Modal>
            }
        </div>
    )
}

export default Home;